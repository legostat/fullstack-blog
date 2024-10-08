import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../contexts/AuthContext';
import { User } from './User';

export function Header() {
  const [token, setToken] = useAuth();
  return (
    <header className='py-3 bg-secondary'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <nav className='navbar bg-secondary'>
              <div className='container-fluid'>
                {token ? (
                  <>
                    <span className='navbar-brand text-light'>
                      Logged in as <User id={jwtDecode(token).sub} />
                    </span>
                    <ul className='navbar-nav'>
                      <li className='nav-item'>
                        <button
                          className='nav-link'
                          onClick={() => setToken(null)}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </>
                ) : (
                  <div className='hstack gap-3'>
                    <Link className='navbar-brand text-light' to='/login'>
                      Log In
                    </Link>
                    <Link className='navbar-brand text-light' to='/signup'>
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
