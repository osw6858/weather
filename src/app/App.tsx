import DetailPage from '@/pages/detail';
import { HomePage } from '@/pages/home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/detail/:id" element={<DetailPage />} />

        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center">
              페이지를 찾을 수 없습니다.
            </div>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
