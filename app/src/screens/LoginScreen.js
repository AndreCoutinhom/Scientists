import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useAuth } from '../AuthContext';
import { Btn, Field, common } from '../../components';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signIn(email.trim(), password); // salva o token no AsyncStorage e troca para o Menu
    } catch (e) {
      Alert.alert('Erro no login', e.message);
      setLoading(false);
    }
  };

  return (
    <View style={common.center}>
      <Text style={common.title}>Cientists</Text>
      <Field placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Field placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Btn title="Entrar" onPress={handleLogin} loading={loading} />
      <Text style={common.link} onPress={() => navigation.navigate('Signup')}>
        Não tem conta? Cadastre-se
      </Text>
    </View>
  );
}
