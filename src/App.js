import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />
        <Switch>
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/" />)} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
