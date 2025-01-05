import { useMemo, useState } from 'react';
import './App.css';
import { Zhuyin, pinyinDictionary } from './Zhuyin';

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

const redColor = '#ff0000';
const blueColor = '#0000ff';

/**
 * 画面の一番上に表示するバー
 * @param param0
 * @returns
 */
const ShowResultBar: React.FC<{ result: boolean }> = ({ result }) => {
  // 正解の時は青色、不正解の時は赤色
  const color = result ? blueColor : redColor;

  return (
    <div
      style={{
        fontSize: '100px',
        fontWeight: 'bold',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '34px',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: '30px',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {result ? '正解' : '不正解'}
      </div>
    </div>
  );
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
    <main>
      {isCorrect !== undefined && <ShowResultBar result={isCorrect} />}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          {candidates
            .map((item) => {
              const pinyin = pinyinDictionary[item];
              return pinyin;
            })
            .map((item) => (
              <div
                style={{
                  fontSize: '100px',
                  fontWeight: 'bold',
                  border: '1px solid #ccc',
                  padding: '10px 50px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
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
            ))}
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
              backgroundColor: isCorrect === undefined ? '#ccc' : blueColor,
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
