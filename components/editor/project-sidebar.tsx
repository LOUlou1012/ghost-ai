"use client"

import { FolderOpen, MoreVertical, Pencil, Plus, Trash2, Users, X } from "lucide-react"

import { useProjectDialogsContext } from "@/components/editor/project-dialogs-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/project"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function ProjectRow({ project }: { project: Project }) {
  const { openRenameDialog, openDeleteDialog } = useProjectDialogsContext()

  return (
    <div className="group flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 hover:bg-subtle">
      <span className="truncate text-sm text-copy-primary">
        {project.name}
      </span>

      {project.isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100"
              aria-label={`Actions for ${project.name}`}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openRenameDialog(project)}>
              <Pencil className="h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => openDeleteDialog(project)}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const { ownedProjects, sharedProjects, openCreateDialog } =
    useProjectDialogsContext()

  return (
    <>
      <div
        className={cn(
          "absolute inset-0 z-30 bg-black/50 transition-opacity duration-200 md:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

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
            className="mt-2 flex flex-1 flex-col overflow-y-auto"
          >
            {ownedProjects.length > 0 ? (
              <div className="flex flex-col gap-0.5">
                {ownedProjects.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <FolderOpen className="h-8 w-8 text-copy-faint" />
                <p className="text-sm text-copy-muted">No projects yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="shared"
            className="mt-2 flex flex-1 flex-col overflow-y-auto"
          >
            {sharedProjects.length > 0 ? (
              <div className="flex flex-col gap-0.5">
                {sharedProjects.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <Users className="h-8 w-8 text-copy-faint" />
                <p className="text-sm text-copy-muted">No shared projects yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="shrink-0 border-t border-subtle-border p-4">
          <Button className="w-full" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
