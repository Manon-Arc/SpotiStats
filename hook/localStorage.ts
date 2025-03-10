import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(value: string, key: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

export async function getData(key: string) {
  try {
    return AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
}
