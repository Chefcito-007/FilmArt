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
  trailer: string; // URL del trailer (YouTube, Vimeo, o MP4 remoto)
}

interface MovieCatalogProps {
  user: any;
  preview?: boolean;
}

// 🔹 Función para sacar el ID de YouTube desde un link
const extractYouTubeId = (url: string): string => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};

export function MovieCatalog({ user, preview = false }: MovieCatalogProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [playingMovie, setPlayingMovie] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // 🔹 Aquí solo cambias los "trailer" por links de YouTube / Vimeo / MP4 online
  const sampleMovies: Movie[] = [
    {
      id: '1',
      title: 'La Decima',
      director: 'Esteban Suarez',
      duration: 45,
      genre: 'Documental',
      description:
        'Es un documental que narra la conquista del décimo título del Junior de Barranquilla en la Liga BetPlay 2023.',
      thumbnail:
        'https://static.wixstatic.com/media/b232c9_5adb256ed4a348f8ab595f43d44b7eab~mv2.jpg/v1/fill/w_2500,h_1406,al_c/b232c9_5adb256ed4a348f8ab595f43d44b7eab~mv2.jpg',
      rating: 4.8,
      views: 2840,
      likes: 2000,
      isLiked: true,
      tags: ['comunidad', 'deporte'],
      releaseYear: 2024,
      socialTheme: 'Deporte',
      trailer: 'https://www.youtube.com/watch?v=9Mj3XEEgQe8',
    },
    {
      id: '2',
      title: 'El conjuro 4: Los ultimos ritos',
      director: 'Michael Chaves',
      duration: 135,
      genre: 'Terror',
      description:
        'En 1986, los investigadores paranormales Ed y Lorraine Warren viajan a Pensilvania para vencer a un demonio.',
      thumbnail:
        'https://m.media-amazon.com/images/M/MV5BYmU0NzZhYTItOWEyMy00YWE5LTljZjgtOGJhYmIwNDI5NjNiXkEyXkFqcGc@._V1_.jpg',
      rating: 4.8,
      views: 3000,
      likes: 450,
      isLiked: false,
      tags: ['comunidad', 'terror'],
      releaseYear: 2025,
      socialTheme: 'Terror',
      trailer: 'https://www.youtube.com/watch?v=nXObaGjH4Pc',
    },
    {
      id: '3',
      title: 'National Geographic',
      director: 'Alastair Fothergill and Keith Scholey',
      duration: 60,
      genre: 'Documental',
      description:
        'Es una serie documental que combina la espectacular fotografía de paisajes y vida salvaje.',
      thumbnail:
        'https://alfabetajuega.com/hero/2022/04/19d79bc3e750b0e332a0deebb15b9630.jpg?width=1200',
      rating: 4.8,
      views: 3000,
      likes: 450,
      isLiked: false,
      tags: ['comunidad', 'documental'],
      releaseYear: 2025,
      socialTheme: 'Documental',
      trailer: 'https://www.youtube.com/watch?v=GfO-3Oir-qM',
    },
        {
      id: '4',
      title: 'Secretos Ocultos de una Civilización Eterna',
      director: 'LOS MAYAS',
      duration: 30,
      genre: 'Documental',
      description:
        'Misteriosa, avanzada y profundamente enigmática. La civilización maya dejó huellas imborrables en la historia de Mesoamérica.',
      thumbnail:
        'https://i.ytimg.com/vi/l2BKZ-AqO8I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCK0UDH78FRl3d9S3bJkPuPDzEsWA',
      rating: 3.8,
      views: 2000,
      likes: 300,
      isLiked: false,
      tags: ['comunidad', 'documental', 'civilización'],
      releaseYear: 2025,
      socialTheme: 'Documental',
      trailer: 'https://www.youtube.com/watch?v=VzgBpxyzQN0',
    },
            {
      id: '5',
      title: '¿Quién mandará en la inteligencia artificial?',
      director: 'DW Documental',
      duration: 120,
      genre: 'Tecnologia',
      description:
        'La carrera por la hegemonía en la era de la inteligencia artificial ha comenzado. Entre China, EE. UU. y Europa; entre consorcios tecnológicos y emprendimientos.',
      thumbnail:
        'https://i.ytimg.com/vi/PPMb_rrej5c/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCHI41gn5JeEQJvkylrY5iceCxz_w',
      rating: 4.5,
      views: 10000,
      likes: 8000,
      isLiked: false,
      tags: ['comunidad', 'documental', 'tecnologia'],
      releaseYear: 2025,
      socialTheme: 'Documental',
      trailer: 'https://www.youtube.com/watch?v=PPMb_rrej5c',
    },
            {
      id: '6',
      title: 'Salud mental y resiliencia - los secretos del alma',
      director: 'DW Documental',
      duration: 52,
      genre: 'Documental',
      description:
        'Unos mil millones de personas en todo el mundo padecen enfermedades ligadas al estrés. Una tendencia en aumento. ¿Qué protege a quienes se mantienen sanos? ¿Es innata su resiliencia? ¿O se puede aprender a soportar el estrés crónico y las crisis?',
      thumbnail:
        'https://i.ytimg.com/vi/-rD7COiH67I/maxresdefault.jpg',
      rating: 4.7,
      views: 5000,
      likes: 1070,
      isLiked: true,
      tags: ['comunidad', 'documental', 'salud mental'],
      releaseYear: 2025,
      socialTheme: 'Documental',
      trailer: 'https://www.youtube.com/watch?v=-rD7COiH67I',
    },
    // Puedes seguir agregando más...
  ];

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const moviesToShow = preview ? sampleMovies.slice(0, 3) : sampleMovies;
      setMovies(moviesToShow);
      setFilteredMovies(moviesToShow);
      setIsLoading(false);
    };

    loadMovies();
  }, [preview]);

  useEffect(() => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter((movie) => movie.genre === selectedGenre);
    }

    if (selectedTheme !== 'all') {
      filtered = filtered.filter(
        (movie) => movie.socialTheme === selectedTheme
      );
    }

    setFilteredMovies(filtered);
  }, [searchTerm, selectedGenre, selectedTheme, movies]);

  const handleLike = (movieId: string) => {
    if (!user) return;

    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              isLiked: !movie.isLiked,
              likes: movie.isLiked ? movie.likes - 1 : movie.likes + 1,
            }
          : movie
      )
    );
  };
// Filtros - Buscador
  const genres = ['all', 'Documental', 'Terror', 'Tecnologia'];
  const themes = ['all', 'Deporte', 'Terror', 'Documental'];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Catálogo de Películas y Documentales
            </h1>
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
                  {genres
                    .filter((g) => g !== 'all')
                    .map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tema social" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los temas</SelectItem>
                  {themes
                    .filter((t) => t !== 'all')
                    .map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      {/* Grid de películas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => {
          const isYouTubeTrailer =
            movie.trailer.includes('youtube.com') ||
            movie.trailer.includes('youtu.be');

          return (
            <Card
              key={movie.id}
              className="overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay con botón de play o video */}
                {playingMovie !== movie.id ? (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button
                      className="opacity-100 bg-white text-black hover:bg-gray-100"
                      size="lg"
                      onClick={() => setPlayingMovie(movie.id)}
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Reproducir
                    </Button>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    {isYouTubeTrailer ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${extractYouTubeId(
                          movie.trailer
                        )}`}
                        title={movie.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        ref={(el) => (videoRefs.current[movie.id] = el)}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                        src={movie.trailer}
                      />
                    )}
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{movie.rating}</span>
                </div>

                {/* Género badge */}
                <Badge className="absolute top-3 right-3 bg-indigo-600">
                  {movie.genre}
                </Badge>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Por {movie.director}
                </p>
                <p className="text-gray-700 text-sm mb-3">
                  {movie.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {movie.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{movie.duration} min</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{movie.views.toLocaleString()}</span>
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(movie.id)}
                  disabled={!user}
                  className={`flex items-center space-x-2 ${
                    movie.isLiked ? 'text-red-600' : 'text-gray-600'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      movie.isLiked ? 'fill-current' : ''
                    }`}
                  />
                  <span>{movie.likes}</span>
                </Button>

                <span className="text-xs text-gray-500">
                  {movie.socialTheme}
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
