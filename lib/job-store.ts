"use client"

import { create } from "zustand"
import { supabase } from "./supabase"
import type { Job, JobFormData, DatabaseJob } from "./types"

interface JobStore {
  jobs: Job[]
  loading: boolean
  error: string | null
  loadJobs: () => Promise<void>
  addJob: (jobData: JobFormData) => Promise<void>
  updateJob: (id: string, jobData: JobFormData) => Promise<void>
  deleteJob: (id: string) => Promise<void>
  clearJobs: () => void
}

// Helper function to convert database format to app format
const convertFromDatabase = (dbJob: DatabaseJob): Job => ({
  id: dbJob.id,
  userId: dbJob.user_id,
  companyName: dbJob.company_name,
  positionTitle: dbJob.position_title,
  location: dbJob.location,
  emailUsed: dbJob.email_used,
  dateApplied: dbJob.date_applied,
  source: dbJob.source,
  status: dbJob.status,
  followUpDate: dbJob.follow_up_date,
  notes: dbJob.notes,
  cvUrl: dbJob.cv_url,
  coverLetterUrl: dbJob.cover_letter_url,
  createdAt: dbJob.created_at,
  updatedAt: dbJob.updated_at,
})

// Helper function to convert app format to database format
const convertToDatabase = (job: JobFormData) => ({
  company_name: job.companyName,
  position_title: job.positionTitle,
  location: job.location,
  email_used: job.emailUsed,
  date_applied: job.dateApplied,
  source: job.source,
  status: job.status,
  follow_up_date: job.followUpDate || null,
  notes: job.notes,
  cv_url: job.cvUrl,
  cover_letter_url: job.coverLetterUrl || null,
})

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  loading: false,
  error: null,

  loadJobs: async () => {
    set({ loading: true, error: null })

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        set({ jobs: [], loading: false })
        return
      }

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("date_applied", { ascending: false })

      if (error) throw error

      const jobs = (data as DatabaseJob[]).map(convertFromDatabase)
      set({ jobs, loading: false })
    } catch (error) {
      console.error("Error loading jobs:", error)
      set({ error: "Failed to load jobs", loading: false })
    }
  },

  addJob: async (jobData: JobFormData) => {
    set({ loading: true, error: null })

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("User not authenticated")
      }

      const { data, error } = await supabase
        .from("jobs")
        .insert([{ ...convertToDatabase(jobData), user_id: user.id }])
        .select()
        .single()

      if (error) throw error

      const newJob = convertFromDatabase(data as DatabaseJob)
      set({
        jobs: [newJob, ...get().jobs],
        loading: false,
      })
    } catch (error) {
      console.error("Error adding job:", error)
      set({ error: "Failed to add job", loading: false })
      throw error
    }
  },

  updateJob: async (id: string, jobData: JobFormData) => {
    set({ loading: true, error: null })

    try {
      const { data, error } = await supabase
        .from("jobs")
        .update(convertToDatabase(jobData))
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      const updatedJob = convertFromDatabase(data as DatabaseJob)
      const updatedJobs = get().jobs.map((job) => (job.id === id ? updatedJob : job))

      set({ jobs: updatedJobs, loading: false })
    } catch (error) {
      console.error("Error updating job:", error)
      set({ error: "Failed to update job", loading: false })
      throw error
    }
  },

  deleteJob: async (id: string) => {
    set({ loading: true, error: null })

    try {
      const { error } = await supabase.from("jobs").delete().eq("id", id)

      if (error) throw error

      const updatedJobs = get().jobs.filter((job) => job.id !== id)
      set({ jobs: updatedJobs, loading: false })
    } catch (error) {
      console.error("Error deleting job:", error)
      set({ error: "Failed to delete job", loading: false })
      throw error
    }
  },

  clearJobs: () => {
    set({ jobs: [], loading: false, error: null })
  },
}))
