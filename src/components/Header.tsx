import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Film, Users, MessageCircle, User, LogOut } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'catalog' | 'debate' | 'profile' | 'community';
  setCurrentView: (view: 'home' | 'catalog' | 'debate' | 'profile' | 'community') => void;
  user: any; // Aquí debería venir el objeto del usuario
  onAuthClick: () => void;
  onSignOut: () => void;
}

export function Header({
  currentView,
  setCurrentView,
  user,
  onAuthClick,
  onSignOut,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <div className="bg-indigo-600 rounded-lg p-2">
              <Film className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FilmArt</h1>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                currentView === 'home'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Inicio</span>
            </button>

            <button
              onClick={() => setCurrentView('catalog')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                currentView === 'catalog'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Film className="h-4 w-4" />
              <span>Catálogo</span>
            </button>

            <button
              onClick={() => setCurrentView('debate')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                currentView === 'debate'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Debates</span>
              <Badge variant="secondary" className="ml-1">
                En vivo
              </Badge>
            </button>

            <button
              onClick={() => setCurrentView('community')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                currentView === 'community'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Comunidad</span>
            </button>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:block">{user.name || user.email}</span>
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Salir</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={onAuthClick}>
                  Iniciar sesión
                </Button>
                <Button onClick={onAuthClick} className="bg-indigo-600 hover:bg-indigo-700">
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex justify-around border-t pt-3">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-colors ${
              currentView === 'home' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Film className="h-5 w-5" />
            <span className="text-xs">Inicio</span>
          </button>

          <button
            onClick={() => setCurrentView('catalog')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-colors ${
              currentView === 'catalog' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Film className="h-5 w-5" />
            <span className="text-xs">Catálogo</span>
          </button>

          <button
            onClick={() => setCurrentView('debate')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-colors relative ${
              currentView === 'debate' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Debates</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          <button
            onClick={() => setCurrentView('community')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-colors ${
              currentView === 'community' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs">Comunidad</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
