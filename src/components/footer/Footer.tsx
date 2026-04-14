import { Link } from 'react-router-dom';
import { InstagramLogo, TwitterLogo, YoutubeLogo, Trophy } from '@phosphor-icons/react';

function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-neon rounded flex items-center justify-center shadow-neon group-hover:rotate-12 transition-transform">
                <Trophy size={18} weight="fill" className="text-dark" />
              </div>
              <span className="text-xl font-black italic">7FIT</span>
            </Link>
            <p className="text-text-sec text-sm max-w-sm leading-relaxed">
              A plataforma social para atividades físicas. Crie, descubra e participe de eventos esportivos na sua comunidade. Conexões reais através do esporte.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Plataforma</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-text-sec hover:text-neon transition-colors text-sm">Descubra Eventos</Link></li>
              <li><Link to="/" className="text-text-sec hover:text-neon transition-colors text-sm">Comunidades</Link></li>
              <li><Link to="/" className="text-text-sec hover:text-neon transition-colors text-sm">Classificação</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Siga-nos</h4>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-lg bg-surface border border-white/5 flex items-center justify-center hover:border-neon/50 hover:text-neon transition-all">
                <InstagramLogo size={20} />
              </button>
              <button className="w-10 h-10 rounded-lg bg-surface border border-white/5 flex items-center justify-center hover:border-neon/50 hover:text-neon transition-all">
                <TwitterLogo size={20} />
              </button>
              <button className="w-10 h-10 rounded-lg bg-surface border border-white/5 flex items-center justify-center hover:border-neon/50 hover:text-neon transition-all">
                <YoutubeLogo size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-text-sec text-xs">
            © 2026 7FIT. Todos os direitos reservados. Criado para atletas, por atletas.
          </p>
          <div className="flex gap-8">
            <Link to="/" className="text-text-sec hover:text-white transition-colors text-xs underline">Política de Privacidade</Link>
            <Link to="/" className="text-text-sec hover:text-white transition-colors text-xs underline">Termos de Serviço</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;