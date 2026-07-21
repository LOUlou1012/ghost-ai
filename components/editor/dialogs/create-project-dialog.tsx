"use client"

import { EditorDialog } from "@/components/editor/editor-dialog"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateProjectDialog() {
  const { dialog, name, slug, isLoading, setName, closeDialog, confirmCreate } =
    useProjectDialogsContext()

  const open = dialog.type === "create"

  return (
    <EditorDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeDialog()
      }}
      title="Create Project"
      description="Start a new architecture workspace."
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          void confirmCreate()
        }}
      >
        <Input
          autoFocus
          placeholder="Project name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <p className="text-sm text-copy-muted">
          Slug: <span className="text-copy-primary">{slug || "—"}</span>
        </p>

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim() || isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </EditorDialog>
  )
}
