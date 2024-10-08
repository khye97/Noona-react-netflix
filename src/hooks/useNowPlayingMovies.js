import { useQuery } from '@tanstack/react-query';
import api from '../utils/api'



const fetchNowPlayingMovie = () => {
  return api.get(`/movie/now_playing`);
}

export const useNowPlayingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-nowPlaying'],
    queryFn: fetchNowPlayingMovie,
    select: (result) => { return result.data.results}
  })
}