import React from 'react';
import AppRoutes from './router';
import Navbar from './components/common/Navbar'; // Exemplo de Navbar

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AppRoutes />
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        © {new Date().getFullYear()} Conectar. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default App;