import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Crear una única instancia del cliente de Supabase para toda la aplicación
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);