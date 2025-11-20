import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MovieCatalog } from './components/MovieCatalog';
import { LiveDebate } from './components/LiveDebate';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { Community } from './components/Community';
import { Footer } from './components/Footer';
import { auth } from './firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { DonationsSection } from './components/DonationsSection';
import { DonationFloatingButton } from './components/DonationFloatingButton'; // 👈 NUEVO

export default function App() {
  const [currentView, setCurrentView] = useState<
    'home' | 'catalog' | 'debate' | 'profile' | 'community' | 'donations'
  >('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Escuchar cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subir al inicio cuando cambie de vista
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentView('home');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
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
      case 'donations':
        return <DonationsSection />;
      default:
        return (
          <>
            <HeroSection
              onGetStarted={() =>
                user ? setCurrentView('catalog') : setIsAuthModalOpen(true)
              }
            />
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
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
      />

      <main>{renderContent()}</main>

      {/* 🔥 Botón flotante de donación: siempre visible, pero SOLO en móvil */}
      <DonationFloatingButton />

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
