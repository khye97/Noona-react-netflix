import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'



const fetchTopRatedMovie = () => {
  return api.get(`/movie/top_rated`);
}

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-topRated'],
    queryFn: fetchTopRatedMovie,
    select: (result) => { return result.data.results}
  })
}