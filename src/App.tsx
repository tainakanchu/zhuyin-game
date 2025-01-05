import { useMemo, useState } from 'react';
import './App.css';
import { type Pinyin, Zhuyin, pinyinDictionary } from './Zhuyin';
import { CANDIDATE_COUNT } from './const';
import { getRandomCandidate, shuffleArray } from './utils/random';
import { blue, red } from './color';
import { ShowResultBar } from './components/ShowResultBar';
import { getZhuyinFromPinyin } from './utils/getZhuyinFromPinyin';

const getRandomZhuyinCandidate = () => {
  return getRandomCandidate([...Zhuyin], CANDIDATE_COUNT);
};

function App() {
  const [candidates, setCandidates] = useState(getRandomZhuyinCandidate());

  /**
   * 一つ目を答えにする
   */
  const answer = useMemo(() => candidates[0], [candidates]);

  const questions = useMemo(() => shuffleArray(candidates), [candidates]);

  const [selectedAnswers, setSelectedAnswers] = useState<Pinyin[]>([]);

  const isCorrectSelected = useMemo(() => {
    if (selectedAnswers.length === 0) return undefined;
    const pinyinAnswer = pinyinDictionary[answer];
    return selectedAnswers.includes(pinyinAnswer);
  }, [selectedAnswers, answer]);

  const handleClickAnswer = (pinyin: Pinyin) => {
    setSelectedAnswers([...selectedAnswers, pinyin]);
  };

  const handleNextQuestion = () => {
    setCandidates(getRandomZhuyinCandidate());
    setSelectedAnswers([]);
  };

  return (
    <main>
      {isCorrectSelected !== undefined && (
        <ShowResultBar result={isCorrectSelected} />
      )}

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
              return {
                pinyin,
                isSelected: selectedAnswers.includes(pinyin),
              };
            })
            .map((item) => {
              const zhuyin = getZhuyinFromPinyin(item.pinyin);
              const backgroundColor = item.isSelected
                ? zhuyin === answer
                  ? blue
                  : red
                : 'transparent';

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
                    backgroundColor,
                  }}
                  key={item.pinyin}
                  onClick={() => handleClickAnswer(item.pinyin)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleClickAnswer(item.pinyin);
                    }
                  }}
                >
                  {item.pinyin}
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
              backgroundColor: isCorrectSelected ? blue : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
            }}
            disabled={!isCorrectSelected}
          >
            次の問題
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
