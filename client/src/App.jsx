import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Navbar from './componants/navbar'
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Background from './componants/background';
function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen px-0">
        <Background />
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:type/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
export default App