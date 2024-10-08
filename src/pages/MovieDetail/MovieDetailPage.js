import { useDetailMovieQuery } from '../../hooks/useDetailMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import MoonLoader from "react-spinners/MoonLoader";
import { Alert, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './MovieDetailPage.style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUsers, faPlay } from '@fortawesome/free-solid-svg-icons';
import RecommendationsMovies from './recommendationsMovie/RecommendationsMovies'
//import useShowGenreBadge from '../../common/Genre'
import MovieReview from './reviews/MovieReview'
import { useMovieVideoQuery } from '../../hooks/useVideo';
import YouTube from 'react-youtube';
import { useState } from 'react';


function MovieDetailPage (){
  let { id } = useParams();
  //console.log("아이디", id);
  const {data: DetailData, isLoading, isError, error} = useDetailMovieQuery({id});
  //console.log("디테일 데이터", DetailData);
  const {data: genreData} = useMovieGenreQuery();
  //console.log("장르모음", genreData);
  const {data: MovieVideoData} = useMovieVideoQuery({id});
  //console.log("비디오", MovieVideoData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    }
  }
  
  function showGenre (genreIdList){
    if (!genreData){
      return []
    }
    const genreNameList = genreIdList.map((item) => {
      const genreObj = genreData.find((genre) => {return genre.id === item.id})
      return genreObj.name;
    })
    return genreNameList;
    
  }

  if (isLoading){
    return <div className='loading-spinner'><MoonLoader color='red' /></div>
  }
  if (isError == true){   
    return <Alert key="danger">{error.message}</Alert>
  }


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <YouTube videoId={MovieVideoData && MovieVideoData.results[0].key} opts={opts} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className='youtube-close-btn'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <div className='container-custom movie-detail-page'>
      <div className="image-box" style={{background: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(6,6,6,0) 70%), url(https://image.tmdb.org/t/p/original${DetailData.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>

      <div className='center-box'>
        <div className="detail-content-box">
          <div className='detail-image-box'>
            <img src={`https://image.tmdb.org/t/p/original${DetailData.poster_path}`} className="poster" />
          </div>

          <div className="content-detail">
            <div className='genre-box'>
              {showGenre(DetailData.genres).map((id, index) => {return <span className='badge-genre' key={index}>{id}</span>})}
            </div>
            <h1 className="title">{DetailData.title}</h1>
            <div className="tagline">{DetailData.tagline}</div>
            <div className="badge-box">
              <span className='badge-score'><FontAwesomeIcon icon={faStar} className='score' />{DetailData.vote_average}</span>
              <span className='badge-popularity'><FontAwesomeIcon icon={faUsers} className='user-icon'/>{DetailData.popularity}</span>
              <span className='badge-adult'>{DetailData.adult ? "over 18" : 'all'}</span>
            </div>
            <div className='description'>
              {DetailData.overview}
            </div>
            <div className='detail-info-box'>
              <div className='detail-info'>
                <span className='detail-info-title'>Production Countries</span>
                <span className='detail-info-content'>{DetailData.production_countries[0].name}</span>
              </div>
              <div className='detail-info'>
                <span className='detail-info-title'>Production Companies</span>
                <span className='detail-info-content'>{DetailData.production_companies[0].name}</span>
              </div>
              <div className='detail-info'>
                <span className='detail-info-title'>Runtime</span>
                <span className='detail-info-content'>{DetailData.runtime} minutes</span>
              </div>
              <div className='detail-info'>
                <span className='detail-info-title'>Release Date</span>
                <span className='detail-info-content'>{DetailData.release_date}</span>
              </div>
            </div>
            <button className='play-btn' onClick={handleShow}><FontAwesomeIcon icon={faPlay} className='play-btn-icon' />예고편 재생</button>

          </div>
        </div>{/*content-box*/}
      </div>{/* center-box */}
      
      <MovieReview id={id} />
      {/* <MovieReview id={id} /> */}
      <RecommendationsMovies id={id}/>
    </div>
    </>
  );
}

export default MovieDetailPage;