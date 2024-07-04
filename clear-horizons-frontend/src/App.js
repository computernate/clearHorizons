import './App.css';
import Header from './components/general/Header.js'
import Homepage from 'components/homepage/Homepage'
import Contact from 'components/pages/Contact'
import JobberForm from 'components/pages/JobberForm'
import ProductHome from 'components/products/ProductHome'
import ProductWindow from 'components/products/ProductWindow'
import ProductPest from 'components/products/ProductPest'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactGA from 'react-ga4';
const measurementId = "G-8MZB7ETHCB";

ReactGA.initialize(measurementId);



function App() {
    return (
        <Router>
            <div style={{height:"100%", display:"flex", flexFlow: 'column'}}>
                <Header />

                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/home-cleaning" element={<ProductHome />} />
                    <Route path="/window-cleaning" element={<ProductWindow />} />
                    <Route path="/pest-control" element={<ProductPest />} />
                    <Route path="/schedule" element={<JobberForm />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
