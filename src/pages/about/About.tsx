import { motion } from 'framer-motion';
import { UsersIcon } from '@phosphor-icons/react';
import TeamMember from '../../components/team-member/TeamMember';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Ana Beatriz',
    role: 'Scrum Master',
    imageSrc:'https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Ana_Beatriz-removebg-preview-removebg-preview1.png'
    
  },
  {
    id: 2,
    name: 'Larissa Mendonça',
    role: 'Tester',
    imageSrc:'https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Larissa_Mendonca_2-removebg-preview-removebg-preview.jpg'
  },
  {
    id: 3,
    name: 'Julia Lima',
    role: 'Dev',
    imageSrc:'https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/WhatsApp_Image_2026-03-06_at_13.24.23-removebg-preview-removebg-preview2.png?updatedAt=1776225975068'
  },
  {
    id: 4,
    name: 'Daniella Camilo',
    role: 'Dev',
    imageSrc:'https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Daniella_Camilo_6-removebg-preview-removebg-preview.jpg'
  },
  {
    id: 5,
    name: 'João Pedro',
    role: 'Dev',
    imageSrc:'https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Joao_Pedro_5-removebg-preview-removebg-preview.jpg'
  },
  {
    id: 6,
    name: 'Matheus Canellas',
    role: 'Dev',
    imageSrc:'https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Matheus_Canellas_6-removebg-preview-removebg-preview.jpg'
  },
  {
    id: 7,
    name: 'Lucas Jesus',
    role: 'Dev',
    imageSrc:'https://ik.imagekit.io/o02kjfcyy/Integrantes%20Code7/Lucas_Jesus_4-removebg-preview-removebg-preview.jpg'
  },
];

function About() {
  return (
    <div className="pb-16 md:pb-24">
      {/* Hero da seção */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden">
        <div className="bg-grid absolute inset-0 -z-10 opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge do grupo */}
            <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 px-4 py-2 rounded-full mb-6 md:mb-8">
              <span className="w-2 h-2 bg-neon rounded-full animate-pulse shadow-neon" />
              <span className="text-neon text-xs font-bold uppercase tracking-widest">
                Code7 — Grupo 5
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic mb-4 md:mb-6 leading-[0.9] tracking-tighter">
              SOBRE O <br />
              <span className="text-neon text-glow">NOSSO TIME.</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-text-sec max-w-2xl mx-auto leading-relaxed px-2">
              Conheça os integrantes da <strong className="text-text-pri">Code7 (Grupo 5)</strong>,
              o time responsável por desenvolver a aplicação <strong className="text-neon">7fit</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grade de integrantes */}
      <section className="py-10 md:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Cabeçalho da grade */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 md:mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic mb-3 md:mb-4">
                NOSSOS INTEGRANTES
              </h2>
              <p className="text-text-sec uppercase tracking-[0.2em] font-bold text-xs md:text-sm flex items-center gap-2">
                <UsersIcon size={16} className="text-neon" />
                {TEAM_MEMBERS.length} membros no time
              </p>
            </div>
          </div>

          {/* Cards — linha 1: integrantes 1–4 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {TEAM_MEMBERS.slice(0, 4).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <TeamMember
                  name={member.name}
                  role={member.role}
                  imageSrc={member.imageSrc}
                />
              </motion.div>
            ))}
          </div>

          {/* Cards — linha 2: integrantes 5–7 centralizados */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6 sm:max-w-[75%] mx-auto">
            {TEAM_MEMBERS.slice(4).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                whileHover={{ y: -8 }}
                className={index === 2 ? 'col-span-2 sm:col-span-1 max-w-xs mx-auto w-full' : ''}
              >
                <TeamMember
                  name={member.name}
                  role={member.role}
                  imageSrc={member.imageSrc}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-surface border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center gap-4 md:gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon/5 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic mb-3 md:mb-4">
                FEITO COM <span className="text-neon">DEDICAÇÃO.</span>
              </h2>
              <p className="text-text-sec text-sm md:text-lg font-medium max-w-xl mx-auto">
                Este projeto foi desenvolvido como parte do aprendizado em React pelo grupo
                {' '}<span className="text-text-pri font-bold">Code7 (Grupo 5)</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
