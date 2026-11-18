import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../AuthContext';
import { Btn, Field, colors, common } from '../../components';
import { openLink } from '../../utils';

export default function MenuScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const storageKey = `meuLattes:${user.id}`; // um link por usuário
  const [link, setLink] = useState('');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(storageKey).then((v) => { if (v) setLink(v); });
  }, [storageKey]);

  const saveLink = async () => {
    const value = draft.trim();
    if (value) await AsyncStorage.setItem(storageKey, value);
    else await AsyncStorage.removeItem(storageKey);
    setLink(value);
    setEditing(false);
  };

  const startEditing = () => { setDraft(link); setEditing(true); };

  return (
    <View style={common.screen}>
      <Text style={styles.hello}>Olá, {user.name}!</Text>

      {/* Cartão central: "Seu Lattes" */}
      <View style={styles.middle}>
        <Pressable style={styles.card} onPress={() => (link ? openLink(link) : startEditing())}>
          <Text style={styles.cardTitle}>Seu Lattes</Text>
          <Text style={styles.cardSub} numberOfLines={1}>
            {link || 'Toque para adicionar o seu link'}
          </Text>
        </Pressable>

        {editing ? (
          <View style={{ width: '100%', marginTop: 12 }}>
            <Field placeholder="http://lattes.cnpq.br/..." keyboardType="url" value={draft} onChangeText={setDraft} />
            <Btn title="Salvar link" onPress={saveLink} />
          </View>
        ) : (
          <Text style={common.link} onPress={startEditing}>Editar link</Text>
        )}
      </View>

      <Btn title="Cientistas salvos" onPress={() => navigation.navigate('Scientists')} />
      <View style={{ height: 8 }} />
      <Btn title="Adicionar cientista" onPress={() => navigation.navigate('AddScientist')} />
      <View style={{ height: 8 }} />
      <Btn title="Sair" color={colors.danger} onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  hello: { fontSize: 18, color: colors.muted, textAlign: 'center' },
  middle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 28, alignItems: 'center',
    borderWidth: 2, borderColor: colors.primary, elevation: 3,
  },
  cardTitle: { fontSize: 26, fontWeight: '700', color: colors.primary },
  cardSub: { marginTop: 8, color: colors.muted, fontSize: 14 },
});
