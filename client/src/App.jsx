import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Navbar from './componants/navbar'
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Background from './componants/background';
function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen py-9 px-0">
        <Background />
        <Navbar />
        <main className=''>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
export default App