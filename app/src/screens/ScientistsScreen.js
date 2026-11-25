import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../api';
import { useAuth } from '../AuthContext';
import { Btn, colors, common } from '../../components';
import { openLink } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ScientistsScreen({ navigation }) {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recarrega a lista sempre que a tela ganha foco (ex.: ao voltar da edição)
  useFocusEffect(
    useCallback(() => {
      let active = true;
      api.listScientists(token)
        .then((data) => active && setItems(data))
        .catch((e) => Alert.alert('Erro', e.message))
        .finally(() => active && setLoading(false));
      return () => { active = false; };
    }, [token])
  );

  const confirmDelete = (s) => {
    Alert.alert('Excluir', `Excluir "${s.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          try {
            await api.deleteScientist(token, s.id);
            setItems((prev) => prev.filter((i) => i.id !== s.id));
          } catch (e) {
            Alert.alert('Erro', e.message);
          }
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
<SafeAreaView style={common.screen}>
    <FlatList
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 16 }}
      data={items}
      keyExtractor={(s) => String(s.id)}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum cientista salvo ainda.</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* O nome é a âncora para o link do Lattes */}
          <Text style={styles.name} onPress={() => openLink(item.lattes)}>{item.nome}</Text>
          <View style={styles.row}>
            <Btn small title="Atualizar" onPress={() => navigation.navigate('EditScientist', { scientist: item })} />
            <View style={{ width: 8 }} />
            <Btn small title="Deletar" color={colors.danger} onPress={() => confirmDelete(item)} />
          </View>
        </View>
      )}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12 },
  name: { fontSize: 18, color: colors.primary, textDecorationLine: 'underline', marginBottom: 10 },
  row: { flexDirection: 'row' },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40 },
});
