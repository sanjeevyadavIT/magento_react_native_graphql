import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getData = async (
  key: string,
  defaultValue: string | null = null,
) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      return value;
    }
    return defaultValue;
  } catch (e) {
    // error reading value
    console.log(e);
    return defaultValue;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log(e);
  }
};
