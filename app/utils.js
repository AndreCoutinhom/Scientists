import { Alert, Linking } from 'react-native';

// Garante o protocolo e abre o link no navegador
export async function openLink(url) {
  const full = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  try {
    await Linking.openURL(full);
  } catch {
    Alert.alert('Erro', 'Não foi possível abrir o link.');
  }
}
