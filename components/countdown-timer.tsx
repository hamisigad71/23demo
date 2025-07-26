"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { JSX } from "react/jsx-runtime"

interface CountdownTimerProps {
  targetDate: string
  promotionMessage: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date()
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }
  return timeLeft
}

export function CountdownTimer({ targetDate, promotionMessage }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const timerComponents: JSX.Element[] = []

  Object.keys(timeLeft).forEach((interval) => {
    const value = timeLeft[interval as keyof TimeLeft]
    if (value > 0 || timerComponents.length > 0 || interval === "seconds") {
      timerComponents.push(
        <div key={interval} className="flex flex-col items-center">
          <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-sm md:text-base text-blue-100 uppercase">{interval}</span>
        </div>
      )
    }
  })

  return (
    <motion.div
      className="relative bg-gradient-to-r from-red-500 to-orange-500 py-12 md:py-16 text-center shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Promotional background"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 drop-shadow-md">{promotionMessage}</h2>
        {timerComponents.length ? (
          <div className="flex justify-center space-x-6 md:space-x-10">{timerComponents}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Promotion Ended!
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
