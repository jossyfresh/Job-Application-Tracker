// file: lib/uploadFile.ts
import { supabase } from "./supabase"

export async function uploadFile(file: File, userId: string, jobId: string, type: "cv" | "cover-letter") {
  const filePath = `${userId}/${jobId}/${type}-${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from("job-files")
    .upload(filePath, file, { upsert: true })

  if (error) throw error

  // Get public URL
  const { data: publicUrlData } = supabase.storage.from("job-files").getPublicUrl(filePath)
  return publicUrlData.publicUrl
}