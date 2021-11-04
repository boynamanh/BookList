import AsyncStorage from '@react-native-community/async-storage';
const VERSES_KEY = 'VERSES_KEY';

const save = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const get = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

const cacheVerseInteraction = async (versesIDs: string[]) => {
  await save(VERSES_KEY, JSON.stringify(versesIDs));
};

const getCacheVerseInteraction = async () => {
  const value = await get(VERSES_KEY);
  return value ? (JSON.parse(value) as string[]) : [];
};

export default {cacheVerseInteraction, getCacheVerseInteraction};
