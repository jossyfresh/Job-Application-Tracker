"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface PdfViewerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  url: string
  title?: string
}

export function PdfViewerDialog({ open, onOpenChange, url, title }: PdfViewerDialogProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Focus iframe for accessibility
  useEffect(() => {
    if (open && iframeRef.current) {
      iframeRef.current.focus()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl h-[90vh] p-0 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="text-lg font-semibold truncate">{title || "PDF Viewer"}</div>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} aria-label="Close">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={url}
            title={title || "PDF"}
            className="w-full h-full border-0"
            tabIndex={0}
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
