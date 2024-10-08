import MovieCard from '../../../common/MovieCard/MovieCard'
import { useRecommendationsMoviesQuery } from '../../../hooks/useRecommendationsMovie'
import './RecommendationsMovie.style.css'


function RecommendationsMovies ({id}){
  const {data: RecommendationsData, isLoading, isError, error} = useRecommendationsMoviesQuery({id});
  console.log("추천영화", RecommendationsData);
  
  


  return (
    <div className='recommendation-box'>
      <h1 className='title'>Recommendations</h1>
      <div className='similar-movie-box'>
        {RecommendationsData && RecommendationsData.length == 0 ? <div>추천 영화가 없습니다</div> : RecommendationsData && RecommendationsData.map((movie, index) => { return <MovieCard movie={movie} key={index} /> }) }
        {}
      </div>
    </div>
    
  );
}

export default RecommendationsMovies;