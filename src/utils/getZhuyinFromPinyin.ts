import { type Pinyin, pinyinDictionary } from '../Zhuyin';

export const getZhuyinFromPinyin = (pinyin: Pinyin) => {
  return Object.entries(pinyinDictionary).find(
    (value) => value[1] === pinyin
  )?.[0];
};
