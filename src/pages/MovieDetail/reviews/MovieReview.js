import './MovieReview.style.css'
import { useMovieReviewQuery } from '../../../hooks/useMovieReview'
import { useEffect, useState } from 'react';

function Review ({id}){
  const {data: ReviewData, isLoading, isError, error} = useMovieReviewQuery({id});
  //console.log("기본데이터", ReviewData);
  const [showReview, setShowReview] = useState({});

  const toggle = id => {
    setShowReview(prev => ({ ...prev, [id]: !prev[id] }));    
    console.log("출력", showReview);
    
  }


  return (
    <div className='review-box'>
      <h4 className='title'>Reviews</h4>
      { ReviewData && ReviewData.length == 0 ? <div style={{marginLeft: '30px'}}>리뷰가 없습니다</div> : ReviewData && ReviewData.map((item, index) => {
        return <div className='review-item'>
        <div className='user-box'>
          {item.author_details.avatar_path === null ? <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" className='user-image' /> : <img src={`https://image.tmdb.org/t/p/original${item.author_details.avatar_path}`} className='user-image' />}
          <div>
            <h5 className='user-name'>{item.author}</h5>
            <div className='date'>{item.created_at.substring(0, 10)}</div>
          </div>
        </div>
        <div className='review-box'>
          {showReview[index] ? item.content : item.content.substring(0, 300) }
        </div>
        {item.content.length > 300 ? <button className='show-more-btn' onClick={() => { toggle(index) }}>show more</button> : null}
        
      </div>
      }) }
      
      
    </div>
  );
}


export default Review;