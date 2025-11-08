// Script de inicialización para debates
// Este archivo puede ser ejecutado para inicializar los datos de debates

export const defaultDebate = {
  id: '1',
  movieTitle: 'National Geographic',
  movieThumbnail: 'https://www.youtube.com/watch?v=ovK4Ik3HIJI',
  topic: '¿Cómo podemos contribuir a la conservación de la biodiversidad y los ecosistemas naturales?',
  startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  participants: 30,
  moderator: 'Fabian Tirado',
  status: 'live'
};

export const defaultMessages = [
  {
    id: '1',
    user: { name: 'María González', id: 'sample-user-1' },
    message: 'Me impresionó cómo el documental muestra la urgencia de proteger los océanos. El 70% de nuestro planeta es agua',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    likes: 8,
    likedBy: []
  },
  {
    id: '2',
    user: { name: 'Carlos Mendoza', id: 'sample-user-2' },
    message: 'Totalmente María. La fotografía de National Geographic nos abre los ojos a ecosistemas que nunca veríamos de otra forma',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    likes: 12,
    likedBy: []
  },
  {
    id: '3',
    user: { name: 'Ana Ruiz', id: 'sample-user-3' },
    message: 'Lo que más me preocupa es la velocidad con la que están desapareciendo especies. Necesitamos actuar ya',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    likes: 15,
    likedBy: []
  },
  {
    id: '4',
    user: { name: 'Roberto', id: 'sample-user-4' },
    message: '¿Qué sobre el cambio climático y su impacto en los ecosistemas polares? Las imágenes son devastadoras',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    likes: 6,
    likedBy: []
  },
  {
    id: '5',
    user: { name: 'Elena Vargas', id: 'sample-user-5' },
    message: 'Roberto, es alarmante. Pero también me da esperanza ver proyectos de conservación exitosos. Aún podemos hacer la diferencia',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    likes: 9,
    likedBy: []
  }
];
