"use client"

import { FolderOpen, Plus, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      className={cn(
        "absolute inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-subtle-border bg-surface/95 shadow-2xl backdrop-blur-sm transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-subtle-border px-4">
        <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        defaultValue="my-projects"
        className="flex flex-1 flex-col overflow-hidden px-4 pt-3"
      >
        <TabsList className="w-full">
          <TabsTrigger value="my-projects" className="flex-1">
            My Projects
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">
            Shared
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="my-projects"
          className="mt-2 flex flex-1 flex-col items-center justify-center gap-2 text-center"
        >
          <FolderOpen className="h-8 w-8 text-copy-faint" />
          <p className="text-sm text-copy-muted">No projects yet</p>
        </TabsContent>

        <TabsContent
          value="shared"
          className="mt-2 flex flex-1 flex-col items-center justify-center gap-2 text-center"
        >
          <Users className="h-8 w-8 text-copy-faint" />
          <p className="text-sm text-copy-muted">No shared projects yet</p>
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-subtle-border p-4">
        <Button className="w-full">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
