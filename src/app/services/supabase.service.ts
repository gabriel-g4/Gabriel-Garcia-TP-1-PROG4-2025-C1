import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';


const supabase: SupabaseClient  = createClient(
  environment.supabaseUrl,
  environment.supabaseKey, 
  {
    auth: {
      autoRefreshToken: false,
    }
  })

export default supabase

