import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, MagnifyingGlass, List } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`glass rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 ${isScrolled ? 'backdrop-blur-2xl' : ''}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-neon rounded-lg flex items-center justify-center shadow-neon group-hover:scale-110 transition-transform">
              <Trophy size={24} weight="fill" className="text-dark" />
            </div>
            <span className="text-2xl font-black tracking-tighter italic">7FIT</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold hover:text-neon transition-colors flex items-center gap-2 group">
              <Calendar size={18} className="group-hover:text-neon" /> Eventos
            </Link>
            <Link to="/" className="text-sm font-semibold hover:text-neon transition-colors flex items-center gap-2 group">
              <Users size={18} className="group-hover:text-neon" /> Comunidades
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors hidden sm:block">
              <MagnifyingGlass size={20} />
            </button>
            <button className="bg-neon text-dark px-6 py-2 rounded-xl font-bold text-sm glow-neon-hover hover:-translate-y-1 transition-all">
              Junte-se Agora!
            </button>
            <button className="md:hidden p-2 hover:bg-white/5 rounded-full">
              <List size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;