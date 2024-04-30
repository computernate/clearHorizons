import './App.css';
import Header from './components/general/Header.js'
import Homepage from 'components/homepage/Homepage'
import HouseSetup from 'components/housesetup/HouseSetup'
import Contact from 'components/pages/Contact'
import JobberForm from 'components/pages/JobberForm'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
    return (
        <Router>
            <div style={{height:"100%", display:"flex", flexFlow: 'column'}}>
                <Header />

                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/schedule" element={<JobberForm />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
