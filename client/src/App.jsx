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
import Footer from './componants/footer';
import SearchResults from './pages/search';
import CastPage from './pages/cast';
import ActorPage from './pages/person';
import SeasonPage from './pages/seasonPage';
function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Background />
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/search/:searchTerm' element={<SearchResults/>}/>
            <Route path="/:type/:id" element={<MovieDetails />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/auth" element={<Signin />}/>
            <Route path="/welcome" element={<Welcome />}/>
            <Route path="/watchlist" element={<Watchlist />}/>
            <Route path="/cast" element={<CastPage />} />
            <Route path="/person/:id" element={<ActorPage />} />
            <Route path="/tv/:id/season/:seasonNumber" element={<SeasonPage />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}
export default App