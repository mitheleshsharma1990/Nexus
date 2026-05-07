

"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { IssueWithRelations } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation'
type NavigationContextType = {
  isNavigating: boolean;
  optimisticIssue: IssueWithRelations | null;
  startNavigation: (issue: IssueWithRelations) => void;
  endNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  optimisticIssue: null,
  startNavigation: () => { },
  endNavigation: () => { },
})

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const [optimisticIssue, setOptimisticIssue] = useState<IssueWithRelations | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousUrl = useRef(`${pathname}?${searchParams.toString()}`)


  useEffect(() => {
    const currentUrl = `${pathname}?${searchParams.toString()}`
    if (currentUrl !== previousUrl.current) {
      previousUrl.current = currentUrl
      setIsNavigating(false)   // navigation complete
      console.log('URL changed, setting isNavigating to false')
    }

  }, [pathname, searchParams])

  const startNavigation = (issue: IssueWithRelations) => {
    setOptimisticIssue(issue)
    setIsNavigating(true)
  }
  const endNavigation = () => {
    setOptimisticIssue(null)
    setIsNavigating(false)
  }

  return <NavigationContext.Provider
    value={{ isNavigating, optimisticIssue, startNavigation, endNavigation }}>
    {children}
  </NavigationContext.Provider>
}

export const useNavigation = () => useContext(NavigationContext)