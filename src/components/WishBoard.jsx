import { useEffect, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function WishBoard() {
  const [wishes, setWishes] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadWishes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/wishes`)
      const data = await res.json()
      setWishes(data)
    } catch (e) {
      console.error(e)
    }
  }

  const submitWish = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${BASE_URL}/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Failed to submit')
      }
      setName('')
      setMessage('')
      await loadWishes()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWishes()
  }, [])

  return (
    <section className="relative bg-[#0b1020] pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Leave a Wish</h2>
            <p className="text-blue-200/90 mt-2">Share a sweet note for the birthday girl 💖</p>

            <form onSubmit={submitWish} className="mt-6 space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                maxLength={50}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
                maxLength={300}
              />
              <button
                disabled={loading}
                className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-[#0b1020] font-bold px-6 py-3 rounded-xl shadow-[0_10px_0_#a16207] active:translate-y-1 active:shadow-[0_6px_0_#a16207] transition-all"
              >
                {loading ? 'Sending...' : 'Send Wish'}
              </button>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </form>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl mb-4">Recent Wishes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {wishes.map(w => (
                <div key={w.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white font-semibold">{w.name}</div>
                  <div className="text-blue-100/90 text-sm mt-1">{w.message}</div>
                </div>
              ))}
              {wishes.length === 0 && (
                <div className="text-blue-200/80">No wishes yet. Be the first!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WishBoard
