import type { Project } from "@/types/project"

export const MOCK_OWNED_PROJECTS: Project[] = [
  {
    id: "owned-1",
    name: "Checkout Service Redesign",
    slug: "checkout-service-redesign",
    isOwner: true,
  },
  {
    id: "owned-2",
    name: "Realtime Notifications",
    slug: "realtime-notifications",
    isOwner: true,
  },
]

export const MOCK_SHARED_PROJECTS: Project[] = [
  {
    id: "shared-1",
    name: "Payments Platform",
    slug: "payments-platform",
    isOwner: false,
  },
]
