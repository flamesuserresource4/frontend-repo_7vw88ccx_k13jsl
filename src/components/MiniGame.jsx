import { useEffect, useRef, useState } from 'react'

// Simple side-scroller mini-game (Mario vibe)
function MiniGame() {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    // Game world
    const gravity = 0.6
    const groundY = 240

    const player = { x: 60, y: groundY - 28, w: 28, h: 28, vy: 0, onGround: true }
    const pipes = []
    let spawnTimer = 0

    function reset() {
      setScore(0)
      player.x = 60
      player.y = groundY - 28
      player.vy = 0
      player.onGround = true
      pipes.length = 0
      spawnTimer = 0
    }

    function jump() {
      if (player.onGround) {
        player.vy = -10
        player.onGround = false
      }
    }

    function update() {
      // Spawn obstacles
      spawnTimer++
      if (spawnTimer > 90) {
        spawnTimer = 0
        const gap = 60 + Math.random() * 40
        const height = 30 + Math.random() * 90
        pipes.push({ x: 400, y: groundY - height, w: 24, h: height })
      }

      // Physics
      player.vy += gravity
      player.y += player.vy
      if (player.y + player.h >= groundY) {
        player.y = groundY - player.h
        player.vy = 0
        player.onGround = true
      }

      // Move pipes
      for (let i = pipes.length - 1; i >= 0; i--) {
        const p = pipes[i]
        p.x -= 2.4
        if (p.x + p.w < 0) {
          pipes.splice(i, 1)
          setScore(s => s + 1)
        }
      }

      // Collision
      for (const p of pipes) {
        if (
          player.x < p.x + p.w &&
          player.x + player.w > p.x &&
          player.y < p.y + p.h &&
          player.y + player.h > p.y
        ) {
          // Hit
          reset()
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Sky
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, '#7dd3fc')
      grad.addColorStop(1, '#60a5fa')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Ground
      ctx.fillStyle = '#16a34a'
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY)

      // Pipes (Goombas block-like)
      ctx.fillStyle = '#f59e0b'
      for (const p of pipes) {
        ctx.fillRect(p.x, p.y, p.w, p.h)
      }

      // Player (little heart block)
      ctx.fillStyle = '#ec4899'
      ctx.fillRect(player.x, player.y, player.w, player.h)

      // Score
      ctx.fillStyle = '#ffffff'
      ctx.font = '14px Manrope, sans-serif'
      ctx.fillText(`Score: ${score}`, 12, 20)
    }

    function loop() {
      update()
      draw()
      animationId = requestAnimationFrame(loop)
    }

    if (running) {
      reset()
      animationId = requestAnimationFrame(loop)
    }

    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') jump()
    }
    window.addEventListener('keydown', onKey)
    canvas.addEventListener('pointerdown', jump)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', jump)
    }
  }, [running])

  return (
    <section id="minigame" className="py-16 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Tiny Side‑Scroller</h2>
          <button
            onClick={() => setRunning(r => !r)}
            className="px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
          >{running ? 'Stop' : 'Start'}</button>
        </div>
        <div className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-slate-800">
          <canvas ref={canvasRef} width="400" height="260" className="w-full h-auto block" />
        </div>
        <p className="text-blue-200/80 text-sm mt-3">Tap or press space to jump. Avoid the blocks, rack up points, and earn a surprise below.</p>
      </div>
    </section>
  )
}

export default MiniGame
