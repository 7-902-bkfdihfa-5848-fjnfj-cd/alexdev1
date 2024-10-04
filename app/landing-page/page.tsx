'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Send, Mail, Code, Server, Zap, FileCode, Atom, MoreHorizontal } from 'lucide-react';
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
    }

    const connectParticles = () => {
      const maxDistance = 100
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      drawParticles()
      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a1e]"
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-64 h-64"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4b0082" />
                      <stop offset="50%" stopColor="#9400d3" />
                      <stop offset="100%" stopColor="#4b0082" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <motion.path
                    d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 Z"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{ pathLength: 1, rotate: 360 }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                  />
                  <motion.path
                    d="M50 30 A20 20 0 0 1 70 50 A20 20 0 0 1 50 70 A20 20 0 0 1 30 50 A20 20 0 0 1 50 30 Z"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{ pathLength: 1, rotate: -360 }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                  />
                </svg>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <span className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 filter drop-shadow-lg">
                    A
                  </span>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center mt-8"
              >
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">WELCOME TO</p>
                <h1 className="text-4xl font-bold text-white mb-4">Alexandru's Portfolio</h1>
                <p className="text-lg text-gray-300">Please wait for the Website to load.</p>
              </motion.div>
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="w-16 h-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen overflow-hidden text-[#fbfdff]">
        <motion.div 
          className="fixed inset-0 z-0" 
          style={{
            background: 'linear-gradient(45deg, #000216, #07091e, #130423)'
          }}
        />
        <canvas ref={canvasRef} className="fixed inset-0 z-10" />

        <div className="relative z-20">
          <nav className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-[#0d1226] py-2 px-4 sm:py-4 sm:px-12 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] border-[1px] border-[#2d3246] z-50 transition-transform hover:scale-105 duration-500">
            <ul className="flex space-x-4 sm:space-x-10">
              {['About', 'Projects', 'Testimonials', 'Contact'].map((item) => (
                <li key={item} className="relative group">
                  <button
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="relative text-[14px] sm:text-[16px] text-[#e4e5f1] font-medium tracking-wide transition-all duration-500"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#24263c] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-md mb-4">Full Stack Developer</p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <AnimatedSpan>Transforming</AnimatedSpan> your <AnimatedSpan>ideas</AnimatedSpan> <br />
                into unique <AnimatedSpan>websites</AnimatedSpan>
              </h1>
              <p className="text-xl mb-8 md:text-2xl">
                Hi! I'm Alex, a Full-Stack Web Developer based in Germany.
              </p>
              <motion.button
                onClick={() => scrollTo('projects')}
                className="group relative inline-flex items-center px-8 py-3 overflow-hidden text-lg font-medium text-[#fbfdff] bg-[#030618] rounded-full hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute left-0 w-full h-full transition-all duration-500 ease-out transform translate-x-full bg-gradient-to-r from-[#393a5a] to-[#5b5d7d] group-hover:-translate-x-0"></span>
                <span className="relative flex items-center">
                  Projects
                  <Send className="ml-2 h-5 w-5" />
                </span>
              </motion.button>
            </motion.div>
          </main>

          <motion.section 
            id="about" 
            className="min-h-screen p-8 text-white font-sans relative overflow-hidden"
            style={{ opacity }}
          >
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              <CursorLightBox className="col-span-1 md:col-span-2 bg-[#13132b] rounded-3xl overflow-hidden relative group">
                <Image
                  src="/images/imgabout1.svg"
                  alt="Laptop Displaying Website"
                  width={600}
                  height={400}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black to-transparent w-full">
                  <h2 className="text-2xl font-bold mb-2">I turn your ideas into fully functional Websites.</h2>
                </div>
              </CursorLightBox>

              <CursorLightBox className="bg-[#13132b] rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden">
                <h2 className="text-2xl font-bold mb-4 relative z-10">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, similique ipsa cum error vero in veniam nulla beatae odit obcaecati maxime amet perspiciatis numquam. Mollitia.</h2>
                <Image
                  src="/images/imgabout1.svg"
                  alt="Innovative Web Solutions"
                  width={2500}
                  height={500}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                />
              </CursorLightBox>

              <CursorLightBox className="bg-[#13132b] rounded-3xl p-6 group relative overflow-hidden">
                <h3 className="text-lg mb-2 relative z-10">I constantly try to improve</h3>
                <h2 className="text-2xl font-bold mb-4 relative z-10">My tech stack</h2>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { name: 'React', icon: <Atom className="w-6 h-6" /> },
                    { name: 'Bootstrap', icon: <Server className="w-6 h-6" /> },
                    { name: 'TypeScript', icon: <FileCode className="w-6 h-6" /> },
                    { name: 'NextJS', icon: <Zap className="w-6 h-6" /> },
                    { name: 'Tailwind CSS', icon: <Code className="w-6 h-6" /> },
                    { name: 'More', icon: <MoreHorizontal className="w-6 h-6" /> }
                  ].map((tech) => (
                    <motion.div 
                      key={tech.name} 
                      className="bg-[#1e1e3f] px-4 py-3 rounded-xl flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech.icon}
                      <span className="text-sm font-semibold">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CursorLightBox>

              <CursorLightBox className="bg-[#13132b] rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-sm text-gray-400 mb-2">AI For Professional Website Coding</h3>
                  <h2 className="text-2xl font-bold mb-4">What I&apos;m Working on now..</h2>
                </div>
                <div className="bg-black rounded-lg p-4 text-sm font-mono relative z-10">
                  <p className="text-pink-500">// Importing a default module</p>
                  <p className="text-white">import moduleName from 'modulePath';</p>
                  <p className="text-pink-500 mt-2">// Importing React hooks and TensorFlow.js, then defining and compiling the model</p>
                  <p className="text-white">import {'{ useEffect }'} from 'react';</p>
                  <p className="text-white">import {'* as tf'} from '@tensorflow/tfjs';</p>
                  <p className="text-white">const model = tf.sequential();</p>
                  <p className="text-white">model.add(tf.layers.dense());</p>
                  <p className="text-white">model.add(tf.layers.dense());</p>
                  <p className="text-white">model.compile();</p>
                </div>
              </CursorLightBox>

              <CursorLightBox className="bg-gradient-to-br from-[#4b0082] to-[#9400d3] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] bg-cover bg-center opacity-20 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center text-center transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-90">
                  <h2 className="text-2xl font-bold mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#e0e0e0]">Do you want to start a project together?</h2>
                  <p className="text-lg mb-6 transition-transform duration-300 group-hover:scale-105 group-hover:text-[#d3d3d3]">Let's collaborate and bring your ideas to life!</p>
                  <motion.button 
                    className="bg-[#13132b] text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition-transform duration-300 transform hover:scale-110 hover:bg-[#1e1e3f] shadow hover:shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="text-lg font-semibold">alexandru@alexandru.dev</span>
                  </motion.button>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full filter blur-xl transition-opacity duration-300 group-hover:opacity-30 transform hover:rotate-12 hover:scale-110"></div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-white opacity-10 rounded-full filter blur-lg transition-opacity duration-300 group-hover:opacity-30 transform hover:rotate-12 hover:scale-110"></div>
              </CursorLightBox>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  )
}

function AnimatedSpan({ children }: { children: React.ReactNode }) {
  return (
    <motion.span 
      className="relative inline-block"
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span 
        className="absolute inset-0 bg-gradient-to-r from-[#393a5a] to-[#5b5d7d] opacity-50 blur-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.span>
  )
}

function CursorLightBox({ children, className }: { children: React.ReactNode; className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0,  y: 0 })
  const boxRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <motion.div
      ref={boxRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
