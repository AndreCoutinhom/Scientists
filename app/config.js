import { Platform } from 'react-native';

// Emulador Android enxerga o PC em 10.0.2.2; iOS Simulator usa localhost.
// Celular físico: troque pelo IP do seu PC na rede, ex.: 'http://192.168.0.15:8080'
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const API_URL = `http://${HOST}:8080`;
