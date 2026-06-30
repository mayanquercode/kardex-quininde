import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://doxfkasuczubrsxmaqne.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRveGZrYXN1Y3p1YnJzeG1hcW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDg4MjgsImV4cCI6MjA4MDcyNDgyOH0.3YOc39BacxmpoI4IQ5gjm841U7qmwxZ8i7PksWmw8xU';

export const supabase = createClient(supabaseUrl, supabaseKey);

