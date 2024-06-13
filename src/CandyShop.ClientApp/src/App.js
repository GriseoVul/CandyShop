import logo from './logo.svg';
import './App.css';
import Header from './Modules/Header';
import Slider from './Modules/Slider';
import Candys from './Modules/Candys';
import Basket from './Modules/Basket';
import Footer from './Modules/Footer';
import SellerPage from './Modules/SellerPage';
import AdminConsole from './Modules/AdminConsole';

import React, { Component } from 'react';
import { createRoot, HashRouter, Route, Routes, Link} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="App">
      <Header />
      <Routes>
        <Route path='/' element ={<Candys />}></Route>
        <Route path='/Busket' element = {<Basket />}></Route>
        <Route path='/Seller' element = {<SellerPage />}></Route>
        <Route path='/Panel' element = {<AdminConsole />}></Route>
      </Routes>
      <Footer />
    </div> 
    );
  }
}

export default App;
