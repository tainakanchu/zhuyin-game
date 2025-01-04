import { useMemo, useState } from "react";
import "./App.css";
import { Zhuyin, pinyinDictionary } from "./Zhuyin";

const CANDIDATE_COUNT = 6;

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const getRandomFromArray = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

/** ランダムで注音を4つ取得 */
const getRandomCandidate = () => {
  const candidates = [...Zhuyin];

  candidates.splice(candidates.indexOf(getRandomFromArray(Zhuyin)), 1);
  return candidates.sort(() => Math.random() - 0.5).slice(0, CANDIDATE_COUNT);
};

function App() {
  const [question, setQuestion] = useState(getRandomCandidate());

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  /**
   * 一つ目を答えにする
   */
  const answer = useMemo(() => question[0], [question]);

  const candidates = useMemo(() => shuffleArray(question), [question]);

  const handleClickAnswer = (pinyin: string) => {
    const pinyinAnswer = pinyinDictionary[answer];

    if (pinyin === pinyinAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setQuestion(getRandomCandidate());
    setIsCorrect(undefined);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "0px",
          }}
        >
          {/* 星とかいれる */}
          <span
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            🌟注音遊戯🌟
          </span>
        </h1>

        {/* ランダムで注音を表示 */}
        <div
          style={{
            fontSize: "100px",
            fontWeight: "bold",

            // 目立たせる
            textShadow: "0 0 10px #000",
          }}
        >
          {answer}
        </div>

        {/* 正解を含む選択肢を4つ表示 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {candidates
            .map((item) => {
              const pinyin = pinyinDictionary[item];
              return pinyin;
            })
            .map((item) => (
              <div
                style={{
                  fontSize: "100px",
                  fontWeight: "bold",
                  border: "1px solid #ccc",
                  padding: "10px 50px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                key={item}
                onClick={() => handleClickAnswer(item)}
              >
                {item}
              </div>
            ))}
        </div>
        {/* 合否の表示 */}
        <div
          style={{
            fontSize: "100px",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          {isCorrect === true && <div>正解</div>}
          {isCorrect === false && <div>不正解</div>}
        </div>
        <div>
          {isCorrect !== undefined && (
            <button onClick={handleNextQuestion}>次の問題</button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
