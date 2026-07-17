import { dark } from "@clerk/ui/themes"

export const clerkAppearance = {
  theme: dark,
  variables: {
    colorPrimary: "var(--accent-primary)",
    colorPrimaryForeground: "var(--bg-base)",
    colorBackground: "var(--bg-surface)",
    colorForeground: "var(--text-primary)",
    colorInput: "var(--bg-elevated)",
    colorInputForeground: "var(--text-primary)",
    colorNeutral: "var(--text-secondary)",
    colorMutedForeground: "var(--text-muted)",
    colorBorder: "var(--border-default)",
    colorDanger: "var(--state-error)",
    colorSuccess: "var(--state-success)",
    colorWarning: "var(--state-warning)",
    colorShadow: "var(--bg-base)",
    fontFamily: "var(--font-geist-sans)",
    fontFamilyMono: "var(--font-geist-mono)",
    borderRadius: "var(--radius)",
  },
}
