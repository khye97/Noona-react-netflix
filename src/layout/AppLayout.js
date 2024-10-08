import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AppLayout.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Footer from './Footer'

function AppLayout (){
  const style = { transition: '0.2s' };
  const [searchBtn, setSearchBtn] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [searchStyle, setSearchStyle] = useState({});
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    // input에 입력된 값으로 url 바꿔주기 
    navigate(`/movies?q=${keyword}`);
    setKeyword(''); // 검색창 비워주기 
  }

  function searchDisplay (){
    if (searchBtn == true){
      setSearchStyle({ display: "block" });
    } else {
      setSearchStyle({ display: "none" });
    }
  }

  useEffect(() => {
    if(isMount){
      searchDisplay();
    } else {
      setIsMount(true);
    }
  }, [searchBtn])

  return (
    <div>
      <div className='navbar-custom'>
        <div className='logo-box'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png' className='logo' />
        </div>
        <div className='nav-btn'>
          <Link to={"/"} style={style}>Home</Link>
          <Link to={"/movies"} style={style}>Movies</Link>
        </div>
        <form className='search-box' style={searchStyle} onSubmit={searchByKeyword}>
          <input type='text' className='search' placeholder='search' value={keyword} onChange={(event) => { setKeyword(event.target.value) }} />
          <button className='search-btn' type='submit'>search</button>
        </form>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' onClick={() => { setSearchBtn(!searchBtn) }} />
      </div>
      
      <Outlet></Outlet>

      <Footer />
    </div>
  );
}

export default AppLayout;