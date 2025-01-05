/**
 * Fisher-Yatesアルゴリズムを使用して配列をシャッフルする
 *
 * @param array シャッフルする配列
 * @returns シャッフル後の配列
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * 配列からランダムに1つの要素を取得する
 *
 * @param array 取得する配列
 * @returns 取得した要素
 */
export const getRandomFromArray = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * 配列からランダムにcount個の要素を取得する
 *
 * @param list 取得する配列
 * @param count 取得する要素の数
 * @returns 取得した要素
 */
export const getRandomCandidate = <T>(list: T[], count: number): T[] => {
  if (count < 0 || count > list.length) {
    throw new Error('Invalid count parameter');
  }

  const candidates = [...list];
  const randomItem = getRandomFromArray(list);

  if (randomItem === undefined) {
    return [];
  }

  candidates.splice(candidates.indexOf(randomItem), 1);
  return shuffleArray(candidates).slice(0, count);
};
