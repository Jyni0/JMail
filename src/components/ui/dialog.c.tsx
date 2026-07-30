import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{
  open: boolean
  setOpen: (v: boolean) => void
} | null>(null)

export function Dialog({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (v: boolean) => void
  children: React.ReactNode
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const setOpen = onOpenChange || setUncontrolledOpen

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ctx = React.useContext(DialogContext)
  return (
    <div className={cn("inline-block cursor-pointer", className)} onClick={() => ctx?.setOpen(true)}>
      {children}
    </div>
  )
}

const dialogVariants = cva(
  "fixed z-50 grid w-full max-w-lg gap-4 bg-background p-4 rounded-2xl border transition-all duration-150 ease-out",
  {
    variants: {
      position: {
        center: "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2",
        "top-left": "left-4 top-4",
        "top-right": "right-4 top-4",
        "bottom-left": "left-4 bottom-4",
        "bottom-right": "right-4 bottom-4",
      },
    },
    defaultVariants: { position: "center" },
  }
)

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {
  hideClose?: boolean
  hasOverlay?: boolean
  preventCloseOutside?: boolean
}

export function DialogContent({
  className,
  position,
  children,
  hideClose = false,
  hasOverlay = true,
  preventCloseOutside = false,
  ...props
}: DialogContentProps) {
  const ctx = React.useContext(DialogContext)
  if (!ctx) throw new Error("DialogContent must be used within a Dialog")

  const { open, setOpen } = ctx
  const [mounted, setMounted] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => setIsClient(true), [])

  React.useEffect(() => {
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    } else {
      setVisible(false)
      const timer = setTimeout(() => setMounted(false), 150)
      return () => clearTimeout(timer)
    }
  }, [open])

  if (!isClient || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 pointer-events-none">
      {hasOverlay && (
        <div
          onClick={() => {
            if (!preventCloseOutside) setOpen(false)
          }}
          className={cn(
            "fixed inset-0 bg-background/80 pointer-events-auto transition-opacity duration-150 ease-out",
            visible ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      <div
        className={cn(
          dialogVariants({ position }),
          "pointer-events-auto",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className
        )}
        {...props}
      >
        {children}

        {!hideClose && (
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
DialogTitle.displayName = "DialogTitle"

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = "DialogDescription"
