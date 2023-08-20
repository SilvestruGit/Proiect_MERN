import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Users/Pages/Users';
import NewPlace from './Places/Pages/NewPlace';
import MainNav from './Shared/Components/Navigation/MainNav';


function App() {
  return (
    <BrowserRouter>
    <MainNav />
    <main>
      <Routes>
        <Route path="/" exact element={<Users/>} />
        <Route path="/places/new" exact element={<NewPlace/>} />
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
