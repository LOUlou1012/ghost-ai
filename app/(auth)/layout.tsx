import { Ghost } from "lucide-react"
import type { ReactNode } from "react"

const FEATURES = [
  "Describe a system in plain English and get an instant architecture",
  "Collaborate on a shared canvas in real time",
  "Generate a technical spec from your finished design",
]

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-base">
      <div className="hidden w-1/2 flex-col justify-center border-r border-surface-border px-16 lg:flex">
        <div className="flex items-center gap-2">
          <Ghost className="h-6 w-6 text-brand" />
          <span className="text-lg font-medium text-copy-primary">
            Ghost AI
          </span>
        </div>
        <p className="mt-4 text-copy-secondary">
          Describe a system. Watch it take shape.
        </p>
        <ul className="mt-10 space-y-3 text-sm text-copy-muted">
          {FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  )
}
