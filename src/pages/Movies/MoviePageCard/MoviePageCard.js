import './MoviePageCard.style.css'
import { useMovieGenreQuery } from '../../../hooks/useMovieGenre'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function MoviePageCard (props){
  const {data: genreData} = useMovieGenreQuery();
  // console.log("프롭스", props);

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
    <div className='movie-page-card' style={{background: `linear-gradient(90deg, rgba(0,0,0,1) 58%, rgba(0,0,0,0) 84%, rgba(0,0,0,0) 85%), url(https://image.tmdb.org/t/p/original${props.movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}} onClick={() => { showMovieDetail() }}>
      <div className='content-box'>
        <div className='title-box'>
          <img src={props.movie.poster_path == null ? 'https://res.cloudinary.com/heyset/image/upload/v1689582418/buukmenow-folder/no-image-icon-0.jpg' :  `https://image.tmdb.org/t/p/w342${props.movie.poster_path}`} className='poster'/>
          <div>
            <h3 className='title'>{props.movie.title}</h3>
            <div className='year'>{props.movie.release_date.substr(0, 4)}</div>
          </div>
        </div>
        <div className='badge-box'>
        {showGenre(props.movie.genre_ids).map((id, index) => {return <span className='badge-genre' key={index}>{id}</span>})}
        </div>
        <div className='description'>
          {props.movie.overview && props.movie.overview.length > 200 ? props.movie.overview.substring(0, 100) + "..." : props.movie.overview}
        </div>
        <div>
          <div className='badge-score'><FontAwesomeIcon icon={faStar} className='score' />{props.movie.vote_average}</div>
          <div className='badge-popularity'><FontAwesomeIcon icon={faUsers} />{props.movie.popularity}</div>
          <div className='badge-adult'>{props.movie.adult ? "over 18" : 'all'}</div>
        </div>
      </div>
    </div>
  );
}

export default MoviePageCard;