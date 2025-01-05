import { useMemo, useState } from 'react';
import './App.css';
import { type Pinyin, Zhuyin, pinyinDictionary } from './Zhuyin';
import { CANDIDATE_COUNT } from './const';
import { getRandomCandidate, shuffleArray } from './utils/random';
import { blue } from './color';
import { ShowResultBar } from './components/ShowResultBar';
import { getZhuyinFromPinyin } from './utils/getZhuyinFromPinyin';

const getRandomZhuyinCandidate = () => {
  return getRandomCandidate([...Zhuyin], CANDIDATE_COUNT);
};

function App() {
  const [candidates, setCandidates] = useState(getRandomZhuyinCandidate());

  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  /**
   * 一つ目を答えにする
   */
  const answer = useMemo(() => candidates[0], [candidates]);

  const questions = useMemo(() => shuffleArray(candidates), [candidates]);

  const handleClickAnswer = (pinyin: Pinyin) => {
    const zhuyinAnswer = getZhuyinFromPinyin(pinyin);

    if (answer === zhuyinAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setCandidates(getRandomZhuyinCandidate());
    setIsCorrect(undefined);
  };

  return (
    <main>
      {isCorrect !== undefined && <ShowResultBar result={isCorrect} />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '0px',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              color: 'red',
            }}
          >
            🌟注音遊戯🌟
          </span>
        </h1>

        {/* ランダムで注音を表示 */}
        <div
          style={{
            fontSize: '100px',
            fontWeight: 'bold',
            textShadow: '0 0 10px #000',
            cursor: 'pointer',
          }}
        >
          {answer}
        </div>

        {/* 正解を含む選択肢を4つ表示 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {questions
            .map((item) => {
              const pinyin = pinyinDictionary[item];
              return pinyin;
            })
            .map((item) => {
              return (
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    padding: '10px 50px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    width: '10px',
                  }}
                  key={item}
                  onClick={() => handleClickAnswer(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleClickAnswer(item);
                    }
                  }}
                >
                  {item}
                </div>
              );
            })}
        </div>

        <div
          style={{
            marginTop: '20px',
          }}
        >
          <button
            type="button"
            onClick={handleNextQuestion}
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              backgroundColor: isCorrect === undefined ? '#ccc' : blue,
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
            }}
            disabled={isCorrect === undefined}
          >
            次の問題
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
