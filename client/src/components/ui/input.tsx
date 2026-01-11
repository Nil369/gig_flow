import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 selection:bg-blue-500/30 selection:text-gray-900 dark:selection:text-white h-11 w-full min-w-0 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
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

export { Input }
