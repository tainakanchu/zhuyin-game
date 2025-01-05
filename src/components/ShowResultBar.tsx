import { blue, red } from '../color';

/**
 * 画面の一番上に表示するバー
 * @param param0
 * @returns
 */
export const ShowResultBar: React.FC<{ result: boolean }> = ({ result }) => {
  // 正解の時は青色、不正解の時は赤色
  const color = result ? blue : red;

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
