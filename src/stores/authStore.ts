import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {v4 as uuidv4} from 'uuid';

class AuthStore {
  email = '';
  password = '';
  isValidationCorrect = false;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  async loadAuthData() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        this.isAuthenticated = true;
      }
    } catch (error) {
      console.error('Failed to load auth data', error);
    }
  }

  async login(email: string, password: string) {
    this.email = email;
    this.password = password;

    if (this.isValidationCorrect) {
      this.isAuthenticated = true;
    }
    await AsyncStorage.setItem('authToken', `${uuidv4}`);
  }

  async logout() {
    this.email = '';
    this.password = '';
    this.isAuthenticated = false;
    this.isValidationCorrect = false;
    await AsyncStorage.removeItem('authToken');
  }
}

const authStore = new AuthStore();
export default authStore;
