import logo from './logo.svg';
import './App.css';
import Header from './Modules/GeneralModules/Header';
import Basket from './Modules/ClientModules/Basket';
import Footer from './Modules/GeneralModules/Footer';
import SellerPage from './Modules/SellerModules/SellerPage';
import AdminConsole from './Modules/AdminModules/AdminConsole';
import SellerEditCandys from './Modules/SellerModules/SellerEditCandys';
import ClientPage from './Modules/ClientModules/ClientPage';
import SearchResultPage from './Modules/ClientModules/SearchResultPage';

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
        <Route path='/' element ={<ClientPage />}></Route>
        {/* <Route path='/Search' element = {<SearchResultPage />}></Route> */}
        <Route path='/Busket' element = {<Basket />}></Route>
        <Route path='/Seller' element = {<SellerPage />}></Route>
        <Route path='/Panel' element = {<AdminConsole />}></Route>
        <Route path='/EditOrder' element = {<SellerEditCandys/>}></Route>
      </Routes>
      <Footer />
    </div> 
    );
  }
}

export default App;
