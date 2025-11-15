import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Users, Heart, Award } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative text-white">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img
          src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop"
          alt="Proyección de cine comunitario"
          className="w-full h-full object-cover opacity-50" // Opacidad oscura para visibilidad
        />
        {/* Superposición Negra */}
  <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 w-fit">
                <Heart className="h-3 w-3 mr-2" />
                Cultura para todos
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Cine que une
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                  comunidades
                </span>
              </h1>
              
              <p className="text-xl text-gray-200 leading-relaxed">
                Descubre cortometrajes y documentales con enfoque social y cultural. 
                Participa en debates en vivo, vota por tus favoritos y apoya a cineastas independientes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-white text-indigo-900 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Comenzar a explorar</span>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-white/10 text-white backdrop-blur-sm"
              >
                <Users className="h-5 w-5 mr-2" />
                Unirse a la comunidad
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">250+</div>
                <div className="text-sm text-gray-300">Cortometrajes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15K+</div>
                <div className="text-sm text-gray-300">Miembros activos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-gray-300">Cineastas apoyados</div>
              </div>
            </div>
          </div>

          {/* Hero Video Preview */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              >
                <source src="../public/img/video/proyector.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button 
                  
                  className="bg-white/90 hover:bg-white rounded-full p-6 transition-all transform hover:scale-105"
                >
                  <Play className="h-8 w-8 text-indigo-900 ml-1" />
                </button>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 rounded-full p-2">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Premiado</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="bg-red-500 rounded-full w-3 h-3"></div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">En vivo</div>
                  <div className="text-xs text-gray-500">Debate activo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
