import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Users/Pages/Users';
import NewPlace from './Places/Pages/NewPlace';
import MainNav from './Shared/Components/Navigation/MainNav';
import UserPlaces from './Places/Pages/UserPlaces';
import UpdatePlace from './Places/Pages/UpdatePlace';


function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path='/:userId/places' element={<UserPlaces />} />
          <Route path='places/:placeId' element={<UpdatePlace />} />
          {/* <Route path='/*' element={<Users />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
