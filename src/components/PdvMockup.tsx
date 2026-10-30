import type { Dictionary } from '@/lib/getDictionary'

// Ilustração da tela de pagamento do Harpia PDV na maquininha (roxo + lavanda), sem dados reais
export default function PdvMockup({ dict }: { dict: Dictionary['products']['pdv']['mockup'] }) {
  return (
    <div
      role="img"
      aria-label={dict.label}
      className="w-68 max-w-full rounded-[26px] border border-pdv-soft bg-white p-5 shadow-[0_14px_34px_rgb(22_18_43/0.10)]"
    >
      <p className="text-[0.8rem] text-pdv-mute-2">{dict.when}</p>
      <p className="mt-2.5 mb-3.5 font-pdv text-base font-bold">{dict.question}</p>
      <div className="grid grid-cols-2 gap-2">
        {dict.methods.map((method, i) => (
          <span
            key={method}
            className={`rounded-[14px] px-1.5 py-3 text-center text-[0.9rem] font-semibold ${i === 0 ? 'bg-pdv-accent text-white' : 'bg-pdv-soft text-pdv-ink'}`}
          >
            {method}
          </span>
        ))}
      </div>
      <p className="mt-3.5 text-[0.8rem] text-pdv-mute-2">{dict.note}</p>
    </div>
  )
}
