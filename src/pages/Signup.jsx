import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/users.js';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('Failed to login'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate();
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <header className='py-3 bg-secondary'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <nav className='navbar bg-secondary'>
                <div className='container-fluid'>
                  <Link className='navbar-brand text-light' to='/'>
                    Back to main page
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <div className='row'>
          <form
            onSubmit={handleSubmit}
            className='col-12 col-md-6 offset-md-3 d-grid gap-3 py-5'
          >
            <div>
              <label className='form-label' htmlFor='username'>
                Username:
              </label>
              <input
                className='form-control'
                type='text'
                name='username'
                id='username'
                value={username}
                onChange={handleUsername}
              />
            </div>

            <div>
              <label className='form-label' htmlFor='password'>
                Password:
              </label>
              <input
                className='form-control'
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div className='d-flex justify-content-center'>
              <button
                className='btn btn-primary btn-lg'
                type='submit'
                disabled={!username || !password || signupMutation.isPending}
              >
                {signupMutation.isPending ? 'Signing up...' : 'Signup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
