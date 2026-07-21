"use client"

import * as React from "react"

import { MOCK_OWNED_PROJECTS, MOCK_SHARED_PROJECTS } from "@/lib/mock-projects"
import { slugify } from "@/lib/utils"
import type { Project } from "@/types/project"

type ProjectDialogState =
  | { type: null }
  | { type: "create" }
  | { type: "rename"; project: Project }
  | { type: "delete"; project: Project }

const MOCK_DELAY_MS = 400

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useProjectDialogs() {
  const [ownedProjects, setOwnedProjects] =
    React.useState<Project[]>(MOCK_OWNED_PROJECTS)
  const [sharedProjects] = React.useState<Project[]>(MOCK_SHARED_PROJECTS)
  const [dialog, setDialog] = React.useState<ProjectDialogState>({
    type: null,
  })
  const [name, setName] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const slug = React.useMemo(() => slugify(name), [name])

  const closeDialog = React.useCallback(() => {
    setDialog({ type: null })
    setName("")
    setIsLoading(false)
  }, [])

  const openCreateDialog = React.useCallback(() => {
    setName("")
    setDialog({ type: "create" })
  }, [])

  const openRenameDialog = React.useCallback((project: Project) => {
    setName(project.name)
    setDialog({ type: "rename", project })
  }, [])

  const openDeleteDialog = React.useCallback((project: Project) => {
    setDialog({ type: "delete", project })
  }, [])

  const confirmCreate = React.useCallback(async () => {
    const trimmedName = name.trim()
    if (!trimmedName) return

    setIsLoading(true)
    await wait(MOCK_DELAY_MS)

    setOwnedProjects((projects) => [
      ...projects,
      {
        id: crypto.randomUUID(),
        name: trimmedName,
        slug: slugify(trimmedName),
        isOwner: true,
      },
    ])
    closeDialog()
  }, [name, closeDialog])

  const confirmRename = React.useCallback(async () => {
    if (dialog.type !== "rename") return
    const trimmedName = name.trim()
    if (!trimmedName) return

    const { project } = dialog
    setIsLoading(true)
    await wait(MOCK_DELAY_MS)

    setOwnedProjects((projects) =>
      projects.map((p) =>
        p.id === project.id
          ? { ...p, name: trimmedName, slug: slugify(trimmedName) }
          : p
      )
    )
    closeDialog()
  }, [dialog, name, closeDialog])

  const confirmDelete = React.useCallback(async () => {
    if (dialog.type !== "delete") return
    const { project } = dialog

    setIsLoading(true)
    await wait(MOCK_DELAY_MS)

    setOwnedProjects((projects) => projects.filter((p) => p.id !== project.id))
    closeDialog()
  }, [dialog, closeDialog])

  return {
    ownedProjects,
    sharedProjects,
    dialog,
    name,
    slug,
    isLoading,
    setName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    confirmCreate,
    confirmRename,
    confirmDelete,
  }
}

export type UseProjectDialogsReturn = ReturnType<typeof useProjectDialogs>
