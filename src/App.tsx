import React from 'react';
import { CanvaLogo } from './components/CanvaLogo';
import { ArtworkCarousel } from './components/ArtworkCarousel';
import { CheckoutButton, CHECKOUT_URL } from './components/CheckoutButton';
import { AmbientBackground } from './components/AmbientBackground';
import { Wifi, Check, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen text-white relative selection:bg-[#00FF66]/20 selection:text-[#00FF66] overflow-x-hidden">
      <AmbientBackground />

      <main className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 pt-7 pb-16 flex flex-col items-center">
        {/* =========================================================================
            PRIMEIRA TELA (HERO)
           ========================================================================= */}
        <section className="w-full text-center flex flex-col items-center pt-2 sm:pt-4">
          {/* Selo no topo */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00FF66]/30 text-[#00FF66] text-xs font-bold tracking-wider uppercase mb-7 shadow-[0_0_20px_rgba(0,255,102,0.12)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <span>PACK DE ARTES EDITÁVEIS</span>
          </div>

          {/* Três palavras grandes, modernas, impactantes */}
          <h1 className="flex flex-col items-center font-black tracking-tighter leading-[0.92] text-5xl sm:text-6xl md:text-7xl mb-6">
            <span className="text-white drop-shadow-sm">
              PIX<span className="text-[#00FF66] text-glow-neon">.</span>
            </span>
            <span className="text-white drop-shadow-sm my-1">
              WHATSAPP<span className="text-[#00FF66] text-glow-neon">.</span>
            </span>
            <span className="text-white drop-shadow-sm">
              WI-FI<span className="text-[#00FF66] text-glow-neon">.</span>
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-[#A5ADA8] text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-6 font-medium">
            Artes prontas para personalizar e criar suas plaquinhas profissionais.
          </p>

          {/* Elemento visual Canva */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md shadow-md mb-8">
            <span className="text-xs font-semibold tracking-wider text-[#A5ADA8] uppercase">
              EDITÁVEL NO
            </span>
            <CanvaLogo size="sm" />
          </div>
        </section>

        {/* =========================================================================
            MOSTRAR AS ARTES LOGO NO COMEÇO (CARROSSEL)
           ========================================================================= */}
        <section className="w-full mt-2 mb-10 flex flex-col items-center">
          {/* Título pequeno */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-sm bg-[#00FF66] rotate-45" />
            <h2 className="text-xs sm:text-sm font-bold tracking-widest text-[#00FF66] uppercase text-glow-neon">
              ESCOLHA. EDITE. PERSONALIZE.
            </h2>
            <div className="w-2 h-2 rounded-sm bg-[#00FF66] rotate-45" />
          </div>

          {/* Carrossel Automático */}
          <ArtworkCarousel />
        </section>

        {/* =========================================================================
            OFERTA
           ========================================================================= */}
        <section className="w-full my-6">
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0a110d]/90 via-[#060a08]/95 to-[#030504] border border-[#00FF66]/25 box-glow-neon-subtle text-center flex flex-col items-center overflow-hidden">
            {/* Ambient inner soft glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#00FF66]/15 blur-3xl pointer-events-none rounded-full" />

            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#A5ADA8] uppercase mb-2">
              LEVE O PACK COMPLETO
            </span>

            {/* Preço de R$ 10,00 */}
            <div className="flex items-baseline justify-center gap-1.5 my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#00FF66]">
                R$
              </span>
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(0,255,102,0.35)]">
                10,00
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#A5ADA8] mb-6">
              Pagamento único
            </p>

            {/* Botão de Compra Principal */}
            <CheckoutButton
              label="QUERO MINHAS ARTES"
              size="lg"
              className="w-full"
            />

            <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-[#A5ADA8]/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" />
              <span>Acesso imediato • 100% no Canva</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            O QUE VOCÊ PODE PERSONALIZAR
           ========================================================================= */}
        <section className="w-full my-6">
          <div className="rounded-2xl p-5 sm:p-6 bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <h3 className="text-center text-sm font-bold tracking-widest text-white uppercase mb-5">
              EDITE DO SEU JEITO
            </h3>

            {/* Checklist */}
            <div className="space-y-3 max-w-xs mx-auto mb-6">
              {[
                'Logo',
                'QR Code',
                'Textos',
                'Informações',
                'Cores e elementos disponíveis no modelo',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-left">
                  <div className="w-5 h-5 rounded-full bg-[#00FF66]/15 border border-[#00FF66]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(0,255,102,0.2)]">
                    <Check className="w-3 h-3 text-[#00FF66] stroke-[3]" />
                  </div>
                  <span className="text-sm font-medium text-white/90">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Canva reference */}
            <div className="pt-4 border-t border-white/5 flex flex-col items-center text-center">
              <span className="text-xs text-[#A5ADA8] mb-2 font-medium">
                Tudo direto no Canva.
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10">
                <CanvaLogo size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            TRÊS DESTAQUES
           ========================================================================= */}
        <section className="w-full my-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* PIX */}
            <div className="rounded-2xl p-4 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-[#00FF66]/40 transition-colors flex sm:flex-col items-center gap-3.5 text-left sm:text-center">
              <div className="w-11 h-11 rounded-xl bg-black/60 border border-[#00FF66]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,255,102,0.15)]">
                {/* Official Pix Geometric Diamond Icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-[#00FF66]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.13 4.57a4.06 4.06 0 0 1 5.74 0l4.56 4.56a4.06 4.06 0 0 1 0 5.74l-4.56 4.56a4.06 4.06 0 0 1-5.74 0L4.57 14.87a4.06 4.06 0 0 1 0-5.74l4.56-4.56z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 9.5l5 5M14.5 9.5l-5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm sm:text-base tracking-wide">
                  PIX
                </h4>
                <p className="text-xs text-[#A5ADA8] mt-0.5">
                  Receba pagamentos
                </p>
              </div>
            </div>

            {/* WHATSAPP */}
            <div className="rounded-2xl p-4 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-[#00FF66]/40 transition-colors flex sm:flex-col items-center gap-3.5 text-left sm:text-center">
              <div className="w-11 h-11 rounded-xl bg-black/60 border border-[#00FF66]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,255,102,0.15)]">
                {/* WhatsApp Chat Vector */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-[#00FF66]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21a9 9 0 0 1-4.6-1.3L3 21l1.3-4.3A9 9 0 1 1 12 21z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 10a5 5 0 0 0 5 5m-5-5c0-.6.4-1 1-1h.5a1 1 0 0 1 .9.6l.6 1.4c.2.5 0 1-.4 1.3l-.6.5c.6 1.2 1.6 2.2 2.8 2.8l.5-.6c.3-.4.8-.6 1.3-.4l1.4.6c.5.2.8.7.6 1.2V17c0 .6-.4 1-1 1A8 8 0 0 1 9 10z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm sm:text-base tracking-wide">
                  WHATSAPP
                </h4>
                <p className="text-xs text-[#A5ADA8] mt-0.5">
                  Facilite o contato
                </p>
              </div>
            </div>

            {/* WI-FI */}
            <div className="rounded-2xl p-4 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-[#00FF66]/40 transition-colors flex sm:flex-col items-center gap-3.5 text-left sm:text-center">
              <div className="w-11 h-11 rounded-xl bg-black/60 border border-[#00FF66]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,255,102,0.15)]">
                <Wifi className="w-5 h-5 text-[#00FF66]" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm sm:text-base tracking-wide">
                  WI-FI
                </h4>
                <p className="text-xs text-[#A5ADA8] mt-0.5">
                  Facilite o acesso
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CTA FINAL
           ========================================================================= */}
        <section className="w-full mt-8 mb-4">
          <div className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-b from-[#09120b] via-[#050906] to-[#020403] border border-[#00FF66]/40 box-glow-neon text-center flex flex-col items-center overflow-hidden">
            {/* Radiant green ambient glow behind text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-48 bg-[#00FF66]/20 blur-3xl rounded-full pointer-events-none" />

            <h3 className="font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-3">
              SUAS PLAQUINHAS
              <br />
              <span className="text-[#00FF66] text-glow-neon">
                COMEÇAM AQUI.
              </span>
            </h3>

            <p className="text-[#A5ADA8] text-sm sm:text-base max-w-sm mx-auto mb-6">
              Edite no Canva. Personalize. Use nas suas criações.
            </p>

            {/* Pack Pill Highlight */}
            <div className="px-4 py-2 rounded-xl bg-black/60 border border-[#00FF66]/30 mb-2">
              <span className="text-xs sm:text-sm font-extrabold tracking-wider text-white">
                PACK PIX + WHATSAPP + WI-FI
              </span>
            </div>

            {/* Preço de R$ 10 */}
            <div className="my-3">
              <span className="text-xs uppercase font-bold tracking-widest text-[#00FF66] block mb-1">
                APENAS
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white">
                R$ 10
              </div>
            </div>

            {/* Botão Final */}
            <CheckoutButton
              label="COMPRAR AGORA"
              size="lg"
              className="w-full mt-3"
            />

            <span className="text-xs font-medium text-[#A5ADA8] mt-3">
              Pagamento único
            </span>
          </div>
        </section>

        {/* =========================================================================
            RODAPÉ
           ========================================================================= */}
        <footer className="w-full mt-10 pt-6 border-t border-white/10 text-center flex flex-col items-center gap-2">
          <p className="text-xs font-semibold tracking-wide text-white/70">
            Artes Editáveis no Canva
          </p>
          <p className="text-[11px] text-[#A5ADA8]/50">
            © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
        </footer>
      </main>
    </div>
  );
}
