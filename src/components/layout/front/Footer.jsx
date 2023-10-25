import "./footer.css";

// import telegram from '../../assets/telegram.png';
// import facebook from '../../assets/facebook.jpg';
// import lnk from '../../assets/lnk.webp';
// import Image from "next/image";

const Footer = () => {
  // const Telegram = () => {
  //   window.location.href = "https://t.me/samariddin_nurmamatov"
  // }
  // const Linkidin = () => {
  //   window.location.href = "https://www.linkedin.com/in/samariddin-nurmamatov-716811272/"
  // }
  return (
    <footer>
      <div className="container">
        <div className="footer-waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul>
          <li>
            <a>
              <p>Instagram</p>
            </a>
          </li>
          <li>
            <a>
              {/* <Image className="footer-icons" src={facebook} alt="Facebook" /> */}
              <p>Facebook</p>
            </a>
          </li>
          <li>
            <a>
              {/* <Image className="footer-icons" src={lnk} alt="linkidin" /> */}
              <p>Linkidin</p>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
