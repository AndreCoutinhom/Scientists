import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { api } from '../api';
import { Btn, Field, common } from '../components';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      await api.signup(name.trim(), email.trim(), password);
      Alert.alert('Pronto!', 'Cadastro realizado. Faça login para continuar.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro no cadastro', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={common.center}>
      <Field placeholder="Nome" autoCapitalize="words" value={name} onChangeText={setName} />
      <Field placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Field placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Btn title="Cadastrar" onPress={handleSignup} loading={loading} />
    </View>
  );
}
