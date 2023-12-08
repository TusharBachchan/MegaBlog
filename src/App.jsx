import { useState, useEffect } from 'react'
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index';
/**
 * Steps : 
 * Check if user is logged in or not
 * Show a loading component unless there is a user
 * 
 */
// Assuming default value of loading as true

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className='w-full block'>
        <Header/>
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : (<h1>loading...</h1>);
}

export default App
