import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'



const fetchUpcomingMovie = () => {
  return api.get(`/movie/upcoming`);
}

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-popular'],
    queryFn: fetchUpcomingMovie,
    select: (result) => { return result.data.results}
  })
}