"use client"

import { EditorDialog } from "@/components/editor/editor-dialog"
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RenameProjectDialog() {
  const { dialog, name, isLoading, setName, closeDialog, confirmRename } =
    useProjectDialogsContext()

  const open = dialog.type === "rename"
  const currentName = dialog.type === "rename" ? dialog.project.name : ""

  return (
    <EditorDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeDialog()
      }}
      title="Rename Project"
      description={`Rename "${currentName}".`}
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          void confirmRename()
        }}
      >
        <Input
          autoFocus
          placeholder="Project name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim() || isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </EditorDialog>
  )
}
