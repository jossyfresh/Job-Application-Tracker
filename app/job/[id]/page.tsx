"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useJobStore } from "@/lib/job-store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PdfViewerDialog } from "@/components/pdf-viewer-dialog"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Mail,
  Calendar,
  Globe,
  Clock,
  FileText,
  Eye,
  Briefcase,
  Target,
  CheckCircle,
  XCircle,
  Archive,
  Loader2,
} from "lucide-react"
import type { Job, JobStatus } from "@/lib/types"

export default function JobDetailPage() {
  const router = useRouter()
  const jobId = typeof window !== "undefined" ? window.location.pathname.split("/").filter(Boolean).pop() || "" : ""

  const { jobs, loadJobs, loading } = useJobStore()
  const [job, setJob] = useState<Job | null>(null)
  const [pdfDialog, setPdfDialog] = useState<{ open: boolean; url: string; title: string }>({
    open: false,
    url: "",
    title: "",
  })

  useEffect(() => {
    if (!jobs.length) {
      loadJobs()
    }
    if (jobId) {
      const found = jobs.find((j) => j.id === jobId)
      setJob(found || null)
    }
  }, [jobs, jobId, loadJobs])

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case "Wishlist":
        return <Target className="w-5 h-5" />
      case "Applied":
        return <Briefcase className="w-5 h-5" />
      case "Interview":
        return <Clock className="w-5 h-5" />
      case "Offer":
        return <CheckCircle className="w-5 h-5" />
      case "Rejected":
        return <XCircle className="w-5 h-5" />
      case "Archived":
        return <Archive className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "Wishlist":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "Applied":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Interview":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Offer":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200"
      case "Archived":
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isFollowUpOverdue = (followUpDate: string) => {
    return new Date(followUpDate) < new Date()
  }

  const isFollowUpSoon = (followUpDate: string) => {
    const followUp = new Date(followUpDate)
    const today = new Date()
    const diffTime = followUp.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 7
  }

  if (loading || !job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex items-center gap-3 px-6 py-4 border bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border-white/20">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="font-medium text-slate-700">Loading job details...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm border-white/20 shadow-soft">
        <div className="container px-6 py-6 mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="transition-colors hover:bg-white/60"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="w-px h-6 bg-slate-200" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Job Application Details</h1>
              <p className="text-slate-600">View and manage your application</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl px-6 py-8 mx-auto">
        {/* Main Job Card */}
        <Card className="mb-8 overflow-hidden bg-white/80 backdrop-blur-sm border-white/20 shadow-soft">
          {/* Header Section */}
          <div className="p-8 text-white bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{job.positionTitle}</h1>
                <div className="flex items-center gap-2 text-blue-100">
                  <Building2 className="w-5 h-5" />
                  <span className="text-xl">{job.companyName}</span>
                </div>
                {job.location && (
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                )}
              </div>
              <Badge
                variant="secondary"
                className={`${getStatusColor(job.status)} border text-sm px-3 py-1 font-medium`}
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(job.status)}
                  {job.status}
                </div>
              </Badge>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Key Information Grid */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 border bg-slate-50 rounded-xl border-slate-200">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Date Applied</p>
                    <p className="font-semibold text-slate-900">{formatDate(job.dateApplied)}</p>
                  </div>
                </div>

                {job.emailUsed && (
                  <div className="flex items-center gap-3 p-4 border bg-slate-50 rounded-xl border-slate-200">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Email Used</p>
                      <p className="font-semibold text-slate-900">{job.emailUsed}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {job.source && (
                  <div className="flex items-center gap-3 p-4 border bg-slate-50 rounded-xl border-slate-200">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Source</p>
                      <p className="font-semibold text-slate-900">{job.source}</p>
                    </div>
                  </div>
                )}

                {job.followUpDate && (
                  <div className="flex items-center gap-3 p-4 border bg-slate-50 rounded-xl border-slate-200">
                    <div
                      className={`p-2 rounded-lg ${
                        isFollowUpOverdue(job.followUpDate)
                          ? "bg-red-100"
                          : isFollowUpSoon(job.followUpDate)
                            ? "bg-amber-100"
                            : "bg-blue-100"
                      }`}
                    >
                      <Clock
                        className={`h-5 w-5 ${
                          isFollowUpOverdue(job.followUpDate)
                            ? "text-red-600"
                            : isFollowUpSoon(job.followUpDate)
                              ? "text-amber-600"
                              : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">Follow-up Date</p>
                      <p
                        className={`font-semibold ${
                          isFollowUpOverdue(job.followUpDate)
                            ? "text-red-600"
                            : isFollowUpSoon(job.followUpDate)
                              ? "text-amber-600"
                              : "text-slate-900"
                        }`}
                      >
                        {formatDate(job.followUpDate)}
                        {isFollowUpOverdue(job.followUpDate) && (
                          <span className="ml-2 text-sm font-normal">(Overdue)</span>
                        )}
                        {isFollowUpSoon(job.followUpDate) && !isFollowUpOverdue(job.followUpDate) && (
                          <span className="ml-2 text-sm font-normal">(Soon)</span>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Documents Section */}
            {(job.cvUrl || job.coverLetterUrl) && (
              <>
                <Separator className="my-8" />
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                    <FileText className="w-5 h-5" />
                    Documents
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {job.cvUrl && (
                      <Card className="p-4 transition-shadow border-2 border-dashed cursor-pointer hover:shadow-medium border-slate-200 hover:border-blue-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">CV / Resume</p>
                              <p className="text-sm text-slate-600">Click to view</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPdfDialog({ open: true, url: job.cvUrl!, title: "CV" })}
                            className="hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    )}

                    {job.coverLetterUrl && (
                      <Card className="p-4 transition-shadow border-2 border-dashed cursor-pointer hover:shadow-medium border-slate-200 hover:border-green-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <FileText className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">Cover Letter</p>
                              <p className="text-sm text-slate-600">Click to view</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setPdfDialog({ open: true, url: job.coverLetterUrl!, title: "Cover Letter" })
                            }
                            className="hover:bg-green-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Notes Section */}
            {job.notes && (
              <>
                <Separator className="my-8" />
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900">Notes</h3>
                  <div className="p-6 border bg-slate-50 rounded-xl border-slate-200">
                    <p className="leading-relaxed whitespace-pre-wrap text-slate-700">{job.notes}</p>
                  </div>
                </div>
              </>
            )}

            {/* Timeline Footer */}
            <Separator className="my-8" />
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-4">
                <span>Created: {formatDate(job.createdAt)}</span>
                {job.updatedAt !== job.createdAt && <span>Updated: {formatDate(job.updatedAt)}</span>}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Application ID: {job.id.slice(0, 8)}...</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <Button
            onClick={() => router.back()}
            className="px-8 transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-medium hover:shadow-lg hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <PdfViewerDialog
        open={pdfDialog.open}
        onOpenChange={(open) => setPdfDialog((prev) => ({ ...prev, open }))}
        url={pdfDialog.url}
        title={pdfDialog.title}
      />
    </div>
  )
}
