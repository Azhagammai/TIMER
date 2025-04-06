"use client"

import { useState, useEffect, useRef } from "react"

const Timer = () => {
  // Countdown Timer State
  const [countdownTime, setCountdownTime] = useState(300)
  const [isCountdownRunning, setIsCountdownRunning] = useState(false)

  // Stopwatch Timer State
  const [stopwatchTime, setStopwatchTime] = useState(0)
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false)

  const countdownIntervalRef = useRef(null) // Using useRef to store interval IDs [^1][^3]
  const stopwatchIntervalRef = useRef(null)

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Countdown functions
  const startCountdown = () => {
    if (countdownTime <= 0) return

    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)

    setIsCountdownRunning(true)
    countdownIntervalRef.current = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current)
          setIsCountdownRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const pauseCountdown = () => {
    clearInterval(countdownIntervalRef.current)
    setIsCountdownRunning(false)
  }

  const resetCountdown = () => {
    clearInterval(countdownIntervalRef.current)
    setIsCountdownRunning(false)
    setCountdownTime(300)
  }

  // Stopwatch functions
  const startStopwatch = () => {
    if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current)

    setIsStopwatchRunning(true)
    stopwatchIntervalRef.current = setInterval(() => {
      setStopwatchTime((prev) => prev + 1)
    }, 1000)
  }

  const pauseStopwatch = () => {
    clearInterval(stopwatchIntervalRef.current)
    setIsStopwatchRunning(false)
  }

  const resetStopwatch = () => {
    clearInterval(stopwatchIntervalRef.current)
    setIsStopwatchRunning(false)
    setStopwatchTime(0)
  }

  // Cleanup intervals when component unmounts [^1]
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current)
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current)
    }
  }, [])

  return (
    <div className="font-sans max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Timer App</h1>

      <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Countdown Timer</h2>
        <div className="text-6xl font-bold text-center my-6 font-mono tabular-nums">{formatTime(countdownTime)}</div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={isCountdownRunning ? pauseCountdown : startCountdown}
            className={`px-6 py-3 rounded-md text-white font-medium transition-colors ${
              isCountdownRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isCountdownRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetCountdown}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
          <label className="font-medium">Set Time (minutes): </label>
          <input
            type="number"
            value={Math.floor(countdownTime / 60)}
            onChange={(e) => setCountdownTime(Math.max(0, Number.parseInt(e.target.value) * 60 || 0))}
            min="0"
            className="p-2 w-20 border border-gray-300 rounded-md"
            disabled={isCountdownRunning}
          />
        </div>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Stopwatch</h2>
        <div className="text-6xl font-bold text-center my-6 font-mono tabular-nums">{formatTime(stopwatchTime)}</div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={isStopwatchRunning ? pauseStopwatch : startStopwatch}
            className={`px-6 py-3 rounded-md text-white font-medium transition-colors ${
              isStopwatchRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isStopwatchRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetStopwatch}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default Timer

