import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { api } from '../api';
import { useAuth } from '../AuthContext';
import { Btn, Field, colors, common } from '../components';

export default function EditScientistScreen({ route, navigation }) {
  const { token } = useAuth();
  const { scientist } = route.params;
  const [nome, setNome] = useState(scientist.nome);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // O backend exige nome e lattes no PUT; o lattes segue inalterado
      await api.updateScientist(token, scientist.id, nome.trim(), scientist.lattes);
      navigation.goBack(); // a lista recarrega ao ganhar foco
    } catch (e) {
      Alert.alert('Erro', e.message);
      setLoading(false);
    }
  };

  return (
    <View style={common.screen}>
      <Text style={{ color: colors.muted, marginBottom: 6 }}>Nome</Text>
      <Field autoCapitalize="words" value={nome} onChangeText={setNome} />
      <Text style={{ color: colors.muted, marginBottom: 16 }}>Lattes: {scientist.lattes}</Text>
      <Btn title="Salvar alterações" onPress={handleSave} loading={loading} />
    </View>
  );
}
