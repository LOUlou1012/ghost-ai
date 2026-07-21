"use client"

import * as React from "react"

import {
  useProjectDialogs,
  type UseProjectDialogsReturn,
} from "@/hooks/use-project-dialogs"

const ProjectDialogsContext =
  React.createContext<UseProjectDialogsReturn | null>(null)

export function ProjectDialogsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const value = useProjectDialogs()

  return (
    <ProjectDialogsContext.Provider value={value}>
      {children}
    </ProjectDialogsContext.Provider>
  )
}

export function useProjectDialogsContext() {
  const context = React.useContext(ProjectDialogsContext)
  if (!context) {
    throw new Error(
      "useProjectDialogsContext must be used within a ProjectDialogsProvider"
    )
  }
  return context
}
