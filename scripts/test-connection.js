// Test script to verify Supabase connection
// Run with: node scripts/test-connection.js

const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = "https://uzhtumuzysycntyiahnm.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6aHR1bXV6eXN5Y250eWlhaG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDQ0NjUsImV4cCI6MjA2NzU4MDQ2NX0.UoeWWPqEY2Pd4JlBXrelGOOZb3PX9LCO6O1viUAlEuw"

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log("🔍 Testing Supabase connection...")

  try {
    // Test basic connection
    const { data, error } = await supabase.from("jobs").select("count", { count: "exact", head: true })

    if (error) {
      if (error.code === "42P01") {
        console.log("❌ Tables not found. Please run the SQL script in Supabase.")
        console.log("📝 Go to: https://supabase.com/dashboard/project/uzhtumuzysycntyiahnm/sql")
        console.log("📋 Copy and paste the content from scripts/create-tables.sql")
      } else {
        console.log("❌ Connection error:", error.message)
      }
      return
    }

    console.log("✅ Connection successful!")
    console.log("✅ Database tables are set up correctly")
    console.log("🎉 Your Job Application Tracker is ready to use!")
  } catch (err) {
    console.log("❌ Unexpected error:", err.message)
  }
}

testConnection()
