import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop (){
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("상단으로 스크롤 옮기기");
    window.scrollTo(0, 0);
  }, [pathname])
  
  return null;
}

export default ScrollToTop;