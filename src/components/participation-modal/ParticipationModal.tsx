import { useState, useEffect, type SyntheticEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, UserIcon, MapPinIcon, AtIcon, XIcon } from '@phosphor-icons/react';

interface EventInfo {
  id: number;
  title: string;
  location: string;
  time: string;
}

interface ParticipationModalProps {
  event: EventInfo | null;
  onClose: () => void;
}

interface FormData {
  nome: string;
  idade: string;
  cidade: string;
}

const INITIAL_FORM: FormData = { nome: '', idade: '', cidade: '' };

function ParticipationModal({ event, onClose }: ParticipationModalProps) {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  // Fecha com Escape e trava o scroll SOMENTE enquanto o modal estiver aberto
  useEffect(() => {
    if (!event) return; // modal fechado: não faz nada
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [event, onClose]);

  // Reseta estado interno toda vez que o modal abre para um novo evento
  useEffect(() => {
    if (event) {
      setForm(INITIAL_FORM);
      setErrors({});
      setSubmitted(false);
    }
  }, [event]);

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.nome.trim()) newErrors.nome = 'Nome é obrigatório.';
    if (!form.idade.trim()) {
      newErrors.idade = 'Idade é obrigatória.';
    } else if (isNaN(Number(form.idade)) || Number(form.idade) < 5 || Number(form.idade) > 120) {
      newErrors.idade = 'Informe uma idade válida (5–120).';
    }
    if (!form.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  if (!event) return null;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        key="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="glass border border-white/10 rounded-3xl w-full max-w-md pointer-events-auto overflow-hidden"
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
                  INSCRIÇÃO <span className="text-neon">CONFIRMADA!</span>
                </h2>
                <p className="text-text-sec text-sm leading-relaxed">
                  Você está dentro, <strong className="text-text-pri">{form.nome}</strong>! 🎉<br />
                  Te vemos em <strong className="text-neon">{event.title}</strong>.
                </p>
              </div>
              <button
                id="modal-close-confirmed"
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
                    <span className="text-neon text-[10px] font-black uppercase tracking-widest">Inscrição em evento</span>
                  </div>
                  <h2 id="modal-title" className="text-xl sm:text-2xl font-black italic leading-tight">
                    PARTICIPAR DE <br />
                    <span className="text-neon">{event.title}</span>
                  </h2>
                  <p className="text-text-sec text-xs mt-1">{event.location} · {event.time}</p>
                </div>
                <button
                  id="modal-close-btn"
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors ml-4 shrink-0 mt-1"
                >
                  <XIcon size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 pt-6 flex flex-col gap-5">
                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="campo-nome" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                    <UserIcon size={14} className="text-neon" /> Nome completo
                  </label>
                  <input
                    id="campo-nome"
                    type="text"
                    placeholder="Ex: João Silva"
                    value={form.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    className={`w-full bg-dark border rounded-xl px-4 py-3 text-sm text-text-pri placeholder:text-text-sec/50 outline-none transition-colors focus:border-neon ${
                      errors.nome ? 'border-red-500/70' : 'border-white/10'
                    }`}
                  />
                  {errors.nome && <p className="text-red-400 text-xs">{errors.nome}</p>}
                </div>

                {/* Idade */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="campo-idade" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                    <AtIcon size={14} className="text-neon" /> Idade
                  </label>
                  <input
                    id="campo-idade"
                    type="number"
                    min={5}
                    max={120}
                    placeholder="Ex: 25"
                    value={form.idade}
                    onChange={(e) => handleChange('idade', e.target.value)}
                    className={`w-full bg-dark border rounded-xl px-4 py-3 text-sm text-text-pri placeholder:text-text-sec/50 outline-none transition-colors focus:border-neon ${
                      errors.idade ? 'border-red-500/70' : 'border-white/10'
                    }`}
                  />
                  {errors.idade && <p className="text-red-400 text-xs">{errors.idade}</p>}
                </div>

                {/* Cidade */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="campo-cidade" className="text-xs font-bold uppercase tracking-widest text-text-sec flex items-center gap-1.5">
                    <MapPinIcon size={14} className="text-neon" /> Sua localização
                  </label>
                  <input
                    id="campo-cidade"
                    type="text"
                    placeholder="Ex: Rio de Janeiro, RJ"
                    value={form.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                    className={`w-full bg-dark border rounded-xl px-4 py-3 text-sm text-text-pri placeholder:text-text-sec/50 outline-none transition-colors focus:border-neon ${
                      errors.cidade ? 'border-red-500/70' : 'border-white/10'
                    }`}
                  />
                  {errors.cidade && <p className="text-red-400 text-xs">{errors.cidade}</p>}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    id="modal-submit-btn"
                    type="submit"
                    className="flex-1 bg-neon text-dark py-3 rounded-xl font-black text-sm glow-neon-hover transition-all hover:-translate-y-0.5 active:scale-95"
                  >
                    CONFIRMAR PARTICIPAÇÃO
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

export default ParticipationModal;
