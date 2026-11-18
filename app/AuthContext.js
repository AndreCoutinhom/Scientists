import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setUnauthorizedHandler } from './api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Estado global da aplicação: token JWT + usuário logado
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao abrir o app, recupera a sessão salva
  useEffect(() => {
    (async () => {
      try {
        const [[, t], [, u]] = await AsyncStorage.multiGet(['token', 'user']);
        if (t && u) { setToken(t); setUser(JSON.parse(u)); }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const clearSession = useCallback(async () => {
    await AsyncStorage.multiRemove(['token', 'user']);
    setToken(null);
    setUser(null);
  }, []);

  // Token expirado/revogado -> volta para o Login
  useEffect(() => { setUnauthorizedHandler(clearSession); }, [clearSession]);

  const signIn = async (email, password) => {
    const data = await api.login(email, password); // { token, user }
    await AsyncStorage.multiSet([
      ['token', data.token],
      ['user', JSON.stringify(data.user)],
    ]);
    setToken(data.token);
    setUser(data.user);
  };

  const signOut = async () => {
    try { if (token) await api.logout(token); } catch {}
    await clearSession();
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
