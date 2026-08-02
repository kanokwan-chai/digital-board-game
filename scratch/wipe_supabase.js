import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mpquqdoccadpxjvufcud.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wcXVxZG9jY2FkcHhqdnVmY3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NzMxMTQsImV4cCI6MjEwMTI0OTExNH0.9oc5PP4sNqkmZpTZJDvIQGf2-1c7WU-_AZQ0gBcNKCo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function wipeDatabase() {
  console.log("⚡ Fetching all students from Supabase...");
  const { data: students } = await supabase.from('students').select('*');
  console.log(`Found ${students?.length || 0} students.`);

  if (students && students.length > 0) {
    const sIds = students.map(s => s.id);
    console.log("Updating students to DELETED status...");
    const { error: updErr } = await supabase.from('students').update({ name: '[DELETED]', classroom: 'DELETED' }).in('id', sIds);
    if (updErr) console.error("updErr:", updErr);
    else console.log("✅ Successfully updated all students to DELETED!");
  }

  const { data: remainingStudents } = await supabase.from('students').select('*');
  console.log("Current Students in DB:", remainingStudents);
}

wipeDatabase();
