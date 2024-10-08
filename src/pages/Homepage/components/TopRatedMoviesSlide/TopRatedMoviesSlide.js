import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import MoonLoader from "react-spinners/MoonLoader";
import { Alert } from 'react-bootstrap';
import MovieSlide from '../../../../common/MovieSlide/MovieSlide';
import responsive from '../../../../constants/responsive'


function TopRatedMoviesSlide (){
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();  

  if (isLoading){
    return <div className='loading-spinner'><MoonLoader color='red' /></div>
   }
   if (isError == true){   
     return <Alert key="danger">{error.message}</Alert>
   }

  return (
    <div>
      <MovieSlide title={'Top Rated Movies'} movieList={data} responsive={responsive}/>
    </div>
  )
}

export default TopRatedMoviesSlide;