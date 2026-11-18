import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Com o Expo Go, o Metro informa o IP do PC (ex.: "192.168.0.15:8081").
// Reaproveitamos esse IP para chegar ao Spring Boot na porta 8080,
// então funciona no celular físico sem digitar nada.
const devHost = Constants.expoConfig?.hostUri?.split(':')[0];

// Fallback (emulador): Android usa 10.0.2.2; iOS Simulator usa localhost
const HOST = devHost || (Platform.OS === 'android' ? '10.0.2.2' : 'localhost');

export const API_URL = `http://${HOST}:8080`;