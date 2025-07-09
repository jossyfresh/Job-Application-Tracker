export type JobStatus = "Wishlist" | "Applied" | "Interview" | "Offer" | "Rejected" | "Archived"

export interface Job {
  id: string
  userId: string
  companyName: string
  positionTitle: string
  location: string
  emailUsed: string
  dateApplied: string
  source: string
  status: JobStatus
  followUpDate?: string
  notes: string
  cvUrl: string
  coverLetterUrl?: string
  createdAt: string
  updatedAt: string
}

export interface JobFormData {
  companyName: string
  positionTitle: string
  location: string
  emailUsed: string
  dateApplied: string
  source: string
  status: JobStatus
  followUpDate?: string
  notes: string
  cvUrl: string
  coverLetterUrl?: string
}

export interface DatabaseJob {
  id: string
  user_id: string
  company_name: string
  position_title: string
  location: string
  email_used: string
  date_applied: string
  source: string
  status: JobStatus
  follow_up_date?: string
  notes: string
  cv_url: string
  cover_letter_url?: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
}
