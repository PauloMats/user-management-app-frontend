import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { User } from '../types/user';
import { useNavigate } from 'react-router-dom';

const UserProfilePage: React.FC = () => {
  const { user, updateUserContext, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // from react-router-dom

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (!user) {
    return <div className="text-center p-8">Carregando perfil...</div>;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    // Validação básica
    if (newPassword && newPassword !== confirmNewPassword) {
      setMessage({ type: 'error', text: 'As novas senhas não coincidem.' });
      setIsLoading(false);
      return;
    }
    if (newPassword && newPassword.length < 8) {
        setMessage({ type: 'error', text: 'A nova senha deve ter no mínimo 8 caracteres.' });
        setIsLoading(false);
        return;
    }
    if (newPassword && !currentPassword) {
        setMessage({ type: 'error', text: 'Por favor, insira sua senha atual para alterar a senha.' });
        setIsLoading(false);
        return;
    }


    try {
      const payload: any = { name };
      if (newPassword && currentPassword) {
        payload.password = newPassword; // O backend deve validar a currentPassword
        payload.currentPassword = currentPassword; // Enviar senha atual para validação no backend
      }

      const response = await api.patch(`/users/profile`, payload); // Endpoint para atualizar perfil
      updateUserContext(response.data as Partial<User>); // Atualiza o contexto com os novos dados
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      setNewPassword('');
      setCurrentPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Falha ao atualizar o perfil.' });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meu Perfil</h2>
      
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Informações da Conta</h3>
        <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
        <p className="text-gray-600"><span className="font-medium">Papel:</span> {user.role}</p>
        <p className="text-gray-600"><span className="font-medium">Membro desde:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
        <p className="text-gray-600"><span className="font-medium">Último login:</span> {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'N/A'}</p>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div>
          <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-700 pt-4 border-t border-gray-200">Alterar Senha (Opcional)</h3>
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
            Senha Atual
          </label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Deixe em branco para não alterar"
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
            Nova Senha
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mínimo 8 caracteres"
          />
        </div>
        <div>
          <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700">
            Confirmar Nova Senha
          </label>
          <input
            id="confirm-new-password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {message && (
          <p className={`text-sm p-3 rounded-md ${message.type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
            {message.text}
          </p>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
};

export default UserProfilePage;