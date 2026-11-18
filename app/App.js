import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './src/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MenuScreen from './src/screens/MenuScreen';
import ScientistsScreen from './src/screens/ScientistsScreen';
import AddScientistScreen from './src/screens/AddScientistScreen';
import EditScientistScreen from './src/screens/EditScientistScreen';

const Stack = createNativeStackNavigator();

function Routes() {
  const { token, loading } = useAuth();

  // Enquanto lê o token salvo no AsyncStorage
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          // Telas para usuário logado (a primeira é o Menu)
          <>
            <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
            <Stack.Screen name="Scientists" component={ScientistsScreen} options={{ title: 'Cientistas salvos' }} />
            <Stack.Screen name="AddScientist" component={AddScientistScreen} options={{ title: 'Novo cientista' }} />
            <Stack.Screen name="EditScientist" component={EditScientistScreen} options={{ title: 'Editar cientista' }} />
          </>
        ) : (
          // Telas públicas (a primeira é o Login)
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Cadastro' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}