import { Link } from 'react-router-dom';
import './user.css'
import { TOKEN } from '../../const';
import { ROLE } from '../../utils';

const HomePage = () => {
  const isAuthorizedUser = localStorage.getItem(TOKEN) && ROLE !== "user";

  return (
    <div className="All-showcase">
      <div className='container'>
        <div className="modal-center">
          <div className="txtla">
            <h1>
              <span>Portfolio</span> ga Xush kelibsiz
            </h1>
            <p>
            Assalomu Alaykum Rahmatullahi Barakatuh
            </p>
            {isAuthorizedUser ? (
              ""
            ) : (
              <div className="buttonlar">
                <Link to="login" className="a">
                  Log in
                </Link>
                <Link to="register" className="a">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage