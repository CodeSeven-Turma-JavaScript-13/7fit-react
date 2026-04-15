import { Link } from 'react-router-dom';
import { InstagramLogoIcon, GithubLogoIcon, YoutubeLogoIcon } from '@phosphor-icons/react';

function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-white/5 pt-12 md:pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 md:mb-6 group w-fit">
              <div className="w-8 h-8 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <img src="https://ik.imagekit.io/Outwake/imagens/Code7/favicon.png" alt='Logo' className='w-10 h-10'/>
              </div>
            </Link>
            <p className="text-text-sec text-sm max-w-sm leading-relaxed">
              A plataforma social para atividades físicas. Crie, descubra e participe de eventos esportivos na sua comunidade. Conexões reais através do esporte.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4 md:mb-6 text-sm uppercase tracking-widest">Plataforma</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/" className="text-text-sec hover:text-neon transition-colors text-sm">Descubra Eventos</Link></li>
              <li><Link to="/" className="text-text-sec hover:text-neon transition-colors text-sm">Comunidades</Link></li>
              <li><Link to="/" className="text-text-sec hover:text-neon transition-colors text-sm">Classificação</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-4 md:mb-6 text-sm uppercase tracking-widest">Siga-nos</h4>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-lg bg-surface border border-white/5 flex items-center justify-center hover:border-neon/50 hover:text-neon transition-all" aria-label="Instagram">
                <InstagramLogoIcon size={20} />
              </button>
              <button className="w-10 h-10 rounded-lg bg-surface border border-white/5 flex items-center justify-center hover:border-neon/50 hover:text-neon transition-all" aria-label="Twitter">
                <GithubLogoIcon size={20} />
              </button>
              <button className="w-10 h-10 rounded-lg bg-surface border border-white/5 flex items-center justify-center hover:border-neon/50 hover:text-neon transition-all" aria-label="YouTube">
                <YoutubeLogoIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-sec text-xs text-center sm:text-left">
            © 2026 7FIT. Todos os direitos reservados. Criado para atletas, por atletas.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-text-sec hover:text-white transition-colors text-xs underline">Política de Privacidade</Link>
            <Link to="/" className="text-text-sec hover:text-white transition-colors text-xs underline">Termos de Serviço</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;