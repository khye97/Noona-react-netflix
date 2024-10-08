import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import MoonLoader from "react-spinners/MoonLoader";
import { Alert } from 'react-bootstrap';
import MovieSlide from '../../../../common/MovieSlide/MovieSlide';
import responsive from '../../../../constants/responsive'


function UpcomingMoviesSlide (){
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();  

  if (isLoading){
    return <div className='loading-spinner'><MoonLoader color='red' /></div>
   }
   if (isError == true){   
     return <Alert key="danger">{error.message}</Alert>
   }

  return (
    <div>
      <MovieSlide title={'Up coming Movies'} movieList={data} responsive={responsive}/>
    </div>
  )
}

export default UpcomingMoviesSlide;