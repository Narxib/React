import { useEffect, useState } from 'react'

function FollowMouse () {
  const [enable, setEnable] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('effecto', enable)

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('HANDLEMOVE', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }
    if (enable === true) {
      window.addEventListener('pointermove', handleMove)
    }
    return () => { window.removeEventListener('pointermove', handleMove) }
  }, [enable])

  return (
    <>
      <div style={{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'blue',
        opacity: '.5',
        pointerEvents: 'none',
        left: '-20px',
        right: '-20px',
        width: '40px',
        height: '40px',
        top: '-20px',
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnable(!enable)}>{enable ? 'Desactivar' : 'Activar'} seguir puntero</button>
    </>
  )
}

function App () {
  const [mounted, setMounted] = useState(true)
  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        {mounted ? 'Deactivate' : 'Activate'} component
      </button>
    </main>
  )
}

export default App
