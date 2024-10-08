import './Homepage.style.css';
import Banner from './components/Banner/Banner';
import PopularMoviesSlide from './components/PopularMoviesSlide/PopularMoviesSlide';
import NowPlayingMovieSlide from './components/NowPlayingMoviesSlide/NowPlayingMoviesSlide';
import TopRatedMoviesSlide from './components/TopRatedMoviesSlide/TopRatedMoviesSlide'
import UpcomingMoviesSlide from './components/UpcomingMoviesSlide/UpcomingMoviesSlide'

// 1. 배너 -> popular movie를 들고 와서 첫 번째 아이템을 보여줌 
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie




function Homepage (){


  return (
    <div className='container-custom'>
      <Banner />
      <PopularMoviesSlide />
      <NowPlayingMovieSlide />
      <TopRatedMoviesSlide />
      <UpcomingMoviesSlide />
    </div>
  );
}

export default Homepage;