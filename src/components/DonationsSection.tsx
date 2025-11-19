import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export function DonationsSection() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastDonation, setLastDonation] = useState<{
    amount: string;
    name: string;
  } | null>(null);

  const handleQuickAmount = (value: number) => {
    setAmount(String(value));
    setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Por favor ingresa un monto válido para donar.');
      return;
    }

    setIsProcessing(true);

    // 💳 Simulación de "pago exitoso"
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setLastDonation({
        amount,
        name: name || 'Donante anónimo',
      });

      // Limpiamos pero dejamos el nombre por si quiere donar otra vez
      setAmount('');
      setMessage('');
    }, 1200);
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="h-7 w-7 text-rose-500 fill-rose-500/20" />
              Apoya Cine Comunitario
            </h2>
            <p className="text-gray-600 mt-1">
              Tus donaciones nos ayudan a seguir compartiendo cine, cultura y debates
              abiertos para todas las comunidades.
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            Donaciones simuladas
          </Badge>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Columna izquierda: info + impacto */}
          <div className="md:col-span-2 space-y-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">¿Por qué donar?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>
                  Esta sección es una simulación pensada para tu proyecto académico.
                  No se realiza ningún cobro real, pero refleja cómo sería una
                  experiencia de donación en una plataforma como FilmArt.
                </p>


                {lastDonation && (
                  <div className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                    <p className="font-semibold flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Última donación simulada
                    </p>
                    <p>
                      {lastDonation.name} aportó{' '}
                      <span className="font-semibold">
                        ${Number(lastDonation.amount).toLocaleString()}
                      </span>
                      .
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha: formulario de donación */}
          <div className="md:col-span-3">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Haz una donación simbólica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="donation-name">Nombre</Label>
                    <Input
                      id="donation-name"
                      placeholder="Tu nombre o déjalo vacío para anónimo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donation-amount">Monto a donar (COP)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="donation-amount"
                        type="number"
                        min={0}
                        placeholder="Ej: 10000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {[5000, 10000, 20000, 50000].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAmount(value)}
                        >
                          ${value.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donation-message">
                      Mensaje para la comunidad (opcional)
                    </Label>
                    <textarea
                      id="donation-message"
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      placeholder="¿Por qué apoyas este proyecto?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {success && (
                    <div className="flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                      <CheckCircle2 className="h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-semibold">¡Donación simulada exitosa! 🎉</p>
                        <p>
                          Gracias por apoyar a FilmArt.
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Procesando donación...' : 'Hacer Donación'}
                  </Button>

                  <p className="text-[11px] text-gray-400 text-center mt-2">
                    No se realiza ningún cobro real.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
