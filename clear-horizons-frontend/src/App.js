import './App.css';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from './components/general/Header.js'
import Homepage from 'components/homepage/Homepage'
import Contact from 'components/pages/Contact'
import GetService from 'components/pages/GetService'
import Services from 'components/pages/Services'
import About from 'components/pages/About'
import Staff from 'components/pages/Staff'
import ProductHome from 'components/products/ProductHome'
import ProductWindow from 'components/products/ProductWindow'
import ProductPest from 'components/products/ProductPest'
import ScrollToTop from 'components/general/ScrollToTop';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactGA from 'react-ga4';
const measurementId = "G-8MZB7ETHCB";

ReactGA.initialize(measurementId);



function App() {
    return (
        <Router>
            <ScrollToTop />
            <div style={{height:"100%", display:"flex", flexFlow: 'column'}}>
                <Header />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/home-cleaning" element={<ProductHome />} />
                    <Route path="/window-cleaning" element={<ProductWindow />} />
                    <Route path="/pest-control" element={<ProductPest />} />
                    <Route path="/schedule" element={<GetService />} />
                    <Route path="/quote" element={<GetService />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contact2" element={<Contact />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
