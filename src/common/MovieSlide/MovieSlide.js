import './MovieSlide.style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import responsive from '../../constants/responsive';


function MovieSlide (props){
  return (
    <div>
      <h3 className='section-title'>{props.title}</h3>
        <Carousel
          responsive={responsive}
          centerMode={true}
          // swipeable={false}
          // draggable={false}
          //infinite={true}
          containerClass="carousel-container"
          //itemClass="carousel-item-padding-40-px"
        >
        {props.movieList.map((movie, index) => {
            return <MovieCard movie={movie} key={index} className="slide-card-item"/>
          })}
      </Carousel>
    </div>
  );
}

export default MovieSlide;