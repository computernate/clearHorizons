import './App.css';
import Header from './components/general/Header.js'
import Homepage from 'components/homepage/Homepage'
import Dashboard from 'components/dashboard/Dashboard'
import HouseSetup from 'components/housesetup/HouseSetup'
import Contact from 'components/pages/Contact'
import OrderWindow from 'components/orders/window/OrderWindow'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
    return (
        <Router>
            <div style={{height:"100%", display:"flex", flexFlow: 'column'}}>
                <Header />

                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/quote" element={<HouseSetup />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/orderWindow/:houseID" element={<OrderWindow />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
