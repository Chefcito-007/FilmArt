import React from 'react';
import { Film, Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-indigo-600 rounded-lg p-2">
                <Film className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">FilmArt</h3>
                <p className="text-sm text-gray-400">Online</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Una plataforma dedicada a promover la cultura, la inclusión y el diálogo 
              constructivo a través del cine independiente y social.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-gray-400">Hecho con amor para la comunidad</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Explorar</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Catálogo de películas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Debates en vivo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cineastas destacados
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Próximos eventos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cómo donar
                </a>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Comunidad</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Únete como cineasta
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Normas de participación
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog y noticias
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Recursos educativos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Centro de ayuda
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-gray-400">contacto@cinecomunitario.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-gray-400">+57 (1) 234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-gray-400">Barranquilla, Colombia</span>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">Síguenos</h5>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="text-sm text-gray-400">
              <p>&copy; 2025 FilmArt. Todos los derechos reservados.</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Términos de uso
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Accesibilidad
              </a>
            </div>
          </div>
        </div>

        {/* Mensaje inclusivo */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg p-6">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-white">Compromiso con la inclusión:</strong> 
              Trabajamos constantemente para hacer nuestra plataforma accesible a todas las personas, 
              incluyendo subtítulos, descripciones de audio y próximamente interpretación en lenguaje de señas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}