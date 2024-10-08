import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHeart as likeActive } from '@fortawesome/free-regular-svg-icons';
import { faHeart as likeInActive } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.style.css'
import { useState } from 'react';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { useNavigate } from 'react-router-dom';


function MovieCard (props){
  const [like, setLike] = useState(false);
  const {data: genreData} = useMovieGenreQuery();
  // console.log("장르", genreData);
  const navigate = useNavigate();
  
  
  const showMovieDetail = () => {
    navigate(`/movies/${props.movie.id}`);
  } 

  const showGenre = (genreIdList) => {
    if (!genreData){
      return []
    } 
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name;
    })
    return genreNameList;
  }

  return (
    <div className='movie-card' style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342${props.movie.poster_path
  })`}} onClick={() => { showMovieDetail() }}>
      <div className='movie-card-content'>
        <h3 className='title'>{props.movie.title}</h3>
        <div className='badge-genre-box'>
          {showGenre(props.movie.genre_ids).map((id, index) => {return <span className='badge-genre' key={index}>{id}</span>})}
        </div>
        <div className='badge-box'>
          <div className='badge-age'>{props.movie.adult ? "over 18" : 'all'}</div>
          <div className='score-box'>
            <FontAwesomeIcon icon={faStar} className='score' />{props.movie.vote_average}
          </div>
        </div>
        
        <div>
          <FontAwesomeIcon icon={like ? likeInActive : likeActive} className='like' onClick={() => { setLike(!like) }}/>
          <FontAwesomeIcon icon={faArrowUpFromBracket} className='share' />
        </div>
        
      </div>
    </div>

  );
}
 
export default MovieCard;