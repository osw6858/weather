import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-slate-900">메인 화면</h1>
      <p className="text-slate-500">
        여기에 현재 위치 정보와 즐겨찾기 목록이 뜰 예정
      </p>
      <Link to="/detail/seoul">
        <Button variant="outline">날씨 상세보기</Button>
      </Link>
    </div>
  );
}
