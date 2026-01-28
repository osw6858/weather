import { Link, useParams } from 'react-router-dom';
import { Button } from '@/shared/ui/button';

export default function DetailPage() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-slate-900">상세 화면: {id}</h1>
      <p className="text-slate-500">
        시간대별 기온과 상세 날씨 정보를 보여줄 곳
      </p>
      <Link to="/">
        <Button>메인으로 돌아가기</Button>
      </Link>
    </div>
  );
}
