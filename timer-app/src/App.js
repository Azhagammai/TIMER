"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";

function App() {
  const [countdownTime, setCountdownTime] = useState(300);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const countdownIntervalRef = useRef(null);
  const stopwatchIntervalRef = useRef(null);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const startCountdown = useCallback(() => {
    if (countdownTime <= 0) return;
    clearInterval(countdownIntervalRef.current);
    setIsCountdownRunning(true);

    countdownIntervalRef.current = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          setIsCountdownRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [countdownTime]);

  const pauseCountdown = () => {
    clearInterval(countdownIntervalRef.current);
    setIsCountdownRunning(false);
  };

  const resetCountdown = () => {
    clearInterval(countdownIntervalRef.current);
    setIsCountdownRunning(false);
    setCountdownTime(300);
  };

  const startStopwatch = () => {
    clearInterval(stopwatchIntervalRef.current);
    setIsStopwatchRunning(true);

    stopwatchIntervalRef.current = setInterval(() => {
      setStopwatchTime((prev) => prev + 1);
    }, 1000);
  };

  const pauseStopwatch = () => {
    clearInterval(stopwatchIntervalRef.current);
    setIsStopwatchRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(stopwatchIntervalRef.current);
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
  };

  useEffect(() => {
    return () => {
      clearInterval(countdownIntervalRef.current);
      clearInterval(stopwatchIntervalRef.current);
    };
  }, []);

  return (
    <div className="container py-5">
      <Helmet>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq"
          crossOrigin="anonymous"
        ></script>
      </Helmet>

      <h1 className="text-center mb-5">⏱ Timer App</h1>

      {/* Countdown Timer */}
      <div className="card mb-5 shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Countdown Timer</h2>
          <div className="display-1 text-center mb-4">{formatTime(countdownTime)}</div>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <button
              onClick={isCountdownRunning ? pauseCountdown : startCountdown}
              className={`btn ${isCountdownRunning ? "btn-danger" : "btn-success"}`}
            >
              {isCountdownRunning ? "Pause" : "Start"}
            </button>
            <button className="btn btn-secondary" onClick={resetCountdown}>
              Reset
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <label className="me-2">Set Time (minutes):</label>
            <input
              type="number"
              className="form-control w-auto"
              min="0"
              disabled={isCountdownRunning}
              value={Math.floor(countdownTime / 60)}
              onChange={(e) =>
                setCountdownTime(Math.max(0, parseInt(e.target.value || 0) * 60))
              }
            />
          </div>
        </div>
      </div>

      {/* Stopwatch */}
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Stopwatch</h2>
          <div className="display-1 text-center mb-4">{formatTime(stopwatchTime)}</div>
          <div className="d-flex justify-content-center gap-3">
            <button
              onClick={isStopwatchRunning ? pauseStopwatch : startStopwatch}
              className={`btn ${isStopwatchRunning ? "btn-danger" : "btn-success"}`}
            >
              {isStopwatchRunning ? "Pause" : "Start"}
            </button>
            <button className="btn btn-secondary" onClick={resetStopwatch}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
