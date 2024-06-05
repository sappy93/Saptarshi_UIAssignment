import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './private-routes/PrivateRoute';
import Home from './components/home/Home';
import AppLayout from './components/app-layout/AppLayout';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
            <AppLayout>
                <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path='/dashboard' element={<Dashboard/>} />
                </Route>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/' element={<Home/>}/>
                </Routes>
          </AppLayout>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;