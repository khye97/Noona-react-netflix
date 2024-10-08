import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// 메인 홈페이지 "/"
// 전체 영화 보여주는 페이지 (검색 기능) "/movies" "/movies?q=검색조건"
// 영화 디테일 페이지 "movies/:id"


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path='/movies'>
          <Route index element={<MoviePage />} />
          <Route path=':id' element={<MovieDetailPage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
