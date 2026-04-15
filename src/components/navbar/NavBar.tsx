import { Link } from 'react-router-dom';
import { CalendarIcon, UsersIcon, InfoIcon, MagnifyingGlassIcon, ListIcon, XIcon } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`glass rounded-2xl flex items-center justify-between px-4 sm:px-6 py-3 transition-all duration-300 ${isScrolled ? 'backdrop-blur-2xl' : ''}`}>
            
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
              <img src="https://ik.imagekit.io/Outwake/imagens/Code7/favicon.png" alt='Logo' className='w-10 h-10'/>
            </Link>

         
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-semibold hover:text-neon transition-colors flex items-center gap-2 group">
                <CalendarIcon size={18} className="group-hover:text-neon" /> Eventos
              </Link>
              <Link to="/" className="text-sm font-semibold hover:text-neon transition-colors flex items-center gap-2 group">
                <UsersIcon size={18} className="group-hover:text-neon" /> Comunidades
              </Link>
              <Link to="/sobre" className="text-sm font-semibold hover:text-neon transition-colors flex items-center gap-2 group">
                <InfoIcon size={18} className="group-hover:text-neon" /> Sobre
              </Link>
            </div>

            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors hidden sm:block" aria-label="Buscar">
                <MagnifyingGlassIcon size={20} />
              </button>
              <button className="bg-neon text-dark px-5 py-2 rounded-xl font-bold text-sm glow-neon-hover hover:-translate-y-1 transition-all hidden md:block">
                Junte-se Agora!
              </button>
              <button
                className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}


      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 glass border-l border-white/10 flex flex-col pt-24 px-6 pb-8 gap-2 md:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <p className="text-xs font-black uppercase tracking-widest text-text-sec mb-4">Navegação</p>

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-neon transition-all font-semibold"
          onClick={() => setMobileOpen(false)}
        >
          <CalendarIcon size={20} className="text-neon" /> Eventos
        </Link>
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-neon transition-all font-semibold"
          onClick={() => setMobileOpen(false)}
        >
          <UsersIcon size={20} className="text-neon" /> Comunidades
        </Link>
        <Link
          to="/sobre"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-neon transition-all font-semibold"
          onClick={() => setMobileOpen(false)}
        >
          <InfoIcon size={20} className="text-neon" /> Sobre
        </Link>

        <div className="mt-auto">
          <button className="w-full bg-neon text-dark px-6 py-3 rounded-xl font-bold text-sm glow-neon-hover transition-all">
            Junte-se Agora!
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;