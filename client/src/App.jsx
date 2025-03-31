import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Navbar from './componants/navbar'
import Login from './componants/login'
function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
export default App