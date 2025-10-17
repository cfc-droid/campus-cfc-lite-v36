import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('config').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Connected to Supabase successfully');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

testConnection();
