"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner"

export interface ConfirmationBoxProps {
  /** The element that triggers the dialog */
  trigger?: React.ReactNode
  /** Title of the confirmation dialog */
  title: string
  /** Description or message displayed in the dialog */
  description: string
  /** Function called when user confirms */
  onConfirm: () => void | Promise<void>
  /** Optional function called when user cancels */
  onCancel?: () => void
  /** Text for the confirm button */
  confirmText?: string
  /** Text for the cancel button */
  cancelText?: string
  /** Whether the confirm action is in progress (shows loading state) */
  isLoading?: boolean
  /** Whether to use destructive styling for confirm button */
  variant?: "default" | "destructive" | "secondary"
  /** Whether the dialog is open (controlled mode) */
  open?: boolean
  /** Callback when open state changes (controlled mode) */
  onOpenChange?: (open: boolean) => void
  /** Additional className for the dialog content */
  className?: string
}

/**
 * Reusable confirmation dialog component
 * 
 * @example
 * ```tsx
 * <ConfirmationBox
 *   trigger={<Button>Delete</Button>}
 *   title="Delete item?"
 *   description="This action cannot be undone."
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   variant="destructive"
 *   onConfirm={handleDelete}
 * />
 * ```
 */
export function ConfirmationBox({
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "default",
  open,
  onOpenChange,
  className,
}: Readonly<ConfirmationBoxProps>) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [confirmed, setConfirmed] = React.useState(false)
  // Use controlled mode if open prop is provided
  const isControlled = open !== undefined
  const dialogOpen = isControlled ? open : internalOpen

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!isControlled) setInternalOpen(newOpen)
    onOpenChange?.(newOpen)
    if (!newOpen) setConfirmed(false)
  }, [isControlled, onOpenChange])

  // Only setConfirmed if not loading
  const handleConfirm = React.useCallback(async (event?: React.SyntheticEvent) => {
    // Prevent auto-close by default
    if (event) event.preventDefault();
    setConfirmed(true)
    try {
      await onConfirm()
      // Do not close here; close is handled by effect below
    } catch (error) {
      setConfirmed(false)
      console.error("Confirmation action failed:", error)
    }
  }, [onConfirm])

  // Close dialog only after loading turns false and confirmed was triggered
  React.useEffect(() => {
    if (confirmed && !isLoading && dialogOpen) {
      handleOpenChange(false)
      setConfirmed(false)
    }
  }, [confirmed, isLoading, dialogOpen, handleOpenChange])

  const handleCancel = React.useCallback(() => {
    if (isLoading) return // prevent cancel while loading
    onCancel?.()
    handleOpenChange(false)
  }, [onCancel, handleOpenChange, isLoading])

  const confirmButtonClassName = variant === "destructive"
    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
    : "bg-secondary text-destructive-foreground hover:bg-secondary/90"

  return (
    <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-primary/5 hover:text-inherit" onClick={handleCancel} disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={confirmButtonClassName}
            disabled={isLoading}
            asChild={true}
          >
            <button type="button">
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner className="size-4" />
                  Processing...
                </span>
              ) : (
                confirmText
              )}
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

