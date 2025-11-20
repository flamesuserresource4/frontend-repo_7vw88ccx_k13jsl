function Memories() {
  const items = [
    { title: 'Our First Adventure', text: 'From the moment we met, every day has felt like a bonus level unlocked.' },
    { title: 'Inside Jokes', text: 'You + me + way too many snacks = the perfect co-op mode.' },
    { title: 'Future Quests', text: 'More sunsets, more cities, more silly photos — I choose you, always.' },
  ]

  return (
    <section id="memories" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center">Memories & Messages</h2>
        <p className="text-blue-200/80 text-center mt-2 max-w-2xl mx-auto">A few little notes from me to you. Scroll down for your gift.</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-white backdrop-blur-md">
              <div className="text-2xl mb-3">💖</div>
              <h3 className="font-semibold text-xl">{it.title}</h3>
              <p className="text-blue-100 mt-2">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Memories
