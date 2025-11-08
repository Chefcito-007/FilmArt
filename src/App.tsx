import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MovieCatalog } from './components/MovieCatalog';
import { LiveDebate } from './components/LiveDebate';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { Community } from './components/Community';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'debate' | 'profile' | 'community'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // Estado para manejar el usuario
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular que el usuario "admin" ya está autenticado
    const fakeUser = { email: 'admin@gmail.com', name: 'Admin' }; // Usuario fijo
    setUser(fakeUser); // Establecer el usuario fijo
    setIsLoading(false); // Terminar el loading
  }, []);

  const handleSignOut = async () => {
    setUser(null); // Reseteamos el estado del usuario al hacer logout
    setCurrentView('home'); // Redirigimos a la página de inicio
  };

  const renderContent = () => {
    switch (currentView) {
      case 'catalog':
        return <MovieCatalog user={user} />;
      case 'debate':
        return <LiveDebate user={user} />;
      case 'profile':
        return user ? <UserProfile user={user} /> : null;
      case 'community':
        return <Community user={user} />;
      default:
        return (
          <>
            <HeroSection onGetStarted={() => user ? setCurrentView('catalog') : setIsAuthModalOpen(true)} />
            <div className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-center text-gray-600 mb-12">
                  Una vista previa de nuestro catálogo
                </h2>
                <MovieCatalog user={user} preview={true} />
              </div>
            </div>
          </>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Pass the user, handleAuthClick, and handleSignOut to the Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user} // Aquí pasamos el estado user para mostrar el nombre o botones de login
        onAuthClick={() => setIsAuthModalOpen(true)} // Abre el modal de login
        onSignOut={handleSignOut} // Función para cerrar sesión
      />
      
      <main>
        {renderContent()}
      </main>

      <Footer />

      {/* Modal de autenticación */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)} // Cerrar el modal
      />
    </div>
  );
}
