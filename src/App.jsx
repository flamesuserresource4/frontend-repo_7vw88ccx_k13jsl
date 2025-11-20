import Hero from './components/Hero'
import Game from './components/Game'
import WishBoard from './components/WishBoard'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#0b1020]">
      {/* Hero with Spline Mario cover */}
      <Hero />

      {/* Curved separator */}
      <div className="h-16 bg-gradient-to-b from-transparent to-[#0b1020]" />

      {/* Mini game section */}
      <Game />

      {/* Wishes */}
      <WishBoard />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
