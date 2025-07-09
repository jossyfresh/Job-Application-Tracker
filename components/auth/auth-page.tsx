"use client"

import { useState } from "react"
import { AuthForm } from "./auth-form"
import { Briefcase, TrendingUp, Users, Shield } from "lucide-react"

export function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin")

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Left side - Features */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Job Tracker
            </h1>
          </div>

          <h2 className="text-4xl font-bold text-slate-900 mb-6">Track Your Job Applications Like a Pro</h2>

          <p className="text-lg text-slate-600 mb-8">
            Organize, manage, and never miss a follow-up with our beautiful and intuitive job application tracker.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Track Progress</h3>
                <p className="text-slate-600">Monitor your applications from wishlist to offer</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Stay Organized</h3>
                <p className="text-slate-600">Keep all your job details in one place</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Secure & Private</h3>
                <p className="text-slate-600">Your data is protected and only visible to you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <AuthForm mode={mode} onToggleMode={toggleMode} />
      </div>
    </div>
  )
}
