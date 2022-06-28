import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes,Link } from 'react-router-dom';
import Header from './composants/header';
import Home from './pages/home';
import Home2 from './pages/home2';
import Details from './pages/details';
import './App.css';
import MyMap from './composants/map';
import Footer from './composants/footer';
import './font-awesome-4.7.0/css/font-awesome.min.css';
import Lieux from './pages/lieux';
import Gallery from './pages/gallery';
import Apropos from './pages/apropos';
import Contact from './pages/contact';
function App() {
  return (
    <div className="App">
        <Router>
          <Header/>
          <Routes>
          <Route exact path="/" element={<Home2/>} />
          <Route exact path="/details/:id" element={<Details/>} />
          <Route exact path="/map" element={<MyMap/>}/>
          {/* paramettres facultatifs */}
          
          <Route exact path='/lieux/:secteur/:type' element={<Lieux/>}/>
          {/* <Route exact path='/lieux/:secteur' element={<Lieux/>}/> */}
          <Route exact path='/lieux/' element={<Lieux/>}/>
          <Route exact path='/gallery' element={<Gallery/>}/>
          <Route exact path='/apropos' element={<Apropos/>}/>
          <Route exact path='/contact' element={<Contact/>}/>
          </Routes>
          <Footer/>
        </Router>
      
    </div>
  );
}

export default App;
