import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import MoonLoader from "react-spinners/MoonLoader";
import { Alert } from 'react-bootstrap';
import MovieSlide from '../../../../common/MovieSlide/MovieSlide';
import responsive from '../../../../constants/responsive'


function PopularMoviesSlide (){
  const { data, isLoading, isError, error } = usePopularMoviesQuery();  

  if (isLoading){
    return <div className='loading-spinner'><MoonLoader color='red' /></div>
   }
   if (isError == true){   
     return <Alert key="danger">{error.message}</Alert>
   }

  return (
    <div>
      <MovieSlide title={'Popular Movies'} movieList={data} responsive={responsive}/>
    </div>
  )
}

export default PopularMoviesSlide;