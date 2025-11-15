import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  TrendingUp, 
  MessageCircle, 
  Film,
  Heart,
  Award,
  Star,
  Calendar,
  Activity,
  Eye
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommunityProps {
  user: any;
}

interface CommunityMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  communityPoints: number;
  contributionsCount: number;
  badges: string[];
}

interface CommunityActivity {
  id: string;
  type: 'debate' | 'like' | 'donation' | 'watch';
  user: {
    name: string;
    avatar?: string;
  };
  description: string;
  timestamp: Date;
  movieTitle?: string;
}

interface TrendingMovie {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  debatesCount: number;
}

export function Community({ user }: CommunityProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo de la comunidad
  const communityStats = {
    totalMembers: 1247,
    activeToday: 89,
    totalMovies: 156,
    totalDebates: 342,
    totalDonations: 15680000, // COP
    moviesWatchedToday: 234
  };

  const topMembers: CommunityMember[] = [
    {
      id: '1',
      name: 'María González',
      email: 'maria@example.com',
      communityPoints: 3450,
      contributionsCount: 127,
      badges: ['Líder', 'Generosa', 'Cinéfila']
    },
    {
      id: '2',
      name: 'Carlos Mendoza',
      email: 'carlos@example.com',
      communityPoints: 2890,
      contributionsCount: 98,
      badges: ['Participativo', 'Crítico']
    },
    {
      id: '3',
      name: 'Ana Ruiz',
      email: 'ana@example.com',
      communityPoints: 2650,
      contributionsCount: 85,
      badges: ['Activa', 'Colaboradora']
    },
    {
      id: '4',
      name: 'Roberto Silva',
      email: 'roberto@example.com',
      communityPoints: 2340,
      contributionsCount: 76,
      badges: ['Moderador', 'Experto']
    },
    {
      id: '5',
      name: 'Elena Vargas',
      email: 'elena@example.com',
      communityPoints: 2100,
      contributionsCount: 68,
      badges: ['Entusiasta']
    }
  ];

  const recentActivity: CommunityActivity[] = [
    {
      id: '1',
      type: 'debate',
      user: { name: 'Juan Pérez' },
      description: 'participó en el debate de',
      movieTitle: 'La decima',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '2',
      type: 'like',
      user: { name: 'Laura Sánchez' },
      description: 'le gustó',
      movieTitle: 'El Conjuto',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: '3',
      type: 'watch',
      user: { name: 'Pedro Morales' },
      description: 'vió',
      movieTitle: 'National Geographic',
      timestamp: new Date(Date.now() - 25 * 60 * 1000)
    },
    {
      id: '4',
      type: 'donation',
      user: { name: 'Sofía López' },
      description: 'donó $20,000 a un cineasta',
      timestamp: new Date(Date.now() - 35 * 60 * 1000)
    },
    {
      id: '5',
      type: 'debate',
      user: { name: 'Miguel Torres' },
      description: 'inició un debate sobre',
      movieTitle: 'National Geographic',
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: '6',
      type: 'like',
      user: { name: 'Carmen Díaz' },
      description: 'le gustó',
      movieTitle: 'La decima',
      timestamp: new Date(Date.now() - 60 * 60 * 1000)
    }
  ];

  const trendingMovies: TrendingMovie[] = [
    {
      id: '1',
      title: 'La Decima',
      thumbnail: 'https://static.wixstatic.com/media/b232c9_5adb256ed4a348f8ab595f43d44b7eab~mv2.jpg/v1/fill/w_2500,h_1406,al_c/b232c9_5adb256ed4a348f8ab595f43d44b7eab~mv2.jpg',
      views: 3500,
      likes: 1000,
      debatesCount: 12
    },
    {
      id: '2',
      title: 'El Conjuto',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BOGU3OTk3ZjgtMTE1YS00ZTFkLTgwNGEtMWMxYjc5N2VkMjBmXkEyXkFqcGc@._V1_.jpg',
      views: 3200,
      likes: 289,
      debatesCount: 15
    },
    {
      id: '3',
      title: 'National Geographic',
      thumbnail: 'https://alfabetajuega.com/hero/2022/04/19d79bc3e750b0e332a0deebb15b9630.jpg?width=1200',
      views: 1890,
      likes: 124,
      debatesCount: 8
    },
  ];

  useEffect(() => {
    // Simular carga de datos
    const loadCommunityData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
    };

    loadCommunityData();
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffMinutes < 1) return 'Ahora mismo';
    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Hace ${diffHours} h`;
    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'debate':
        return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case 'like':
        return <Heart className="h-4 w-4 text-red-600" />;
      case 'donation':
        return <Award className="h-4 w-4 text-yellow-600" />;
      case 'watch':
        return <Eye className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FilmArt</h1>
        <p className="text-gray-600">
          Conoce a los miembros más activos y descubre lo que está pasando en nuestra comunidad
        </p>
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.totalMembers}</div>
            <div className="text-xs text-gray-600">Miembros</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.activeToday}</div>
            <div className="text-xs text-gray-600">Activos hoy</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Film className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.totalMovies}</div>
            <div className="text-xs text-gray-600">Películas</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.totalDebates}</div>
            <div className="text-xs text-gray-600">Debates</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-lg font-bold">{Math.floor(communityStats.totalDonations / 1000000)}M</div>
            <div className="text-xs text-gray-600">Donaciones</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{communityStats.moviesWatchedToday}</div>
            <div className="text-xs text-gray-600">Vistas hoy</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de contenido */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="members">Miembros</TabsTrigger>
          <TabsTrigger value="trending">Tendencias</TabsTrigger>
        </TabsList>

        {/* Vista General */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Actividad reciente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  <span>Actividad Reciente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-semibold">{activity.user.name}</span>{' '}
                          {activity.description}
                          {activity.movieTitle && (
                            <span className="text-indigo-600"> "{activity.movieTitle}"</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">{formatTime(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Miembros Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <span>Miembros Destacados</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topMembers.slice(0, 5).map((member, index) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-gray-400 w-6">
                        #{index + 1}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-700">
                          {member.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{member.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-600">
                            {member.communityPoints} pts
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">
                            {member.contributionsCount} contribuciones
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Películas Trending */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Películas Populares Esta Semana</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingMovies.map((movie) => (
                  <div key={movie.id} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
                      <ImageWithFallback
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-white font-semibold text-sm truncate">
                          {movie.title}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{movie.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{movie.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{movie.debatesCount}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Miembros */}
        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Miembros Más Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMembers.map((member, index) => (
                  <div key={member.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-gray-300 w-8">
                      #{index + 1}
                    </div>
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 text-lg">
                        {member.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {member.badges.map((badge) => (
                          <Badge key={badge} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">
                        {member.communityPoints}
                      </div>
                      <p className="text-xs text-gray-600">puntos</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {member.contributionsCount} contribuciones
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tendencias */}
        <TabsContent value="trending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Películas Más Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {trendingMovies.map((movie, index) => (
                  <div key={movie.id} className="flex space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
                    <div className="text-3xl font-bold text-gray-200 self-center">
                      #{index + 1}
                    </div>
                    <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">{movie.title}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>Vistas</span>
                          </span>
                          <span className="font-semibold">{movie.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>Me gusta</span>
                          </span>
                          <span className="font-semibold">{movie.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>Debates</span>
                          </span>
                          <span className="font-semibold">{movie.debatesCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
