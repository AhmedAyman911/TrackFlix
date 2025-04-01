import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Navbar from './componants/navbar'
import Login from './componants/login'
import Home from './pages/Home';
import MovieDetails from './pages/Details';
function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main class='dark' className='flex-1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
export default App