import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { useMovieVideoQuery } from '../../../../hooks/useVideo'
import MoonLoader from "react-spinners/MoonLoader";
import { Alert, Modal, Button  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faComputerMouse, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import YouTube from 'react-youtube';
import './Banner.style.css'



// popular movie의 첫 번째 데이터를 값으로 사용 

function Banner (){
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("데이터 출력", data);
  const id = data && data[0].id;
  console.log("무비아이디", id);
  const { data: MovieVideoData } = useMovieVideoQuery({id});
  console.log("비디오 데이터", MovieVideoData);
  

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

      <div className='main-banner' style={{ backgroundImage: "url(https://image.tmdb.org/t/p/original" + `${data[0].backdrop_path}` + ")" }}>
        <div className='main-banner-content-box'>
          <h1 className='title'>{data && data[0].title}</h1>
          <p className='description'>{data && data[0].overview}</p>
          <button type='button' className='play-btn' onClick={handleShow}>
            <FontAwesomeIcon icon={faPlay} /> 재생
          </button>
          <div className='scroll-down-icon'>
            <FontAwesomeIcon icon={faComputerMouse} className='mouse' />
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Banner;