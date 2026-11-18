import { API_URL } from './config';

// Chamado quando o servidor responde 401 a uma requisição autenticada (token expirado/revogado)
let onUnauthorized = () => {};
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn; };

const DEFAULT_MESSAGES = {
  400: 'Preencha todos os campos.',
  401: 'Credenciais inválidas ou sessão expirada.',
  403: 'Operação não permitida (senha atual incorreta?).',
  404: 'Registro não encontrado.',
  409: 'E-mail já cadastrado.',
};

async function request(path, { method = 'GET', body, token } = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor.');
  }

  if (res.status === 204) return null;

  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    if (res.status === 401 && token) onUnauthorized();
    throw new Error(data?.message || DEFAULT_MESSAGES[res.status] || 'Erro inesperado.');
  }
  return data;
}

export const api = {
  // Usuário
  signup: (name, email, password) => request('/user/signup', { method: 'POST', body: { name, email, password } }),
  login: (email, password) => request('/user/login', { method: 'POST', body: { email, password } }),
  logout: (token) => request('/user/logout', { method: 'POST', token }),

  // Cientistas (CRUD)
  listScientists: (token) => request('/scientist', { token }),
  createScientist: (token, nome, lattes) => request('/scientist', { method: 'POST', token, body: { nome, lattes } }),
  updateScientist: (token, id, nome, lattes) => request(`/scientist/${id}`, { method: 'PUT', token, body: { nome, lattes } }),
  deleteScientist: (token, id) => request(`/scientist/${id}`, { method: 'DELETE', token }),
};
