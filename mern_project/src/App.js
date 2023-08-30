import React, {useState, useCallback} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Users/Pages/Users';
import NewPlace from './Places/Pages/NewPlace';
import MainNav from './Shared/Components/Navigation/MainNav';
import UserPlaces from './Places/Pages/UserPlaces';
import UpdatePlace from './Places/Pages/UpdatePlace';
import Login from './Users/Pages/Login';
import AuthContext from './Shared/Components/Context/login-context';


function App() {
  const [isLogedin, setIsLogedin] = useState(false);

  let routes;
  if (isLogedin) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path='places/:placeId' element={<UpdatePlace />} />
        <Route path='*' to={'/'} element={<Login/>}/>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/auth' element={<Login/>} />
        <Route path='*' to={'/auth'} element={<Login/>}/>
      </React.Fragment>
    );
  }

  const login = useCallback(() => {
    setIsLogedin(true);
  }, [])
  const logout = useCallback(() => {
    setIsLogedin(false );
  }, [])
  return (
    <AuthContext.Provider value={{isLogedin: isLogedin, login: login, logout: logout}}>
      <BrowserRouter>
        <MainNav />
        <main>
          <Routes>
            {routes}
          </Routes>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;