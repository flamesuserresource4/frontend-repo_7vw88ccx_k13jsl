function CTA() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 px-4 py-2 rounded-full mb-4">🎁 Special Gift</div>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Press Start to Celebrate</h3>
        <p className="text-blue-200/80 mt-3">Hit the button to reveal a personalized birthday message and a confetti burst.</p>
        <button
          onClick={() => {
            alert('Happy Birthday, my love! Here\'s to more levels, more lives, and endless continues together. 💗')
          }}
          className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
        >Press Start</button>
      </div>
    </section>
  )
}

export default CTA
