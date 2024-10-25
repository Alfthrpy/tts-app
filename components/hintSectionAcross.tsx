import { acrossHints, downHints } from "@/lib/data";

type HintSectionAcrossProps = {
  checkAnswers: () => void;
  clearAnswers: () => void;
};

export default function HintSectionAcross({
  checkAnswers,
  clearAnswers,
}: HintSectionAcrossProps) {
  return (
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
  );
}
