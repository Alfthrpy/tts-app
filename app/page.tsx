"use client";
import HintSectionAcross from "@/components/hintSectionAcross";
import {
  initialAnswers,
  initialGrid,
  questionNumbers,
} from "@/lib/data";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [grid] = useState(initialGrid);
  const [answers] = useState(initialAnswers);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isStarted, setIsStarted] = useState(false);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: 11 }, () => Array(10).fill(""))
  );

  // Handle input changes in the grid
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = e.target.value.toUpperCase();
    const newUserAnswers = [...userAnswers];
    newUserAnswers[row] = [...userAnswers[row]];
    newUserAnswers[row][col] = value;
    setUserAnswers(newUserAnswers);
  };

  // Clear user answers
  const clearAnswers = () => {
    setUserAnswers(Array.from({ length: 11 }, () => Array(10).fill("")));
    toast.success("Answers cleared!");
  };

  // Check user answers and calculate score
  const checkAnswers = () => {
    let correct = true;


    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 10; col++) {
        if (
          initialGrid[row][col] &&
          userAnswers[row][col] === answers[row][col]
        ) {
        } else if (
          initialGrid[row][col] &&
          userAnswers[row][col] !== answers[row][col]
        ) {
          correct = false;
        }
      }
    }

    if (correct) {
      setScore(timeLeft); // Skor berdasarkan waktu yang tersisa
      toast.success("Semua jawaban benar!");
      setIsModalOpen(true);
      setIsStarted(false)
      setTimeLeft(600)
      
    } else {
      toast.error("Ada jawaban yang salah!");
    }
  };

  // Handle countdown
  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); 
    } else if (timeLeft === 0) {
      setScore(0); 
      setIsModalOpen(true); 
    }
  }, [isStarted, timeLeft]);

  
  const startCountdown = () => {
    setIsStarted(true); 
  };

  

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Teka-Teki Silang</h1>

      <div className="lg:flex flex-row">
        {/* Hints section */}
        <HintSectionAcross checkAnswers={checkAnswers} clearAnswers={clearAnswers} />

        {/* Grid layout */}
        <div className="grid grid-cols-10 gap-1 bg-neutral p-4 rounded-lg shadow-lg">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative flex items-center justify-center"
              >
                {questionNumbers[rowIndex][colIndex] > 0 && (
                  <span className="absolute top-0 left-0 text-[10px] sm:text-[20px] md:text-[20px] lg:text-[15px] text-primary font-bold">
                    {questionNumbers[rowIndex][colIndex]}
                  </span>
                )}
                <input
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-center text-sm sm:text-base md:text-lg lg:text-xl input input-bordered text-neutral font-bold ${
                    cell === 0 ? "bg-neutral" : "bg-white hover:bg-secondary"
                  } p-2`}
                  maxLength={1}
                  disabled={cell === 0}
                  value={userAnswers[rowIndex][colIndex]}
                  onChange={(e) => handleChange(e, rowIndex, colIndex)}
                />
              </div>
            ))
          )}
        </div>

        <div className="ml-4 mt-6 lg:mt-0 flex justify-center items-center flex-col">
          <div className="card w-60 bg-neutral shadow-xl mb-3 p-4">
            <h3 className="mb-2 card-title">Waktu Tersisa</h3>
            {isStarted ? (
              <span className="countdown font-mono text-2xl">
                <span style={{ "--value": minutes } as React.CSSProperties}></span>
                m
                <span style={{ "--value": seconds < 10 ? `0${seconds}` : seconds } as React.CSSProperties}></span>
                s
              </span>
            ) : (
              <button className="btn btn-primary" onClick={startCountdown}>
                Mulai
              </button>
            )}
          </div>
          <div className="card w-60 bg-neutral shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Informasi Project</h2>
              <p>
                <strong>Nama:</strong> Muhammad Rizki Al-Fathir
              </p>
              <p>
                <strong>NIM:</strong> 1227050093
              </p>
              <div className="card-actions justify-end">
                <a
                  href="https://github.com/alfthrpy/tts-app"
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat Repo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Skor</h2>
            <p className="py-4">Skor Anda: {score}</p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => setIsModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
