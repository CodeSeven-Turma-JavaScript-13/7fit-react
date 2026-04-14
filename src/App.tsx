import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Background Animado */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon/10 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon/5 blur-[100px] rounded-full"></div>
        </div>

        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(182, 255, 0, 0.2)',
            },
          }} 
        />
        
        <NavBar />
        
        <main className="grow">
          
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
