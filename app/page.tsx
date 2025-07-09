"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  Plus,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Archive,
  Target,
  AlertCircle,
  TrendingUp,
  Calendar,
  MapPin,
} from "lucide-react"
import { JobList } from "@/components/job-list"
import { AddJobDialog } from "@/components/add-job-dialog"
import { EditJobDialog } from "@/components/edit-job-dialog"
import { UserMenu } from "@/components/user-menu"
import { AuthPage } from "@/components/auth/auth-page"
import { useJobStore } from "@/lib/job-store"
import { useAuth } from "@/lib/auth-context"
import type { Job, JobStatus } from "@/lib/types"

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth()
  const { jobs, loading, error, loadJobs, clearJobs } = useJobStore()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)

  useEffect(() => {
    if (user) {
      loadJobs()
    } else {
      clearJobs()
    }
  }, [user, loadJobs, clearJobs])

  const getStatusStats = () => {
    const stats = {
      total: jobs.length,
      applied: jobs.filter((job) => job.status === "Applied").length,
      interview: jobs.filter((job) => job.status === "Interview").length,
      offer: jobs.filter((job) => job.status === "Offer").length,
      rejected: jobs.filter((job) => job.status === "Rejected").length,
      wishlist: jobs.filter((job) => job.status === "Wishlist").length,
    }
    return stats
  }

  const getUpcomingFollowUps = () => {
    const today = new Date()
    const upcoming = jobs.filter((job) => {
      if (!job.followUpDate) return false
      const followUpDate = new Date(job.followUpDate)
      const diffTime = followUpDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays >= 0 && diffDays <= 7
    })
    return upcoming
  }

  const getRecentApplications = () => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return jobs.filter((job) => new Date(job.dateApplied) >= sevenDaysAgo).length
  }

  const stats = getStatusStats()
  const upcomingFollowUps = getUpcomingFollowUps()
  const recentApplications = getRecentApplications()

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case "Wishlist":
        return <Target className="w-4 h-4" />
      case "Applied":
        return <Briefcase className="w-4 h-4" />
      case "Interview":
        return <Clock className="w-4 h-4" />
      case "Offer":
        return <CheckCircle className="w-4 h-4" />
      case "Rejected":
        return <XCircle className="w-4 h-4" />
      case "Archived":
        return <Archive className="w-4 h-4" />
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

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex items-center gap-3 px-6 py-4 border bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border-white/20">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="font-medium text-slate-700">Loading...</span>
        </div>
      </div>
    )
  }

  // Show auth page if user is not logged in
  if (!user) {
    return <AuthPage />
  }

  // Show loading screen while loading jobs
  if (loading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex items-center gap-3 px-6 py-4 border bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border-white/20">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="font-medium text-slate-700">Loading your job applications...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm border-white/20 shadow-soft">
        <div className="container px-6 py-6 mx-auto">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
                Job Application Tracker
              </h1>
              <p className="text-slate-600">Manage and track your job applications with style</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowAddDialog(true)}
                className="flex items-center gap-2 transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-medium hover:shadow-lg hover:scale-105"
                size="lg"
              >
                <Plus className="w-4 h-4" />
                Add Job
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-6 py-8 mx-auto">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50/80 backdrop-blur-sm animate-fade-in" variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <Card className="transition-all duration-200 bg-white/80 backdrop-blur-sm border-white/20 shadow-soft hover:shadow-medium hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <TrendingUp className="w-4 h-4" />
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
              <p className="mt-1 text-xs text-slate-500">All time</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 bg-white/80 backdrop-blur-sm border-white/20 shadow-soft hover:shadow-medium hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Target className="w-4 h-4" />
                Wishlist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-600">{stats.wishlist}</div>
              <p className="mt-1 text-xs text-slate-500">To apply</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 bg-white/80 backdrop-blur-sm border-white/20 shadow-soft hover:shadow-medium hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <Briefcase className="w-4 h-4" />
                Applied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.applied}</div>
              <p className="mt-1 text-xs text-blue-500">Pending response</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 bg-white/80 backdrop-blur-sm border-white/20 shadow-soft hover:shadow-medium hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-amber-600">
                <Clock className="w-4 h-4" />
                Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{stats.interview}</div>
              <p className="mt-1 text-xs text-amber-500">In progress</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 bg-white/80 backdrop-blur-sm border-white/20 shadow-soft hover:shadow-medium hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">{stats.offer}</div>
              <p className="mt-1 text-xs text-emerald-500">Success!</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 bg-white/80 backdrop-blur-sm border-white/20 shadow-soft hover:shadow-medium hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-red-600">
                <XCircle className="w-4 h-4" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
              <p className="mt-1 text-xs text-red-500">Keep trying</p>
            </CardContent>
          </Card>

          <Card className="text-white transition-all duration-200 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-soft hover:shadow-medium hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-indigo-100">
                <Calendar className="w-4 h-4" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{recentApplications}</div>
              <p className="mt-1 text-xs text-indigo-200">New applications</p>
            </CardContent>
          </Card>
        </div>

        {/* Follow-up Reminders */}
        {upcomingFollowUps.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-soft animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Clock className="w-5 h-5" />
                Upcoming Follow-ups
              </CardTitle>
              <CardDescription className="text-amber-700">
                Jobs that need follow-up within the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingFollowUps.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 transition-all duration-200 border bg-white/60 backdrop-blur-sm rounded-xl border-amber-200/50 hover:bg-white/80"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(job.status)}
                        <Badge variant="secondary" className={`${getStatusColor(job.status)} border`}>
                          {job.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {job.positionTitle} at {job.companyName}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Follow-up: {new Date(job.followUpDate!).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingJob(job)}
                      className="transition-colors hover:bg-amber-100 hover:border-amber-300"
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job List */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-soft">
          <CardHeader>
            <CardTitle className="text-slate-900">All Applications</CardTitle>
            <CardDescription className="text-slate-600">View and manage all your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <JobList onEditJob={setEditingJob} />
          </CardContent>
        </Card>
      </div>

      <AddJobDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      {editingJob && (
        <EditJobDialog job={editingJob} open={!!editingJob} onOpenChange={(open) => !open && setEditingJob(null)} />
      )}
    </div>
  )
}
