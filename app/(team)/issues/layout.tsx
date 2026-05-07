import { NavigationProvider } from "@/context/NavigationContext";



export default function IssuesLayout({ children }: { children: React.ReactNode }) {
  return <NavigationProvider>
    {children}
  </NavigationProvider>
}