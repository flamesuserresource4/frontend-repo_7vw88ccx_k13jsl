import Spline from '@splinetool/react-spline'

function Hero() {
  const handleScroll = () => {
    const el = document.getElementById('game');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/OIGfFUmCnZ3VD8gH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability, don't block pointer events on Spline */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020] via-[#0b1020]/20 to-transparent"></div>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <p className="text-blue-200/90 text-sm uppercase tracking-[0.3em] mb-3">Level Up Love</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white drop-shadow-[0_6px_0_rgba(6,11,30,0.5)]">
            Happy Birthday, Princess!
          </h1>
          <p className="mt-5 text-blue-100/90 text-lg sm:text-xl">
            Press Start to play a tiny Mario-inspired mini‑game and leave a sweet wish.
          </p>
          <div className="mt-8">
            <button onClick={handleScroll} className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-[#0b1020] font-bold px-6 py-3 rounded-xl shadow-[0_10px_0_#a16207] active:translate-y-1 active:shadow-[0_6px_0_#a16207] transition-all">
              <span className="text-lg">▶</span>
              <span>Press Start</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
