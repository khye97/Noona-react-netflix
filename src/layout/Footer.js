import './Footer.style.css'



function Footer (){
  return (
    <div className='footer'>
      <div className='logo-box'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" className='logo' />
      </div>
      <div className='footer-content-box'>
        <div className='explore-box'>
          <div className='footer-title'>EXPLORE</div>
          <ul className='footer-list'>
            <li>Account</li>
            <li>Help Center</li>
            <li>Ways to Watch</li>
            <li>Only on Netflix</li>
          </ul>
        </div>
        <div className='legal-box'>
          <div className='footer-title'>LEGAL</div>
          <ul className='footer-list'>
            <li>Cookie Preferences</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Gift Card Terms</li>
            <li>Legal Notices</li>
            <li>Corporate Information</li>
          </ul>
        </div>
        <div className='support-box'>
          <div className='footer-title'>SUPPORT</div>
          <ul className='footer-list'>
            <li>FAQ</li>
            <li>Speed Test</li>
            <li>Contact Us</li>
            <li>Jobs</li>
            <li>Media Center</li>
            <li>Investor Relations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
