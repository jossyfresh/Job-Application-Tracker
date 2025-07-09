"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Search, Filter } from "lucide-react"
import { useJobStore } from "@/lib/job-store"
import type { Job, JobStatus } from "@/lib/types"


interface JobListProps {
  onEditJob: (job: Job) => void
}

export function JobList({ onEditJob }: JobListProps) {
  const { jobs, deleteJob } = useJobStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<JobStatus | "All">("All")
  const [sortBy, setSortBy] = useState<"dateApplied" | "companyName" | "positionTitle">("dateApplied")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const router = useRouter()

  const filteredAndSortedJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.positionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.emailUsed.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "All" || job.status === statusFilter

      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      let aValue: string | Date
      let bValue: string | Date

      switch (sortBy) {
        case "dateApplied":
          aValue = new Date(a.dateApplied)
          bValue = new Date(b.dateApplied)
          break
        case "companyName":
          aValue = a.companyName.toLowerCase()
          bValue = b.companyName.toLowerCase()
          break
        case "positionTitle":
          aValue = a.positionTitle.toLowerCase()
          bValue = b.positionTitle.toLowerCase()
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [jobs, searchTerm, statusFilter, sortBy, sortOrder])

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "Wishlist":
        return "bg-gray-100 text-gray-800"
      case "Applied":
        return "bg-blue-100 text-blue-800"
      case "Interview":
        return "bg-yellow-100 text-yellow-800"
      case "Offer":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Archived":
        return "bg-gray-100 text-gray-600"
    }
  }

  const handleDelete = (job: Job) => {
    if (confirm(`Are you sure you want to delete the application for ${job.positionTitle} at ${job.companyName}?`)) {
      deleteJob(job.id)
    }
  }

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <Input
            placeholder="Search by company, position, location, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as JobStatus | "All")}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Wishlist">Wishlist</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => {
              const [field, order] = value.split("-")
              setSortBy(field as typeof sortBy)
              setSortOrder(order as "asc" | "desc")
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateApplied-desc">Date (Newest)</SelectItem>
              <SelectItem value="dateApplied-asc">Date (Oldest)</SelectItem>
              <SelectItem value="companyName-asc">Company (A-Z)</SelectItem>
              <SelectItem value="companyName-desc">Company (Z-A)</SelectItem>
              <SelectItem value="positionTitle-asc">Position (A-Z)</SelectItem>
              <SelectItem value="positionTitle-desc">Position (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredAndSortedJobs.length} of {jobs.length} applications
      </div>

      {/* Job Table */}
      <div className="overflow-hidden border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSort("companyName")}> 
                Company {sortBy === "companyName" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSort("positionTitle")}> 
                Position {sortBy === "positionTitle" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Email Used</TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => toggleSort("dateApplied")}> 
                Date Applied {sortBy === "dateApplied" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Follow-up</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-gray-500">
                  {jobs.length === 0
                    ? "No job applications yet. Add your first application!"
                    : "No applications match your search criteria."}
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedJobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => router.push(`/job/${job.id}`)}
                >
                  <TableCell className="font-medium">{job.companyName}</TableCell>
                  <TableCell>{job.positionTitle}</TableCell>
                  <TableCell>{job.location || "-"}</TableCell>
                  <TableCell>{job.emailUsed || "-"}</TableCell>
                  <TableCell>{new Date(job.dateApplied).toLocaleDateString()}</TableCell>
                  <TableCell>{job.source}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {job.followUpDate ? (
                      <span
                        className={`text-sm ${
                          new Date(job.followUpDate) < new Date()
                            ? "text-red-600 font-medium"
                            : new Date(job.followUpDate).getTime() - new Date().getTime() <= 7 * 24 * 60 * 60 * 1000
                              ? "text-yellow-600 font-medium"
                              : "text-gray-600"
                        }`}
                      >
                        {new Date(job.followUpDate).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditJob(job)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(job)} className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

