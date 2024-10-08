import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'



const fetchPopularMovie = () => {
  return api.get(`/movie/popular`);
}

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-popular'],
    queryFn: fetchPopularMovie,
    select: (result) => { return result.data.results}
  })
}