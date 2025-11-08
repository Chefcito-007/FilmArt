import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from './kv_store.tsx';
import { defaultDebate, defaultMessages } from './init-debates.tsx';

const app = new Hono();

// Configurar CORS y logging
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Cliente Supabase para operaciones administrativas
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Ruta de prueba
app.get('/make-server-a3436add/', (c) => {
  return c.json({ 
    message: 'Cine Comunitario Online API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Registro de nuevos usuarios
app.post('/make-server-a3436add/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Email, contraseña y nombre son requeridos' }, 400);
    }

    // Crear usuario con Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { 
        name: name,
        profile_created: new Date().toISOString()
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Error creating user:', error);
      return c.json({ 
        error: error.message === 'User already registered' 
          ? 'Este email ya está registrado' 
          : 'Error al crear la cuenta'
      }, 400);
    }

    console.log('User created successfully:', data.user?.id);

    return c.json({ 
      message: 'Usuario creado exitosamente',
      user: {
        id: data.user?.id,
        email: data.user?.email,
        name: name
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Error interno del servidor' }, 500);
  }
});

// Obtener información del usuario autenticado
app.get('/make-server-a3436add/user/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Token de autorización requerido' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    return c.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || 'Usuario',
      created_at: user.created_at,
      profile_created: user.user_metadata?.profile_created
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return c.json({ error: 'Error al obtener perfil' }, 500);
  }
});

// Obtener catálogo de películas (datos de ejemplo por ahora)
app.get('/make-server-a3436add/movies', async (c) => {
  try {
    // Por ahora retornamos datos de ejemplo
    // En el futuro esto vendrá de una base de datos
    const movies = [
      {
        id: '1',
        title: 'Voces del Barrio',
        director: 'María González',
        duration: 18,
        genre: 'Documental',
        description: 'Un recorrido por las historias de resistencia y esperanza en una comunidad urbana.',
        thumbnail: 'https://images.unsplash.com/photo-1630853480548-d1b4a1ecd193?w=400&h=600&fit=crop',
        rating: 4.7,
        views: 2840,
        likes: 156,
        tags: ['comunidad', 'urbano', 'social'],
        releaseYear: 2024,
        socialTheme: 'Desigualdad social',
        videoUrl: 'https://example.com/video1.mp4' // Placeholder
      },
      {
        id: '2',
        title: 'El Último Guardián',
        director: 'Carlos Mendoza',
        duration: 22,
        genre: 'Ficción',
        description: 'La historia de un anciano que protege los saberes ancestrales de su pueblo.',
        thumbnail: 'https://images.unsplash.com/photo-1758244016382-c0807cf00fbf?w=400&h=600&fit=crop',
        rating: 4.9,
        views: 3200,
        likes: 289,
        tags: ['ancestral', 'tradición', 'cultura'],
        releaseYear: 2023,
        socialTheme: 'Preservación cultural',
        videoUrl: 'https://example.com/video2.mp4' // Placeholder
      }
    ];

    return c.json({ movies });

  } catch (error) {
    console.error('Get movies error:', error);
    return c.json({ error: 'Error al obtener catálogo' }, 500);
  }
});

// Dar like a una película
app.post('/make-server-a3436add/movies/:id/like', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Token de autorización requerido' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    const movieId = c.req.param('id');
    const { isLiked } = await c.req.json();

    // Aquí implementarías la lógica para guardar likes en la base de datos
    // Por ahora solo retornamos éxito

    console.log(`User ${user.id} ${isLiked ? 'liked' : 'unliked'} movie ${movieId}`);

    return c.json({ 
      success: true,
      message: isLiked ? 'Like agregado' : 'Like removido'
    });

  } catch (error) {
    console.error('Like movie error:', error);
    return c.json({ error: 'Error al procesar like' }, 500);
  }
});

// Resetear debates (útil para actualizar datos)
app.post('/make-server-a3436add/debates/reset', async (c) => {
  try {
    await kv.set('debates', [defaultDebate]);
    await kv.set(`debate_messages_${defaultDebate.id}`, defaultMessages);
    
    return c.json({ 
      success: true, 
      message: 'Debates reseteados exitosamente',
      debate: defaultDebate 
    });

  } catch (error) {
    console.error('Reset debates error:', error);
    return c.json({ error: 'Error al resetear debates' }, 500);
  }
});

// Obtener debates activos
app.get('/make-server-a3436add/debates', async (c) => {
  try {
    // Obtener debates del KV store
    let debatesData = await kv.get('debates') || [];
    
    // Si no hay debates, crear uno por defecto con mensajes iniciales
    if (debatesData.length === 0) {
      await kv.set('debates', [defaultDebate]);
      await kv.set(`debate_messages_${defaultDebate.id}`, defaultMessages);
      debatesData = [defaultDebate];
    } else {
      // Actualizar siempre los datos del debate con la información más reciente
      // pero mantener el contador de participantes
      const updatedDebates = debatesData.map((debate: any) => {
        if (debate.id === defaultDebate.id) {
          return {
            ...defaultDebate,
            participants: debate.participants // Mantener el número actual de participantes
          };
        }
        return debate;
      });
      
      // Si el debate por defecto no existe, agregarlo
      if (!updatedDebates.some((d: any) => d.id === defaultDebate.id)) {
        await kv.set('debates', [defaultDebate]);
        await kv.set(`debate_messages_${defaultDebate.id}`, defaultMessages);
        debatesData = [defaultDebate];
      } else {
        await kv.set('debates', updatedDebates);
        debatesData = updatedDebates;
      }
    }

    return c.json({ debates: debatesData });

  } catch (error) {
    console.error('Get debates error:', error);
    return c.json({ error: 'Error al obtener debates' }, 500);
  }
});

// Obtener mensajes de un debate
app.get('/make-server-a3436add/debates/:id/messages', async (c) => {
  try {
    const debateId = c.req.param('id');
    const messagesKey = `debate_messages_${debateId}`;
    
    let messages = await kv.get(messagesKey) || [];
    
    // Si no hay mensajes para el debate por defecto, inicializarlos
    if (messages.length === 0 && debateId === defaultDebate.id) {
      await kv.set(messagesKey, defaultMessages);
      messages = defaultMessages;
    }

    return c.json({ messages });

  } catch (error) {
    console.error('Get debate messages error:', error);
    return c.json({ error: 'Error al obtener mensajes del debate' }, 500);
  }
});

// Enviar mensaje a debate
app.post('/make-server-a3436add/debates/:id/message', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Token de autorización requerido' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    const debateId = c.req.param('id');
    const { message } = await c.req.json();

    if (!message || message.trim().length === 0) {
      return c.json({ error: 'El mensaje no puede estar vacío' }, 400);
    }

    const messagesKey = `debate_messages_${debateId}`;
    const existingMessages = await kv.get(messagesKey) || [];

    const newMessage = {
      id: Date.now().toString(),
      user: {
        name: user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario',
        id: user.id
      },
      message: message,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedBy: []
    };

    existingMessages.push(newMessage);
    await kv.set(messagesKey, existingMessages);

    // Actualizar conteo de participantes
    const debates = await kv.get('debates') || [];
    const updatedDebates = debates.map((d: any) => {
      if (d.id === debateId) {
        const uniqueParticipants = new Set([...existingMessages.map((m: any) => m.user.id)]);
        return { ...d, participants: uniqueParticipants.size };
      }
      return d;
    });
    await kv.set('debates', updatedDebates);

    console.log(`User ${user.id} sent message to debate ${debateId}: ${message}`);

    return c.json({ 
      success: true,
      message: 'Mensaje enviado correctamente',
      messageData: newMessage
    });

  } catch (error) {
    console.error('Send message error:', error);
    return c.json({ error: 'Error al enviar mensaje' }, 500);
  }
});

// Dar like a un mensaje de debate
app.post('/make-server-a3436add/debates/:debateId/messages/:messageId/like', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Token de autorización requerido' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Token inválido' }, 401);
    }

    const debateId = c.req.param('debateId');
    const messageId = c.req.param('messageId');
    
    const messagesKey = `debate_messages_${debateId}`;
    const messages = await kv.get(messagesKey) || [];

    const updatedMessages = messages.map((msg: any) => {
      if (msg.id === messageId) {
        const likedBy = msg.likedBy || [];
        const hasLiked = likedBy.includes(user.id);
        
        if (hasLiked) {
          // Remove like
          return {
            ...msg,
            likes: Math.max(0, msg.likes - 1),
            likedBy: likedBy.filter((id: string) => id !== user.id)
          };
        } else {
          // Add like
          return {
            ...msg,
            likes: msg.likes + 1,
            likedBy: [...likedBy, user.id]
          };
        }
      }
      return msg;
    });

    await kv.set(messagesKey, updatedMessages);

    const updatedMessage = updatedMessages.find((m: any) => m.id === messageId);

    return c.json({ 
      success: true,
      message: 'Like actualizado',
      messageData: updatedMessage
    });

  } catch (error) {
    console.error('Like message error:', error);
    return c.json({ error: 'Error al procesar like' }, 500);
  }
});

// Ruta para manejar errores 404
app.notFound((c) => {
  return c.json({ error: 'Ruta no encontrada' }, 404);
});

// Manejo global de errores
app.onError((err, c) => {
  console.error('Global error handler:', err);
  return c.json({ error: 'Error interno del servidor' }, 500);
});

console.log('Cine Comunitario Online server starting...');

serve(app.fetch);