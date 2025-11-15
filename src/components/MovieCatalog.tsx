import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Play, Clock, Users, Heart, Search, Filter, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Movie {
  id: string;
  title: string;
  director: string;
  duration: number;
  genre: string;
  description: string;
  thumbnail: string;
  rating: number;
  views: number;
  likes: number;
  isLiked: boolean;
  tags: string[];
  releaseYear: number;
  socialTheme: string;
  trailer: string; // URL del trailer del video
}

interface MovieCatalogProps {
  user: any;
  preview?: boolean;
}

export function MovieCatalog({ user, preview = false }: MovieCatalogProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [playingMovie, setPlayingMovie] = useState<string | null>(null); // Controla cuál película se está reproduciendo
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({}); // Ref para cada video

  // Datos de ejemplo para el catálogo
  const sampleMovies: Movie[] = [
    {
      id: '1',
      title: 'La Decima',
      director: 'Esteban Suarez',
      duration: 45,
      genre: 'Documental',
      description: 'Es un documental que narra la conquista del décimo título del Junior de Barranquilla en la Liga BetPlay 2023.',
      thumbnail: 'https://static.wixstatic.com/media/b232c9_5adb256ed4a348f8ab595f43d44b7eab~mv2.jpg/v1/fill/w_2500,h_1406,al_c/b232c9_5adb256ed4a348f8ab595f43d44b7eab~mv2.jpg',
      rating: 4.8,
      views: 2840,
      likes: 200,
      isLiked: false,
      tags: ['comunidad', 'deporte'],
      releaseYear: 2024,
      socialTheme: 'Deporte',
      trailer: '../public/img/video/ladecima.mp4', // Link al video
    },
    {
      id: '2',
      title: 'El conjuro 4: Los ultimos ritos',
      director: 'Michael Chaves',
      duration: 135,
      genre: 'Terror',
      description: 'En 1986, los investigadores paranormales Ed y Lorraine Warren viajan a Pensilvania para vencer a un demonio.',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BYmU0NzZhYTItOWEyMy00YWE5LTljZjgtOGJhYmIwNDI5NjNiXkEyXkFqcGc@._V1_.jpg',
      rating: 4.8,
      views: 3000,
      likes: 450,
      isLiked: false,
      tags: ['comunidad', 'terror'],
      releaseYear: 2025,
      socialTheme: 'Terror',
      trailer: '../public/img/video/conjuro.mp4', // Link al video
    },
        {
      id: '3',
      title: 'National Geographic',
      director: 'Alastair Fothergill and Keith Scholey',
      duration: 60,
      genre: 'Documental',
      description: 'Es una serie documental de Netflix que combina la espectacular fotografía de paisajes y vida salvaje.',
      thumbnail: 'https://alfabetajuega.com/hero/2022/04/19d79bc3e750b0e332a0deebb15b9630.jpg?width=1200',
      rating: 4.8,
      views: 3000,
      likes: 450,
      isLiked: false,
      tags: ['comunidad', 'documental'],
      releaseYear: 2025,
      socialTheme: 'Documental',
      trailer: '../public/img/video/nationalg.mp4', // Link al video
    },
    // Más películas aquí...
  ];

  useEffect(() => {
    // Simular carga de datos
    const loadMovies = async () => {
      setIsLoading(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const moviesToShow = preview ? sampleMovies.slice(0, 3) : sampleMovies;
      setMovies(moviesToShow);
      setFilteredMovies(moviesToShow);
      setIsLoading(false);
    };

    loadMovies();
  }, [preview]);

  useEffect(() => {
    let filtered = movies;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrar por género
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Filtrar por tema social
    if (selectedTheme !== 'all') {
      filtered = filtered.filter(movie => movie.socialTheme === selectedTheme);
    }

    setFilteredMovies(filtered);
  }, [searchTerm, selectedGenre, selectedTheme, movies]);

  const handleLike = (movieId: string) => {
    if (!user) return;
    
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === movieId
          ? {
              ...movie,
              isLiked: !movie.isLiked,
              likes: movie.isLiked ? movie.likes - 1 : movie.likes + 1
            }
          : movie
      )
    );
  };

  const genres = ['all', 'Documental', 'Ficción'];
  const themes = ['all', 'Deporte', 'Terror', 'Variado', 'Derechos humanos'];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))} 
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {!preview && (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Películas</h1>
            <p className="text-gray-600">
              Descubre cortometrajes y documentales con enfoque social y cultural
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por título, director o temática..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los géneros</SelectItem>
                  {genres.filter(g => g !== 'all').map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tema social" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los temas</SelectItem>
                  {themes.filter(t => t !== 'all').map(theme => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      {/* Grid de películas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative aspect-[3/4] overflow-hidden">
              <ImageWithFallback
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay con botón de play */}
              {playingMovie !== movie.id ? (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button
                    className="opacity-100 bg-white text-black hover:bg-gray-100"
                    size="lg"
                    onClick={() => setPlayingMovie(movie.id)} // Reproducir
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Reproducir
                  </Button>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <video 
                    controls 
                    autoPlay
                    className="w-full h-64 object-cover"
                    src={movie.trailer} // Ruta del trailer
                    volume={0.2} // Volumen más bajo
                  ></video>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">Por {movie.director}</p>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{movie.description}</p>
              {/* Resto del contenido */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
