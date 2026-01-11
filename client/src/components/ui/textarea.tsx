import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-gray-400 dark:placeholder:text-gray-500 selection:bg-blue-500/30 selection:text-gray-900 dark:selection:text-white min-h-24 w-full min-w-0 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-gray-900 shadow-sm transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        "hover:border-ring/60 dark:hover:border-ring/40",
        "focus:border-ring focus:ring-4 focus:ring-ring/10",
        "dark:bg-zinc-800 dark:border-zinc-700 dark:text-white",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
