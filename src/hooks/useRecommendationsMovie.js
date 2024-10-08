import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'



const fetchRecommendationsMovie = ({id}) => {
  return api.get(`/movie/${id}/recommendations`);
}

export const useRecommendationsMoviesQuery = ({id}) => {
  return useQuery({
    queryKey: ['movie-recommendations', id],
    queryFn: () => fetchRecommendationsMovie({id}),
    select: (result) => { return result.data.results}
  })
}