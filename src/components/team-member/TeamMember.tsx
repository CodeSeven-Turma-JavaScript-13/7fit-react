interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc?: string;
}

function TeamMember({ name, role, imageSrc = '' }: TeamMemberProps) {
  return (
    <div className="team-member glass rounded-3xl overflow-hidden border border-white/5 hover:border-neon/30 transition-all duration-300 flex flex-col items-center p-5 sm:p-6 md:p-8 gap-4 md:gap-5 group h-full">
      {/* Avatar */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-neon/30 group-hover:border-neon transition-all duration-300 shadow-neon bg-surface flex items-center justify-center shrink-0">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`Foto de ${name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src=""
            alt={`Foto de ${name}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Info */}
      <div className="text-center flex flex-col gap-2 items-center">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-text-pri leading-tight">{name}</h3>
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest bg-neon/10 text-neon border border-neon/20 px-3 py-1 rounded-full">
          {role}
        </span>
      </div>
    </div>
  );
}

export default TeamMember;
