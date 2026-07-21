"use client"

import { EditorDialog } from "@/components/editor/editor-dialog"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-provider"
import { Button } from "@/components/ui/button"

export function DeleteProjectDialog() {
  const { dialog, isLoading, closeDialog, confirmDelete } =
    useProjectDialogsContext()

  const open = dialog.type === "delete"
  const projectName = dialog.type === "delete" ? dialog.project.name : ""

  return (
    <EditorDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeDialog()
      }}
      title="Delete Project"
      description={`This will permanently delete "${projectName}". This action cannot be undone.`}
      footer={
        <>
          <Button variant="ghost" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={() => void confirmDelete()}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </>
      }
    />
  )
}
