import { cn } from "@/lib/utils"
import * as React from "react"

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-4xl font-bold tracking-tight", className)} {...props} />
}

export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-3xl font-semibold tracking-tight", className)} {...props} />
}

export function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-semibold tracking-tight", className)} {...props} />
}

export function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-muted-foreground text-sm", className)} {...props} />
}
