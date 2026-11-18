import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { api } from '../../api';
import { useAuth } from '../AuthContext';
import { Btn, Field, common } from '../../components';

export default function AddScientistScreen({ navigation }) {
  const { token } = useAuth();
  const [nome, setNome] = useState('');
  const [lattes, setLattes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.createScientist(token, nome.trim(), lattes.trim());
      navigation.replace('Scientists');
    } catch (e) {
      Alert.alert('Erro', e.message);
      setLoading(false);
    }
  };

  return (
    <View style={common.screen}>
      <Field placeholder="Nome do cientista" autoCapitalize="words" value={nome} onChangeText={setNome} />
      <Field placeholder="Link do Lattes" keyboardType="url" value={lattes} onChangeText={setLattes} />
      <Btn title="Salvar" onPress={handleSave} loading={loading} />
    </View>
  );
}
