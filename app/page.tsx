"use client";
import {
  acrossHints,
  downHints,
  initialAnswers,
  initialGrid,
  questionNumbers,
} from "@/lib/data";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [grid] = useState(initialGrid);
  const [answers] = useState(initialAnswers);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: 11 }, () => Array(10).fill(""))
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any, row: number, col: number) => {
    const value = e.target.value.toUpperCase();
    const newUserAnswers = [...userAnswers];
    newUserAnswers[row] = [...userAnswers[row]];
    newUserAnswers[row][col] = value;
    setUserAnswers(newUserAnswers);
  };

  const clearAnswers = () => {
    setUserAnswers(Array.from({ length: 11 }, () => Array(10).fill("")));
    toast.success("Answers cleared!");
  };

  const checkAnswers = () => {
    let correct = true;
    let score = 0;

    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 10; col++) {
        console.log(userAnswers[row][col], answers[row][col]);
        if (
          initialGrid[row][col] &&
          userAnswers[row][col] === answers[row][col]
        ) {
          score += 1;
        } else if (
          initialGrid[row][col] &&
          userAnswers[row][col] !== answers[row][col]
        ) {
          correct = false;
        }
      }
    }

    if (correct) {
      toast.success("Semua jawaban benar!");
      setIsModalOpen(true);
    } else {
      toast.error("Ada jawaban yang salah!");
    }
    setScore(score);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Teka-Teki Silang</h1>

      <div className="lg:flex flex-row">
        {/* Hints section */}
        <div className="mr-4 flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Pertanyaan Mendatar</h2>
            <ul className="text-left list-disc pl-5 text-sm lg:text-base">
              {acrossHints.map((hint, index) => (
                <li key={index} className="mb-1">
                  {hint}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Pertanyaan Menurun</h2>
            <ul className="text-left list-disc pl-5 text-sm lg:text-base">
              {downHints.map((hint, index) => (
                <li key={index} className="mb-1">
                  {hint}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={checkAnswers}
            className="btn btn-success mt-6 px-4 py-2 lg:px-8 lg:py-2 mb-2"
          >
            Cek Jawaban
          </button>
          <button onClick={clearAnswers} className="btn btn-warning mb-6">
            Bersihkan Jawaban
          </button>
        </div>

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

        <div className="ml-4 mt-6 lg:mt-0 flex justify-center items-center">
          <div className="card w-60 bg-neutral shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Skor : {score}</h2>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Selamat!</h2>
            <p className="py-4">Semua jawaban benar! Skor Anda: {score}</p>
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
