"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import type { Job, JobStatus } from "@/lib/types"

interface EditJobDialogProps {
  job: Job
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditJobDialog({ job, open, onOpenChange }: EditJobDialogProps) {
  const { updateJob } = useJobStore()
  const [formData, setFormData] = useState({
    companyName: "",
    positionTitle: "",
    location: "",
    emailUsed: "",
    dateApplied: "",
    source: "",
    status: "Wishlist" as JobStatus,
    followUpDate: "",
    notes: "",
  })

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName,
        positionTitle: job.positionTitle,
        location: job.location,
        emailUsed: job.emailUsed,
        dateApplied: job.dateApplied,
        source: job.source,
        status: job.status,
        followUpDate: job.followUpDate || "",
        notes: job.notes,
      })
    }
  }, [job])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.companyName || !formData.positionTitle) {
      alert("Please fill in company name and position title")
      return
    }

    updateJob(job.id, {
      companyName: formData.companyName,
      positionTitle: formData.positionTitle,
      dateApplied: formData.dateApplied,
      source: formData.source,
      status: formData.status,
      followUpDate: formData.followUpDate || undefined,
      notes: formData.notes,
      location: formData.location,
      emailUsed: formData.emailUsed,
    })

    onOpenChange(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Job Application</DialogTitle>
          <DialogDescription>Update the details of your job application.</DialogDescription>
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
                placeholder="e.g. Remote, New York, NY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailUsed">Email Used</Label>
              <Input
                id="emailUsed"
                type="email"
                value={formData.emailUsed}
                onChange={(e) => handleChange("emailUsed", e.target.value)}
                placeholder="e.g. example@gmail.com"
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Job Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
