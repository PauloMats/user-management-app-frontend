import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { User, UserRole } from '../types/user';
import { Link } from 'react-router-dom'; // Para botão de editar (opcional)

const AdminUserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Para busca (opcional)
  const [filterRole, setFilterRole] = useState<UserRole | ''>('');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | ''>('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params: any = {};
      if (filterRole) params.role = filterRole;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.order = sortOrder;
      // Adicionar searchTerm aos params se for implementar busca no backend

      const response = await api.get('/users', { params });
      setUsers(response.data as User[]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha ao carregar usuários.');
    } finally {
      setIsLoading(false);
    }
  }, [filterRole, sortBy, sortOrder]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      try {
        await api.delete(`/users/${userId}`);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        // Adicionar mensagem de sucesso
      } catch (err: any) {
        setError(err.response?.data?.message || 'Falha ao excluir usuário.');
         // Adicionar mensagem de erro
      }
    }
  };

  // Filtragem local (se não for feita no backend)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (isLoading) return <div className="text-center p-8">Carregando usuários...</div>;
  if (error) return <div className="text-center p-8 text-red-600 bg-red-100 rounded-md">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Gerenciamento de Usuários</h2>

      {/* Filtros e Ordenação */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar (Nome/Email)</label>
          <input
            type="text"
            id="search"
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="filterRole" className="block text-sm font-medium text-gray-700">Filtrar por Papel</label>
          <select
            id="filterRole"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | '')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value={UserRole.ADMIN}>Admin</option>
            <option value={UserRole.USER}>User</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">Ordenar por</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'createdAt' | '')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="createdAt">Data de Criação</option>
            <option value="name">Nome</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Ordem</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'ASC' | 'DESC')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="ASC">Ascendente</option>
            <option value="DESC">Descendente</option>
          </select>
        </div>
      </div>
      
      {/* Tabela de Usuários */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Papel</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? filteredUsers.map((u) => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                const isInactive = u.lastLoginAt ? new Date(u.lastLoginAt) < thirtyDaysAgo : (u.createdAt ? new Date(u.createdAt) < thirtyDaysAgo : false);

                return (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === UserRole.ADMIN ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isInactive ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                        {isInactive ? 'Inativo' : 'Ativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {/* <Link to={`/admin/users/edit/${u.id}`} className="text-blue-600 hover:text-blue-900">Editar</Link> */}
                      <button onClick={() => handleDeleteUser(u.id)} className="text-red-600 hover:text-red-900 font-semibold">Excluir</button>
                    </td>
                  </tr>
                )
            }) : (
                <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                        Nenhum usuário encontrado com os filtros atuais.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* TODO: Paginação pode ser adicionada aqui */}
    </div>
  );
};

export default AdminUserListPage;
