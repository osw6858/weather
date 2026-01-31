


# Sky Cast - 날씨 애플리케이션

> 🔗 **배포 URL:** https://weather-pearl-three-65.vercel.app

실시간 날씨 정보 조회와 즐겨찾기 관리 기능을 제공하는 날씨 애플리케이션입니다.

---

## 프로젝트 실행 방법

### 사전 요구사항

- Node.js 20.x 이상
- npm

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다.

```bash
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key
```

Kakao REST API 키는 [Kakao Developers](https://developers.kakao.com/)에서 발급받을 수 있습니다.

### 로컬 개발 환경

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev
```

### Docker 실행

```bash
# Docker Compose로 빌드 및 실행
docker-compose up --build -d

# 실행 후 http://localhost:3000 접속

# 컨테이너 중지
docker-compose down
```

---

## 구현한 기능

### 1. 날씨 정보 조회

- 첫 진입 시 위치 정보 권한 요청
- 사용자가 위치정보를 허용하지 않으면 기본 위치 제공, 허용시 현재 위치의 날씨 정보 표시
- 현재 기온, 당일 최저/최고 기온, 체감 온도, 습도, 풍속 표시
- 향후 6시간 시간대별 기온 정보 표시

### 2. 장소 검색

- 대한민국 행정구역 단위 검색 지원 (시/도, 구/군, 동/읍/면)
- 한글 초성 검색 지원 (예: "ㄱㄴ" 입력으로 "강남구" 검색 가능)
- 검색어 입력 시 실시간으로 매칭되는 장소 리스트 표시
- 검색 결과에서 즐겨찾기 추가/제거 가능
- 장소 선택 시 해당 장소의 상세 날씨 정보 페이지로 이동

### 3. 즐겨찾기 관리

- 최대 6개의 장소를 즐겨찾기로 등록 가능
- 즐겨찾기 장소의 이름(별칭)을 수정 가능
- 즐겨찾기 카드에 현재 날씨 정보와 당일 최저/최고 기온 표시
- 즐겨찾기 카드 클릭 시 해당 장소의 상세 페이지로 이동
- 로컬 스토리지를 활용하여 즐겨찾기 데이터 영구 저장

### 4. 에러 처리

- 위치 정보 제공 거부 시 기본 위치 날씨 표시 및 안내 메시지 제공
- 날씨 정보가 제공되지 않는 장소인 경우 "해당 장소의 정보가 제공되지 않습니다" 메시지 표시
- API 요청 실패 시 적절한 에러 메시지 표시 및 재시도 로직 적용

### 5. 반응형 디자인

- 데스크톱과 모바일 화면 크기에 최적화된 UI 제공
- 모바일에서 사용하기 편리한 터치 인터페이스

---

## 기술적 의사결정 및 이유

### 1. 날씨 API 선택: OpenWeatherMap → Open-Meteo 전환

**문제:** 초기에 OpenWeatherMap API를 사용했으나, 무료 플랜에서 당일 최저/최고 기온 데이터를 제공하지 않아 과제 요구사항을 충족할 수 없었음

**해결:** Open-Meteo API로 전환
- 무료로 daily forecast(최저/최고 기온) 제공
- 인증 없이 사용 가능하고 CORS 허용
- WMO 표준 날씨 코드 사용으로 신뢰성 확보

### 2. 행정구역 데이터 로딩 전략

**문제:** 2만줄, 954KB 크기의 행정구역 JSON을 어떻게 로드할지 결정 필요

**선택지:**
- A) 번들에 포함 → 초기 로딩 시간 증가, 즉시 검색 가능
- B) public 폴더에서 동적 로드 → 번들 크기 감소, 네트워크 요청 필요

**결정:** A) 번들에 포함
- 검색은 핵심 기능이므로 즉시 사용 가능해야 함
- Gzip 압축 시 허용 가능한 수준
- 오프라인에서도 검색 가능

### 3. Result 패턴을 활용한 API 에러 처리

**문제:** 
- try-catch로 에러를 처리하면 호출하는 쪽에서 에러 케이스를 놓치기 쉬움
- 함수가 throw할 수 있는지 시그니처만 보고 알 수 없음

**해결:** ApiResult 타입을 정의하여 성공/실패를 명시적으로 구분
```typescript
export type ApiResult<T> =
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: string;
    };

```

**장점:**
- 함수 반환 타입만 보고 에러 가능성을 알 수 있음
- 호출하는 쪽에서 status 체크 없이 data에 접근하면 타입 에러 발생 → 에러 처리 강제
- Zod의 safeParse와 조합하여 파싱 실패도 동일한 패턴으로 처리

### 4. 대용량 데이터 검색 성능 최적화

**문제:** 
- 약 2만 건의 행정구역 데이터를 검색할 때, 매 키보드 입력(onChange)마다 전체 배열을 순회하며 `replaceAll`, `split` 등의 무거운 문자열 연산이 발생.
- 이로 인해 빠르게 타이핑 시 저사양 기기에서의 입력 반응이 느려지는 현상을 우려

**해결:**
1. **데이터 전처리 도입:**
   - 검색 시마다 반복되던 문자열 변환(`-` 제거, 초성 분리) 작업을 앱 초기화 시점에 단 1회만 수행하도록 변경
   - 검색 함수 내부에서는 무거운 연산 없이, 미리 가공된 메모리상의 데이터를 단순 조회만 하도록 하여 연산 비용 감소

2. **Debounce 기법 적용:**
   - `useDebounce` 훅을 구현하여 사용자의 입력이 멈춘 후(300ms)에만 검색 로직이 실행되도록 제한
   - 불필요한 중간 연산(예: '강', '강ㄴ' 등)을 방지하여 리소스 낭비 최소화

3. **초성 검색 및 Early Exit:**
   - `es-hangul`로 편의성을 높이되, `maxResults`에 도달하면 즉시 순회를 중단하여 비용 최적화.

**결과:**
- 저사양 기기에서도 끊김 없는 검색 경험 제공.

### 5. 외부 API 응답 안정성 확보

**문제:** 외부 API 응답 형식이 예고 없이 변경될 수 있음

**해결:** Zod를 활용한 런타임 타입 검증
- TypeScript는 컴파일 타임만 검증하므로 런타임 보호 불가
- API 응답을 Zod 스키마로 검증하여 예상치 못한 형식 변경으로부터 앱 보호

### 6. 위치 권한 변경 실시간 감지

**문제:** 사용자가 처음에 위치 권한을 거부했다가 나중에 브라우저 설정에서 허용으로 변경할 수 있음

**해결:** Permissions API를 활용한 권한 상태 리스닝
- `navigator.permissions.query`로 geolocation 권한 상태 구독
- 권한이 'granted'로 변경되면 자동으로 위치 재요청
- 페이지 새로고침 없이 즉시 현재 위치 날씨로 업데이트

### 7. API 재시도 로직

**문제:** 모든 API 에러에 대해 무분별하게 재시도하면 리소스 낭비

**해결:** HTTP 상태 코드 기반 선택적 재시도
- 4xx (클라이언트 에러): 재시도 안함 (잘못된 요청을 반복해도 결과 동일)
- 5xx (서버 에러): 최대 2회 재시도 (일시적 서버 문제일 가능성)
- 네트워크 재연결 시 자동 리페칭

---

## 사용한 기술 스택

### Core

- React 19
- TypeScript 5
- Vite 7

### 상태 관리

- Tanstack Query 5 (서버 상태)
- Zustand 5 (클라이언트 상태)

### 스타일링

- Tailwind CSS 4
- shadcn/ui
- Lucide React (아이콘)

### 데이터 검증 및 유틸리티

- Zod 4
- Axios
- Day.js
- es-hangul (한글 초성 검색)

### 라우팅

- React Router 7

### 개발 도구

- ESLint 9
- Prettier 3

---

## 프로젝트 구조

```
src/
├── app/
│   ├── App.tsx                    # 라우팅 설정
│   ├── main.tsx                   # 앱 진입점
│   ├── providers/
│   │   └── app-provider.tsx       # QueryClient, Router 프로바이더
│   └── styles/
│       └── index.css              # 전역 스타일
├── pages/
│   ├── home/
│   │   └── index.tsx              # 메인 페이지
│   └── detail/
│       └── index.tsx              # 장소별 상세 날씨 페이지
├── widgets/
│   └── weather-board/
│       └── ui/
│           └── weather-board.tsx  # 날씨 대시보드
├── features/
│   ├── search-location/           # 장소 검색 기능
│   │   ├── model/
│   │   │   ├── use-search-districts.ts
│   │   │   ├── use-search-item-actions.ts
│   │   │   └── types.ts
│   │   └── ui/
│   │       ├── search-location.tsx
│   │       ├── search-results.tsx
│   │       └── search-result-item.tsx
│   └── favorites/                 # 즐겨찾기 관리 기능
│       ├── model/
│       │   ├── use-favorites-store.ts
│       │   └── types.ts
│       └── ui/
│           ├── favorites-grid.tsx
│           ├── favorite-card.tsx
│           ├── favorite-card-header.tsx
│           ├── favorite-card-content.tsx
│           └── favorite-card-with-data.tsx
├── entities/
│   ├── weather/                   # 날씨 엔티티
│   │   ├── api/
│   │   ├── model/
│   │   ├── lib/
│   │   └── ui/
│   └── district/                  # 지역 엔티티
│       ├── data/
│       ├── model/
│       └── lib/
└── shared/
    ├── api/
    ├── ui/
    └── lib/
```
