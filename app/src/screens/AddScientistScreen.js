import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { openLink } from '../../utils';
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
      <Text style={styles.title}>
        Busque cientistas brasileiros na{' '}
        <Text
          style={styles.link}
          onPress={() => openLink('https://busca-cv-lattes.cnpq.br/busca')}
        >
          Plataforma Lattes
        </Text>
      </Text>
      <Field placeholder="Nome do cientista" autoCapitalize="words" value={nome} onChangeText={setNome} />
      <Field placeholder="Link do Lattes" keyboardType="url" value={lattes} onChangeText={setLattes} />
      <Btn title="Salvar" onPress={handleSave} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    lineHeight: 24,
  },
  link: {
    color: '#1a73e8',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});