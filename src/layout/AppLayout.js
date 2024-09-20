import { Link, Outlet } from 'react-router-dom';
import './AppLayout.style.css'


function AppLayout (){
  return (
    <div>
      <div className='navbar-custom'>
        <div className='logo-box'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png' className='logo' />
        </div>
        <div className='nav-btn'>
          <Link to={"/"}>Home</Link>
          <Link to={"/movies"}>Movies</Link>
        </div>
        <div className='search-box'>
          <input type='text' className='search' placeholder='search' />
          <button className='search-btn'>search</button>
        </div>
      </div>
      
      <Outlet></Outlet>
    </div>
  );
}

export default AppLayout;