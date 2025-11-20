import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { DonationsSection } from './DonationsSection';

export function DonationFloatingButton() {
  const [open, setOpen] = useState(false);

  // Para saber si la donación fue exitosa desde el modal compacto
  const [closeTrigger, setCloseTrigger] = useState(0);

  return (
    <>
      {/* 🔴 Botón flotante SOLO en móvil */}
<button
  type="button"
  onClick={() => setOpen(true)}
  className="
    fixed
    right-4
    top-1/2
    -translate-y-1/2
    md:hidden
    bg-white
    hover:bg-gray-100
    p-4
    rounded-full
    shadow-xl
    z-40
    flex
    items-center
    justify-center
  "
  style={{ opacity: 1, mixBlendMode: "normal" }}
>
  <Heart
    className="h-6 w-6"
    style={{ color: "#4f39f6", opacity: 1, mixBlendMode: "normal" }}
  />
</button>

      {/* 🔵 MODAL FLOTANTE COMPACTO */}
      
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="
              bg-white
              rounded-2xl
              shadow-2xl
              w-full
              max-w-sm
              max-h-[80vh]
              overflow-y-auto
              animate-fadeIn
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Encabezado */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <p className="text-sm font-semibold text-gray-900">
                Apoya Cine Comunitario
              </p>

              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* 💳 Versión compacta del donations section */}
            <CompactDonations onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Animación */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}

/* ⭐ Modal compacto basado en DonationsSection */
function CompactDonations({ onSuccess }: { onSuccess: () => void }) {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert('Ingresa un monto válido.');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      // Cerrar automáticamente después de 1 segundo
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }, 800);
  };

  return (
    <div className="px-4 py-4 text-sm">
      <form onSubmit={handleDonate} className="space-y-3">
        <div>
          <label className="text-xs font-semibold">Nombre (opcional)</label>
          <input
            className="w-full border rounded-md px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Monto a donar</label>
          <input
            type="number"
            className="w-full border rounded-md px-2 py-1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ej: 10000"
          />
        </div>

        {/* Botones rápidos */}
        <div className="flex flex-wrap gap-2">
          {[5000, 10000, 20000].map((v) => (
            <button
              type="button"
              key={v}
              onClick={() => setAmount(String(v))}
              className="text-xs border rounded-md px-2 py-1 bg-gray-50 hover:bg-gray-100"
            >
              ${v.toLocaleString()}
            </button>
          ))}
        </div>

        {success && (
          <p className="text-emerald-600 text-xs">
            ¡Donación simulada exitosa! 🎉
          </p>
        )}
<button
  type="submit"
  className="w-full py-3 rounded-md text-center font-semibold"
  style={{ color: "white", backgroundColor: "var(--color-indigo-600)" }}
>
  {processing ? "Procesando..." : "Donar ahora"}
</button>




      </form>
    </div>
  );
}
