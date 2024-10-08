import { useNowPlayingMoviesQuery } from '../../../../hooks/useNowPlayingMovies';
import MoonLoader from "react-spinners/MoonLoader";
import { Alert } from 'react-bootstrap';
import MovieSlide from '../../../../common/MovieSlide/MovieSlide';
import responsive from '../../../../constants/responsive'


function NowPlayingMoviesSlide (){
  const { data, isLoading, isError, error } = useNowPlayingMoviesQuery();  

  if (isLoading){
    return <div className='loading-spinner'><MoonLoader color='red' /></div>
   }
   if (isError == true){   
     return <Alert key="danger">{error.message}</Alert>
   }

  return (
    <div>
      <MovieSlide title={'Now playing movies'} movieList={data} responsive={responsive}/>
    </div>
  )
}

export default NowPlayingMoviesSlide;