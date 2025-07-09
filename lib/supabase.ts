import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://uzhtumuzysycntyiahnm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6aHR1bXV6eXN5Y250eWlhaG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDQ0NjUsImV4cCI6MjA2NzU4MDQ2NX0.UoeWWPqEY2Pd4JlBXrelGOOZb3PX9LCO6O1viUAlEuw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
