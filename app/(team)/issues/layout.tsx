import { NavigationProvider } from "@/context/NavigationContext";
import { Suspense } from "react";

export default function IssuesLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>Loading...</div>}>
    <NavigationProvider>
      {children}
    </NavigationProvider>
  </Suspense>
}