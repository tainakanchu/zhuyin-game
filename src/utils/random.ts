export const shuffleArray = <T>(array: T[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getRandomFromArray = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomCandidate = <T>(list: T[], count: number) => {
  const candidates = [...list];

  candidates.splice(candidates.indexOf(getRandomFromArray(list)), 1);
  return candidates.sort(() => Math.random() - 0.5).slice(0, count);
};
