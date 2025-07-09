"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useJobStore } from "@/lib/job-store"
import type { JobStatus } from "@/lib/types"
import { uploadFile } from "@/lib/uploadFile"

interface AddJobDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddJobDialog({ open, onOpenChange }: AddJobDialogProps) {
  const { addJob } = useJobStore()
  const [formData, setFormData] = useState({
    companyName: "",
    positionTitle: "",
    location: "",
    emailUsed: "",
    dateApplied: new Date().toISOString().split("T")[0],
    source: "",
    status: "Wishlist" as JobStatus,
    followUpDate: "",
    notes: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.companyName || !formData.positionTitle) {
      alert("Please fill in company name and position title")
      return
    }

    setUploading(true)
    try {
      // Get userId for file path
      const user = (await import("@/lib/supabase")).supabase.auth.getUser && (await (await import("@/lib/supabase")).supabase.auth.getUser()).data.user
      const userId = user?.id || "anonymous"
      const jobId = `${Date.now()}` // temp id for file path uniqueness

      let cvUrl = ""
      let coverLetterUrl = undefined

      if (cvFile) {
        cvUrl = await uploadFile(cvFile, userId, jobId, "cv")
      }
      if (coverLetterFile) {
        coverLetterUrl = await uploadFile(coverLetterFile, userId, jobId, "cover-letter")
      }

      await addJob({
        companyName: formData.companyName,
        positionTitle: formData.positionTitle,
        dateApplied: formData.dateApplied,
        source: formData.source,
        status: formData.status,
        followUpDate: formData.followUpDate || undefined,
        notes: formData.notes,
        location: formData.location,
        emailUsed: formData.emailUsed,
        cvUrl,
        coverLetterUrl,
      })

      // Reset form
      setFormData({
        companyName: "",
        positionTitle: "",
        location: "",
        emailUsed: "",
        dateApplied: new Date().toISOString().split("T")[0],
        source: "",
        status: "Wishlist",
        followUpDate: "",
        notes: "",
      })
      setCvFile(null)
      setCoverLetterFile(null)
      onOpenChange(false)
    } catch (err) {
      alert("Failed to add job or upload files.")
    } finally {
      setUploading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Job Application</DialogTitle>
          <DialogDescription>Add a new job application to track your progress.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                placeholder="e.g. Google"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="positionTitle">Position Title *</Label>
              <Input
                id="positionTitle"
                value={formData.positionTitle}
                onChange={(e) => handleChange("positionTitle", e.target.value)}
                placeholder="e.g. Software Engineer"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailUsed">Email Used</Label>
              <Input
                id="emailUsed"
                type="email"
                value={formData.emailUsed}
                onChange={(e) => handleChange("emailUsed", e.target.value)}
                placeholder="e.g. john.doe@gmail.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateApplied">Date Applied</Label>
              <Input
                id="dateApplied"
                type="date"
                value={formData.dateApplied}
                onChange={(e) => handleChange("dateApplied", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => handleChange("source", e.target.value)}
                placeholder="e.g. LinkedIn, Indeed, Company Website"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wishlist">Wishlist</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
                value={formData.followUpDate}
                onChange={(e) => handleChange("followUpDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add any notes about this application..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cvFile">CV (PDF)</Label>
              <Input
                id="cvFile"
                type="file"
                accept="application/pdf"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverLetterFile">Cover Letter (PDF, optional)</Label>
              <Input
                id="coverLetterFile"
                type="file"
                accept="application/pdf"
                onChange={(e) => setCoverLetterFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Add Job Application"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
