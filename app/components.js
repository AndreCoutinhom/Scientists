import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput } from 'react-native';

export const colors = { primary: '#1e6fd9', danger: '#d64545', bg: '#f4f6fa', text: '#1c2430', muted: '#6b7685' };

export function Field(props) {
  return <TextInput placeholderTextColor={colors.muted} autoCapitalize="none" style={styles.input} {...props} />;
}

export function Btn({ title, onPress, loading, color = colors.primary, small }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[styles.btn, small && styles.btnSmall, { backgroundColor: color }, loading && { opacity: 0.6 }]}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{title}</Text>}
    </Pressable>
  );
}

export const common = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  center: { flex: 1, backgroundColor: colors.bg, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 20, textAlign: 'center' },
  link: { color: colors.primary, textAlign: 'center', marginTop: 16, fontSize: 15 },
});

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#d5dbe4',
    padding: 12, fontSize: 16, marginBottom: 12, color: colors.text,
  },
  btn: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  btnSmall: { paddingVertical: 8, paddingHorizontal: 14, marginTop: 0 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
