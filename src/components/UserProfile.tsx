import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Heart, 
  MessageCircle, 
  Award, 
  Calendar, 
  Film, 
  Users, 
  DollarSign,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfileProps {
  user: any;
}

interface UserStats {
  moviesWatched: number;
  debatesParticipated: number;
  likesGiven: number;
  donationsTotal: number;
  favoriteGenre: string;
  memberSince: Date;
  communityPoints: number;
  badges: string[];
}

interface WatchedMovie {
  id: string;
  title: string;
  thumbnail: string;
  watchedDate: Date;
  rating?: number;
  liked: boolean;
}

interface DebateParticipation {
  id: string;
  movieTitle: string;
  topic: string;
  date: Date;
  messagesCount: number;
  likes: number;
}

export function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Datos de ejemplo del usuario
  const userStats: UserStats = {
    moviesWatched: 23,
    debatesParticipated: 8,
    likesGiven: 156,
    donationsTotal: 75000, // en pesos colombianos
    favoriteGenre: 'Documental',
    memberSince: new Date('2024-01-15'),
    communityPoints: 1250,
    badges: ['Cinéfilo', 'Participativo', 'Generoso', 'Crítico constructivo']
  };

  const watchedMovies: WatchedMovie[] = [
    {
      id: '1',
      title: 'La Decima',
      thumbnail: 'https://static.wixstatic.com/media/b232c9_5adb256ed4a348f8ab595f43d44b7eab~mv2.jpg/v1/fill/w_2500,h_1406,al_c/b232c9_5adb256ed4a348f8ab595f43d44b7eab~mv2.jpg',
      watchedDate: new Date('2024-01-20'),
      rating: 5,
      liked: true
    },
    {
      id: '2',
      title: 'El conjuro 4: Los ultimos ritos',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BYmU0NzZhYTItOWEyMy00YWE5LTljZjgtOGJhYmIwNDI5NjNiXkEyXkFqcGc@._V1_.jpg',
      watchedDate: new Date('2024-01-18'),
      rating: 4,
      liked: false
    },
    {
      id: '3',
      title: 'National Geographic',
      thumbnail: 'https://alfabetajuega.com/hero/2022/04/19d79bc3e750b0e332a0deebb15b9630.jpg?width=1200',
      watchedDate: new Date('2024-01-15'),
      rating: 4,
      liked: true
    }
  ];

  const debateHistory: DebateParticipation[] = [
    {
      id: '3',
      movieTitle: 'National Geographic',
      topic: 'Participación comunitaria en temas del planeta',
      date: new Date('2024-01-20'),
      messagesCount: 5,
      likes: 23
    },
    {
      id: '2',
      movieTitle: 'El conjuro',
      topic: 'Preservación de saberes ancestrales',
      date: new Date('2024-01-18'),
      messagesCount: 8,
      likes: 45
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getProgressToNextLevel = () => {
    const currentLevel = Math.floor(userStats.communityPoints / 500) + 1;
    const pointsInCurrentLevel = userStats.communityPoints % 500;
    const progressPercentage = (pointsInCurrentLevel / 500) * 100;
    
    return {
      currentLevel,
      progressPercentage,
      pointsToNext: 500 - pointsInCurrentLevel
    };
  };

  const { currentLevel, progressPercentage, pointsToNext } = getProgressToNextLevel();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header del perfil */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={undefined} />
                <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-700">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {user.user_metadata?.name || user.displayName}
                </h1>
                <p className="text-gray-600 mb-4">
                  Miembro desde {formatDate(userStats.memberSince)}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {userStats.badges.map((badge) => (
                    <Badge key={badge} className="bg-indigo-100 text-indigo-800">
                      <Award className="h-3 w-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Nivel {currentLevel}</span>
                    <span className="text-sm text-gray-600">
                      {pointsToNext} puntos para el siguiente nivel
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {userStats.communityPoints} puntos de comunidad
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Film className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.moviesWatched}</div>
            <div className="text-sm text-gray-600">Películas vistas</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.debatesParticipated}</div>
            <div className="text-sm text-gray-600">Debates</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userStats.likesGiven}</div>
            <div className="text-sm text-gray-600">Me gusta dados</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{formatCurrency(userStats.donationsTotal)}</div>
            <div className="text-sm text-gray-600">Donado</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de contenido */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Películas favoritas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <span>Películas recientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {watchedMovies.slice(0, 3).map((movie) => (
                  <div key={movie.id} className="flex items-center space-x-3">
                    <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{movie.title}</p>
                      <p className="text-xs text-gray-600">
                        {formatDate(movie.watchedDate)}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {movie.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{movie.rating}</span>
                          </div>
                        )}
                        {movie.liked && (
                          <Heart className="h-3 w-3 fill-red-400 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actividad en debates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <span>Participación en debates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {debateHistory.slice(0, 3).map((debate) => (
                  <div key={debate.id} className="border-l-4 border-green-500 pl-3">
                    <p className="font-semibold text-sm">{debate.movieTitle}</p>
                    <p className="text-xs text-gray-600 mb-1">{debate.topic}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span>{formatDate(debate.date)}</span>
                      <span>{debate.messagesCount} mensajes</span>
                      <span>{debate.likes} likes recibidos</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Estadísticas avanzadas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <span>Tu impacto en la comunidad</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {userStats.communityPoints}
                  </div>
                  <p className="text-sm text-gray-600">Puntos de comunidad ganados</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Por participar activamente en debates y apoyar contenido
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.floor(userStats.donationsTotal / 1000)}K
                  </div>
                  <p className="text-sm text-gray-600">Pesos donados</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Apoyando a {Math.floor(userStats.donationsTotal / 15000)} cineastas independientes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {userStats.favoriteGenre}
                  </div>
                  <p className="text-sm text-gray-600">Género favorito</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Basado en tu historial de visualización
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historial de películas vistas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchedMovies.map((movie) => (
                    <div key={movie.id} className="border rounded-lg p-3">
                      <div className="flex space-x-3">
                        <div className="w-16 h-24 rounded overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={movie.thumbnail}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{movie.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {formatDate(movie.watchedDate)}
                          </p>
                          <div className="flex items-center space-x-2">
                            {movie.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{movie.rating}</span>
                              </div>
                            )}
                            {movie.liked && (
                              <Heart className="h-3 w-3 fill-red-400 text-red-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actividad reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 border-l-4 border-blue-500 pl-3">
                    <Clock className="h-4 w-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm">Participaste en el debate de "El conjuro"</p>
                      <p className="text-xs text-gray-500">Hace 2 días</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 border-l-4 border-green-500 pl-3">
                    <DollarSign className="h-4 w-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm">Donaste $15,000 COP a María González</p>
                      <p className="text-xs text-gray-500">Hace 5 días</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 border-l-4 border-purple-500 pl-3">
                    <Heart className="h-4 w-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm">Diste like a "La decima"</p>
                      <p className="text-xs text-gray-500">Hace 1 semana</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}