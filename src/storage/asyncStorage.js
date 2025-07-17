import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';
const PROFILE_ID_KEY = 'profileId';

//* Save token to AsyncStorage
export const saveToken = async (token, profileId) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(PROFILE_ID_KEY, profileId.toString());
    console.log('Token saved in storage');
  } catch (error) {
    console.error('Error saving token in storage', error);
  }
};

//* Retrieve the token saved from the storage
export const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const profileId = await AsyncStorage.getItem(PROFILE_ID_KEY);
    return { token, profileId };
  } catch (error) {
    console.error("Can't retrieve the token back from the storage", error);
  }
};

//* Remove the token from the storage when LogOut
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(PROFILE_ID_KEY);
    console.log('The token is removed from the storage');
  } catch (error) {
    console.error('The token is not removed', error);
  }
};
