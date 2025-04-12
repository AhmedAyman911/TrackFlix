import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Navbar from './componants/navbar'
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Background from './componants/background';
import BrowsePage from './pages/browse';
import Signin from './pages/auth';
import Welcome from './api/welcome';
import Watchlist from './pages/watchlist';
function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Background />
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:type/:id" element={<MovieDetails />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/auth" element={<Signin />}/>
            <Route path="/welcome" element={<Welcome />}/>
            <Route path="/watchlist" element={<Watchlist />}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}
export default App