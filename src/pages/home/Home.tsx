import { useState } from 'react';
import {  BasketballIcon, SoccerBallIcon, TennisBallIcon, UsersIcon, TrophyIcon, ArrowRightIcon, MapPinIcon, ClockIcon, CalendarIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import ParticipationModal from '../../components/participation-modal/ParticipationModal';
import CreateEventModal from '../../components/create-event-modal/CreateEventModal';

interface EventItem {
  date: string;
  id: number;
  title: string;
  sport: string;
  icon: React.ReactNode;
  location: string;
  time: string;
  members: number;
  maxMembers: number;
  difficulty: string;
}

const EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Domingo de manhã com futebol',
    sport: 'Futebol',
    icon: <SoccerBallIcon size={24} weight="fill" className="text-neon" />,
    location: 'Barra da Tijuca, RJ',
    time: '09:00 AM',
    date:'20/05',
    members: 12,
    maxMembers: 16,
    difficulty: 'Intermediário',
  },
  {
    id: 2,
    title: 'Competição de basquete',
    sport: 'Basquete',
    icon: <BasketballIcon size={24} weight="fill" className="text-neon" />,
    location: 'Av. Atlântica, RJ',
    time: '06:30 PM',
    date:'10/06',
    members: 8,
    maxMembers: 10,
    difficulty: 'Avançado',
  },
  {
    id: 3,
    title: 'Duplas de tênis abertas',
    sport: 'Tênis',
    icon: <TennisBallIcon size={24} weight="fill" className="text-neon" />,
    location: 'Lagoa, RJ',
    time: '04:00 PM',
    date:'16/04',
    members: 2,
    maxMembers: 4,
    difficulty: 'Iniciante',
  },
];

function Home() {
  const [eventoSelecionado, setEventoSelecionado] = useState<EventItem | null>(null);
  const [criarEventoAberto, setCriarEventoAberto] = useState(false);

  function handleParticipar(event: EventItem) {
    setEventoSelecionado(event);
  }

  function handleFecharModal() {
    setEventoSelecionado(null);
  }

  return (
    <div className="pb-16 md:pb-24">
      {/* Modal de participação */}
      <ParticipationModal
        event={eventoSelecionado}
        onClose={handleFecharModal}
      />

      {/* Modal de criação de evento */}
      <CreateEventModal
        isOpen={criarEventoAberto}
        onClose={() => setCriarEventoAberto(false)}
      />

      {/* Seção Hero */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Fitness background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/40 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-dark via-dark/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 px-4 py-2 rounded-full mt-8 mb-6 md:mb-8">
              <span className="w-2 h-2 bg-neon rounded-full animate-pulse shadow-neon"></span>
              <span className="text-neon text-xs font-bold uppercase tracking-widest">Live in Rio de Janeiro</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl mt-0.2 font-black italic mb-4 md:mb-6 leading-[0.9] tracking-tighter">
              ELEVE SEU JOGO. <br />
            </h1>
            <span className="text-neon text-glow shadow-neon text-4xl sm:text-6xl md:text-8xl font-black italic mb-4 md:mb-6 leading-[0.9] tracking-tighter">ENCONTRE SEU TIME.</span>
            <p className="text-base md:text-lg lg:text-xl text-text-sec mt-10 mb-8 md:mb-10 max-w-xl leading-relaxed">
              O ponto de encontro definitivo para atletas. Descubra eventos esportivos locais, construa sua comunidade e transforme conexões digitais em conquistas esportiva real.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="bg-neon text-dark px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg flex items-center justify-center gap-3 glow-neon-hover group transition-all">
                EXPLORE EVENTOS <ArrowRightIcon size={24} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="glass px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-white/10 transition-colors">
                COMO FUNCIONA
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção Eventos */}
      <section className="py-16 mt-17 md:py-24 bg-dark relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="glass p-7 md:p-10 rounded-3xl border-l-4 border-l-neon relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <SoccerBallIcon size={100} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Descubra</h3>
              <p className="text-text-sec leading-relaxed text-sm md:text-base">Encontre atividades esportivas acontecendo perto de você hoje. Varia de casual a competitivo.</p>
            </div>
            <div className="glass p-7 md:p-10 rounded-3xl border-l-4 border-l-neon relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <UsersIcon size={100} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Conecte-se</h3>
              <p className="text-text-sec leading-relaxed text-sm md:text-base">Converse com seu time, gerencie RSVPs e construa sua rede esportiva local.</p>
            </div>
            <div className="glass p-7 md:p-10 rounded-3xl border-l-4 border-l-neon relative overflow-hidden group sm:col-span-2 md:col-span-1">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <TrophyIcon size={100} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Eleve seu nível</h3>
              <p className="text-text-sec leading-relaxed text-sm md:text-base">Acompanhe suas conquistas, ganhe reputação e torne-se um líder comunitário.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Feed*/}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 md:mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic mb-3 md:mb-4">EVENTOS ATIVOS</h2>
              <p className="text-text-sec uppercase tracking-[0.2em] font-bold text-xs md:text-sm">Junte-se a um jogo no seu bairro</p>
            </div>
            <button className="text-neon font-bold flex items-center gap-2 hover:underline text-sm md:text-base shrink-0">
              VER TODOS OS EVENTOS <ArrowRightIcon weight="bold" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-left">
            {EVENTS.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -10 }}
                className="bg-surface border border-white/5 rounded-3xl overflow-hidden hover:border-neon/30 transition-all flex flex-col h-full"
              >
                <div className="p-6 md:p-8 grow">
                  <div className="flex justify-between items-start mb-5 md:mb-6">
                    <div className="w-12 h-12 bg-dark rounded-xl flex items-center justify-center border border-white/5">
                      {event.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full text-text-sec">
                      {event.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 min-h-12 md:min-h-16">{event.title}</h3>

                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3 text-text-sec">
                      <MapPinIcon size={20} className="text-neon shrink-0" />
                      <span className="text-sm font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-sec">
                      <ClockIcon size={20} className="text-neon shrink-0" />
                      <span className="text-sm font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-sec">
                      <CalendarIcon size={20} className="text-neon" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 md:px-8 py-5 md:py-6 bg-dark/50 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UsersIcon size={18} className="text-text-sec" />
                    <span className="text-sm font-bold">
                      {event.members}/{event.maxMembers} <span className="text-text-sec font-normal ml-1">Jogadores</span>
                    </span>
                  </div>
                  <button
                    id={`btn-participar-evento-${event.id}`}
                    onClick={() => handleParticipar(event)}
                    className="text-sm font-black text-neon hover:text-white transition-colors"
                  >
                    PARTICIPAR
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Chamada*/}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-neon rounded-4xl md:rounded-[3rem] p-8 sm:p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 group shadow-neon-strong">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 text-dark text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black italic mb-4 md:mb-6 leading-tight">PRONTO PARA JOGAR?</h2>
              <p className="text-sm md:text-lg font-bold opacity-80 uppercase tracking-widest">Conecte-se com jogadores, descubra clubes e comece sua jornada.</p>
            </div>
            <button
              id="btn-criar-evento"
              onClick={() => setCriarEventoAberto(true)}
              className="relative z-10 bg-dark text-white px-10 md:px-12 py-4 md:py-6 rounded-2xl font-black text-lg md:text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl w-full sm:w-auto"
            >
              CRIAR EVENTO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;