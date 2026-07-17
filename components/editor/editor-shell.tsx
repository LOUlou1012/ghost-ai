"use client"

import * as React from "react"

import { EditorDialog } from "@/components/editor/editor-dialog"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

interface EditorShellProps {
  children: React.ReactNode
}

export function EditorShell({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <div className="flex h-full flex-col">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      <EditorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Dialog"
      />
    </div>
  )
}
