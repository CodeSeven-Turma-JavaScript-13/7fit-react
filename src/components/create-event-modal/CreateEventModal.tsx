import { useState, useEffect, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XIcon, BarbellIcon, MapPinIcon, CalendarBlankIcon, ClockIcon, UserIcon, UsersThreeIcon } from '@phosphor-icons/react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EventFormData {
  exercicio: string;
  local: string;
  dataEvento: string;
  nomeCriador: string;
  horaEvento: string;
  participantesQuant: string;
}

const INITIAL_FORM: EventFormData = {
  exercicio: '',
  local: '',
  dataEvento: '',
  nomeCriador: '',
  horaEvento: '',
  participantesQuant: '',
};

function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const [form, setForm] = useState<EventFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<EventFormData>>({});
  const [submitted, setSubmitted] = useState(false);

  // Trava scroll e fecha com Escape SOMENTE quando o modal estiver aberto
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reseta formulário ao abrir
  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM);
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen]);

  function validate(): boolean {
    const newErrors: Partial<EventFormData> = {};
    if (!form.exercicio.trim()) newErrors.exercicio = 'Exercício é obrigatório.';
    if (!form.local.trim()) newErrors.local = 'Local é obrigatório.';
    if (!form.dataEvento) newErrors.dataEvento = 'Data do evento é obrigatória.';
    if (!form.nomeCriador.trim()) newErrors.nomeCriador = 'Nome do criador é obrigatório.';
    if (!form.horaEvento) newErrors.horaEvento = 'Horário é obrigatório.';
    if (!form.participantesQuant.trim()) {
      newErrors.participantesQuant = 'Quantidade é obrigatória.';
    } else if (isNaN(Number(form.participantesQuant)) || Number(form.participantesQuant) < 2 || Number(form.participantesQuant) > 100) {
      newErrors.participantesQuant = 'Informe um número válido (2–100).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  function handleChange(field: keyof EventFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  if (!isOpen) return null;

  const inputClass = (field: keyof EventFormData) =>
    `w-full bg-dark border rounded-xl px-4 py-3 text-sm text-text-pri placeholder:text-text-sec/50 outline-none transition-colors focus:border-neon ${
      errors[field] ? 'border-red-500/70' : 'border-white/10'
    }`;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="create-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        key="create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-event-title"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="glass border border-white/10 rounded-3xl w-full max-w-lg pointer-events-auto overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {submitted ? (
            /* ── Tela de confirmação ── */
            <div className="flex flex-col items-center text-center p-8 sm:p-10 gap-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <CheckCircleIcon size={72} weight="fill" className="text-neon" />
              </motion.div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black italic mb-2">
                  EVENTO <span className="text-neon">CRIADO!</span>
                </h2>
                <p className="text-text-sec text-sm leading-relaxed">
                  Seu evento <strong className="text-neon">{form.exercicio}</strong> foi criado com sucesso! 🎉<br />
                  <span className="text-text-sec/80">
                    {form.local} · {form.dataEvento} às {form.horaEvento}
                  </span>
                </p>
              </div>
              <button
                id="create-event-close-confirmed"
                onClick={onClose}
                className="mt-2 bg-neon text-dark px-8 py-3 rounded-xl font-black text-sm glow-neon-hover transition-all hover:-translate-y-0.5"
              >
                FECHAR
              </button>
            </div>
          ) : (
            /* ── Formulário ── */
            <>
              {/* Header */}
              <div className="flex items-start justify-between p-6 sm:p-8 pb-0">
                <div>
                  <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/20 px-3 py-1 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse" />
                    <span className="text-neon text-[10px] font-black uppercase tracking-widest">Novo evento</span>
                  </div>
                  <h2 id="create-event-title" className="text-xl sm:text-2xl font-black italic leading-tight">
                    CRIAR <span className="text-neon">EVENTO</span>
                  </h2>
                  <p className="text-text-sec text-xs mt-1">Preencha os dados e reúna seu time</p>
                </div>
                <button
                  id="create-event-close-btn"
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4 shrink-0 mt-1"
                >
                  <XIcon size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 pt-6 flex flex-col gap-4">
                {/* Exercício */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="campo-exercicio" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                    <BarbellIcon size={14} className="text-neon" /> Exercício
                  </label>
                  <input
                    id="campo-exercicio"
                    type="text"
                    placeholder="Ex: Futebol, Basquete, Vôlei..."
                    value={form.exercicio}
                    onChange={(e) => handleChange('exercicio', e.target.value)}
                    className={inputClass('exercicio')}
                  />
                  {errors.exercicio && <p className="text-red-400 text-xs">{errors.exercicio}</p>}
                </div>

                {/* Local */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="campo-local" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                    <MapPinIcon size={14} className="text-neon" /> Local
                  </label>
                  <input
                    id="campo-local"
                    type="text"
                    placeholder="Ex: Barra da Tijuca, RJ"
                    value={form.local}
                    onChange={(e) => handleChange('local', e.target.value)}
                    className={inputClass('local')}
                  />
                  {errors.local && <p className="text-red-400 text-xs">{errors.local}</p>}
                </div>

                {/* Data e Horário — lado a lado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Data */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="campo-data" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                      <CalendarBlankIcon size={14} className="text-neon" /> Data do Evento
                    </label>
                    <input
                      id="campo-data"
                      type="date"
                      value={form.dataEvento}
                      onChange={(e) => handleChange('dataEvento', e.target.value)}
                      className={inputClass('dataEvento')}
                    />
                    {errors.dataEvento && <p className="text-red-400 text-xs">{errors.dataEvento}</p>}
                  </div>

                  {/* Horário */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="campo-horario" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                      <ClockIcon size={14} className="text-neon" /> Horário
                    </label>
                    <input
                      id="campo-horario"
                      type="time"
                      value={form.horaEvento}
                      onChange={(e) => handleChange('horaEvento', e.target.value)}
                      className={inputClass('horaEvento')}
                    />
                    {errors.horaEvento && <p className="text-red-400 text-xs">{errors.horaEvento}</p>}
                  </div>
                </div>

                {/* Nome do Criador e Participantes — lado a lado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome do Criador */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="campo-criador" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                      <UserIcon size={14} className="text-neon" /> Nome do Criador
                    </label>
                    <input
                      id="campo-criador"
                      type="text"
                      placeholder="Seu nome"
                      value={form.nomeCriador}
                      onChange={(e) => handleChange('nomeCriador', e.target.value)}
                      className={inputClass('nomeCriador')}
                    />
                    {errors.nomeCriador && <p className="text-red-400 text-xs">{errors.nomeCriador}</p>}
                  </div>

                  {/* Quantidade de Participantes */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="campo-participantes" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                      <UsersThreeIcon size={14} className="text-neon" /> Participantes
                    </label>
                    <input
                      id="campo-participantes"
                      type="number"
                      min={2}
                      max={100}
                      placeholder="Ex: 10"
                      value={form.participantesQuant}
                      onChange={(e) => handleChange('participantesQuant', e.target.value)}
                      className={inputClass('participantesQuant')}
                    />
                    {errors.participantesQuant && <p className="text-red-400 text-xs">{errors.participantesQuant}</p>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    id="create-event-submit-btn"
                    type="submit"
                    className="flex-1 bg-neon text-dark py-3 rounded-xl font-black text-sm glow-neon-hover transition-all hover:-translate-y-0.5 active:scale-95"
                  >
                    CRIAR EVENTO
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 glass py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CreateEventModal;
