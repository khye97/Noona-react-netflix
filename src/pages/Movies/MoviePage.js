import { useSearchParams } from 'react-router-dom';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import MoonLoader from "react-spinners/MoonLoader";
import { Alert } from 'react-bootstrap';
import MoviePageCard from './MoviePageCard/MoviePageCard'
import Dropdown from 'react-bootstrap/Dropdown';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import './MoviePage.style.css'
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';

// 무비 페이지로 넘어오는 경로 2가지
// navbar에서 Movies 버튼을 클릭해서 넘어온 경우 -> popular movie를 보여줌 
// 키워드를 입력해서(검색해서) 온 경우 -> 키워드와 관련된 영화를 보여줌 

// 페이지네이션 만들기
// react 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때 마다 page 바꿔주기
// page 값이 바뀔 때 마다 useSearchMovie에 page까지 넣어서 fetch 

function MoviePage (){
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');
  const [page, setPage] = useState(1);
  const {data: searchData, isLoading, isError, error} = useSearchMovieQuery({keyword, page});
  const {data: genreData} = useMovieGenreQuery();
  console.log("장르원본", genreData);
  

  let genreNameList = genreData && genreData.map((item) => { return item.name });
  // console.log("데이터", searchData);
  // console.log("장르 네임 리스트", genreNameList);
  

  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    if(searchData){
      setMovieList(searchData.results)
    }
  }, [searchData])

  const sort = (order) => {
    const sortedArray = [...movieList].sort((a, b) => (order === "high" ? b.vote_average - a.vote_average : a.vote_average - b.vote_average))
    setMovieList(sortedArray);
  }

  if (isLoading){
    return <div className='loading-spinner'><MoonLoader color='red' /></div>
  }
  if (isError == true){   
    return <Alert key="danger">{error.message}</Alert>
  }

  const handlePageClick = ({selected}) => {
    setPage(selected + 1)
  }

  // function filterGenre (item){
  //   let genreName = item;
  //   //console.log("필터 선택한 값", id);
  //   let array = [...searchData.results];
  //   console.log("어레이인가?", Array.isArray(array));
    
  //   array = array.map((item, index) => {
  //     let genre_ids = item.genre_ids.map((id) => {
  //       let result = genreData.find((genre) => genre.id === id )
  //       return result.name;
  //     })
  //     item.genre_ids = genre_ids;
  //     return item;
  //   })
  //   console.log("바꾼 어레이", array);
    
  //   let newArray = array.filter((item) => {
  //     return item.genre_ids.includes(genreName)
  //   })
  //   console.log("필터링 어레이", newArray); 
  //   setMovieList(newArray);
  // }

  const filterGenre = (selectedGenre) => {
    const filteredMovies = searchData.results.filter(movie => 
      movie.genre_ids.some(id => genreData.find(genre => genre.id === id)?.name === selectedGenre)
    );
    //console.log("필터링된 영화", filteredMovies);
    
    setMovieList(filteredMovies);
  };


  // function copyData (){
  //   let copy = {...searchData.results};
  //   let keys = Object.keys(copy);
  //   sortArray = [];
  //   console.log("키", keys);
  //   for (let i = 0; i < keys.length; i++){
  //     let array = { ...searchData.results[i] }
  //     sortArray.push(array);
  //   }
  //   console.log("푸시한 소트 어레이", sortArray);
  //   console.log("소트어레이는 배열인가?", Array.isArray(sortArray));
  // }



  // function sort (order){
  //   copyData();
  //   if (order == "high"){
  //     sortArray.sort((a, b) => {
  //       if(a.vote_average < b.vote_average){return 1}
  //       if(a.vote_average === b.vote_average){return 0}
  //       if(a.vote_average > b.vote_average){return -1}
  //     })
  //   } else if (order == "low"){
  //     sortArray.sort((a, b) => {
  //       if(a.vote_average > b.vote_average){return 1}
  //       if(a.vote_average === b.vote_average){return 0}
  //       if(a.vote_average < b.vote_average){return -1}
  //     })
  //   }    
  //   setMovieList(sortArray);
  // }



  return (
    <div className='container-custom movie-page'>
      <div className='dropdown'>
        <div className='dropdown-sort'>
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              정렬기준
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => { sort("high") }}>평점 높은순</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => { sort("low") }}>평점 낮은순</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='dropdown-genre'>
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              장르검색
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {/* <Dropdown.Item>Action</Dropdown.Item> */}
              {genreNameList.map((item, index) => { return <Dropdown.Item href="#" key={index} value={item} onClick={() => { filterGenre(item) }}>{item}</Dropdown.Item>})}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className='card-box'>
        {movieList?.map((item, index) => {return <MoviePageCard movie={item} key={index} />})}
      </div>
      <div className='pagination-box'>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={searchData.total_pages} // 전체 페이지
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={page-1}
        />
      </div>
    </div>
  );
}

export default MoviePage;