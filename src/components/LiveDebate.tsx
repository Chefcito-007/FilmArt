import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Send, Users, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Message {
  id: string;
  user: {
    name: string;
    id: string;
    avatar?: string;
  };
  message: string;
  timestamp: string;
  likes: number;
}

interface DebateSession {
  id: string;
  movieTitle: string;
  movieThumbnail: string;
  trailerLink: string;
  topic: string;
  startTime: Date;
  participants: number;
  moderator: string;
  status: 'live' | 'scheduled' | 'ended';
}

interface LiveDebateProps {
  user: any;
}

const generateRandomMessages = () => {
  const messages = [
'¡Increíble cómo capturan la belleza de la naturaleza en National Geographic!',
  'Me fascina cómo explican la relación entre los animales y su entorno 🌍',
  '¿Alguien más se sorprendió con las imágenes del océano? Son impresionantes 🐋',
  'Este documental me hace pensar en lo importante que es cuidar el planeta 🌿',
  'La narración de National Geographic siempre logra inspirar, ¡qué producción tan buena!',
  ];
  return messages.map((msg, index) => ({
    id: `${index}`,
    user: {
      name: `Usuario ${index + 1}`,
      id: `${index}`,
      avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
    },
    message: msg,
    timestamp: new Date().toISOString(),
    likes: Math.floor(Math.random() * 5),
  }));
};

export function LiveDebate({ user }: LiveDebateProps) {
  const [currentSession, setCurrentSession] = useState<DebateSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null); // Referencia al video
  const [videoPlaying, setVideoPlaying] = useState(false); // Estado para controlar el video
  const [imageLoaded, setImageLoaded] = useState(false); // Estado para controlar la imagen antes de reproducir

  useEffect(() => {
    loadDebateData();

    const interval = setInterval(() => {
      loadMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadDebateData = async () => {
    try {
      setIsLoading(true);

      const sampleDebate = {
        id: '1',
        movieTitle: 'National Geographic',
        movieThumbnail: 'https://alfabetajuega.com/hero/2022/04/19d79bc3e750b0e332a0deebb15b9630.jpg?width=1200', // Imagen antes de reproducir
        trailerLink: '../public/img/video/nationalg.mp4',  // Ruta al video local
        topic: 'Tema de ejemplo sobre National Geographic',
        startTime: new Date(),
        participants: 5,
        moderator: 'Moderador Ejemplo',
        status: 'live',
      };

      setCurrentSession({
        ...sampleDebate,
        startTime: new Date(sampleDebate.startTime),
      });

      setMessages(generateRandomMessages()); // Generar mensajes aleatorios
    } catch (error) {
      console.error('Error loading debate data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = () => {
    setMessages(prevMessages => [
      ...prevMessages,
      ...generateRandomMessages(),
    ]);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || isSending) return;

    try {
      setIsSending(true);

      setMessages(prev => [...prev, {
        id: String(prev.length + 1),
        user: { name: user.name, id: user.id, avatar: user.avatar },
        message: newMessage,
        timestamp: new Date().toISOString(),
        likes: 0,
      }]);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const togglePlayVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPlaying(true);
        setImageLoaded(false); // Ocultar la imagen cuando el video empieza
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay debates activos en este momento
          </h3>
          <p className="text-gray-600 mb-6">
            Los debates se realizan después de cada proyección especial
          </p>
          <Button>Ver próximos eventos</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Debate  <span style={{color: "red"}}>° en Vivo</span></h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Panel izquierdo (chat) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Conversación</span>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{currentSession.participants} participantes</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96 px-6">
                <div className="space-y-4 py-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex space-x-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={message.user.avatar} />
                        <AvatarFallback>
                          {message.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{message.user.name}</span>
                          <span className="text-xs text-gray-500">
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Input para nuevo mensaje */}
          <Card>
            <CardContent>
              <div className="border-t p-4">
                {user ? (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Comparte tu opinión..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isSending}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-600 py-4">
                    <p>Inicia sesión para participar en el debate</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel derecho (video) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              {/* Mostrar imagen o video */}
              <div className="mb-6">
                <div className="aspect-video rounded-lg overflow-hidden">
                  {!videoPlaying && imageLoaded ? (
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BOGU3OTk3ZjgtMTE1YS00ZTFkLTgwNGEtMWMxYjc5N2VkMjBmXkEyXkFqcGc@._V1_.jpg"
                      alt={currentSession.movieTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      className="w-full h-full"
                      controls
                      onClick={togglePlayVideo}
                    >
                      <source src={currentSession.trailerLink} type="video/mp4" />
                      Tu navegador no soporta la etiqueta de video.
                    </video>
                  )}
                  <Button
                    onClick={togglePlayVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"
                  >
                    {videoPlaying ? 'Pausar' : 'Reproducir'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
