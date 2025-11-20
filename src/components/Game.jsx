import { useEffect, useRef, useState } from 'react'

// Super simple runner mini-game with keyboard: arrows / space to jump
function Game() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let raf
    let running = false

    // World settings
    const W = (canvas.width = 720)
    const H = (canvas.height = 260)
    const groundY = H - 40

    // Player
    const player = { x: 60, y: groundY - 28, w: 24, h: 28, vy: 0, onGround: true }

    // Obstacles
    const obstacles = []
    let spawnTimer = 0

    const gravity = 0.9

    const reset = () => {
      obstacles.length = 0
      player.y = groundY - player.h
      player.vy = 0
      player.onGround = true
      setScore(0)
    }

    const spawn = () => {
      const height = 18 + Math.random() * 24
      obstacles.push({ x: W + 10, y: groundY - height, w: 16 + Math.random() * 10, h: height, speed: 4 + Math.random() * 2 })
    }

    const drawPlayer = () => {
      // Mario-esque colors
      ctx.fillStyle = '#ef4444' // hat/body
      ctx.fillRect(player.x, player.y, player.w, player.h)
      ctx.fillStyle = '#f59e0b' // face
      ctx.fillRect(player.x, player.y + 6, player.w, 10)
      ctx.fillStyle = '#1e3a8a' // pants
      ctx.fillRect(player.x, player.y + player.h - 10, player.w, 10)
    }

    const drawGround = () => {
      ctx.fillStyle = '#14532d'
      ctx.fillRect(0, groundY, W, 4)
      for (let i = 0; i < W; i += 24) {
        ctx.fillStyle = i % 48 === 0 ? '#16a34a' : '#22c55e'
        ctx.fillRect(i, groundY + 4, 24, H - groundY)
      }
    }

    const drawObstacles = () => {
      ctx.fillStyle = '#a16207'
      obstacles.forEach((o) => {
        ctx.fillRect(o.x, o.y, o.w, o.h)
      })
    }

    const rectsOverlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

    const step = () => {
      ctx.clearRect(0, 0, W, H)

      // spawn
      spawnTimer--
      if (spawnTimer <= 0) {
        spawn()
        spawnTimer = 60 + Math.random() * 60
      }

      // update obstacles
      obstacles.forEach((o) => {
        o.x -= o.speed
      })
      for (let i = obstacles.length - 1; i >= 0; i--) {
        if (obstacles[i].x + obstacles[i].w < 0) obstacles.splice(i, 1)
      }

      // gravity
      if (!player.onGround) {
        player.vy += gravity
        player.y += player.vy
        if (player.y >= groundY - player.h) {
          player.y = groundY - player.h
          player.vy = 0
          player.onGround = true
          setScore((s) => s + 1)
        }
      }

      // collisions
      for (const o of obstacles) {
        if (rectsOverlap(player, o)) {
          running = false
          setPlaying(false)
        }
      }

      // draw
      drawGround()
      drawObstacles()
      drawPlayer()

      // score
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px Inter, sans-serif'
      ctx.fillText(`Score: ${score}`, 20, 28)

      if (running) raf = requestAnimationFrame(step)
    }

    const onKey = (e) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && player.onGround) {
        player.vy = -12
        player.onGround = false
      }
      if (e.code === 'Enter' && !running) {
        reset()
        running = true
        setPlaying(true)
        step()
      }
    }

    const start = () => {
      if (running) return
      reset()
      running = true
      setPlaying(true)
      step()
    }

    window.addEventListener('keydown', onKey)
    start()

    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
    }
  }, [score])

  return (
    <section id="game" className="relative bg-[#0b1020] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-1">
            <div className="border-4 border-amber-400 rounded-xl overflow-hidden shadow-[0_12px_0_#a16207]">
              <canvas ref={canvasRef} width={720} height={260} className="w-full block bg-[#0b1020]"></canvas>
            </div>
            <p className="text-blue-200/80 mt-4 text-sm">Press Enter to start • Space to jump • Avoid the blocks</p>
          </div>

          <div className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-bold text-xl">Rules</h3>
            <ul className="mt-3 text-blue-100/90 text-sm space-y-2 list-disc list-inside">
              <li>Jump over obstacles to rack up points.</li>
              <li>When you land, your score increments.</li>
              <li>Crash ends the run. Press Enter to try again.</li>
            </ul>
            <div className="mt-4 text-sm text-blue-200/80">
              Score is just for fun — the real gift is your message below.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Game
