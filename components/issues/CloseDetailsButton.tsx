"use client";

import { useSearchParams, useRouter } from 'next/navigation'

export default function CloseDetailsButton() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('issueId')
    router.push(`/issues?${params.toString()}`)
  }
  return (
    <button
      onClick={handleClose}
      className="absolute top-6 right-6 flex items-center justify-center w-9 h-9 rounded-full 
             text-zinc-300 hover:text-white 
             hover:bg-[#4f4d47] active:bg-[#5a5851] 
             transition-all duration-200"
    >
      <svg
        xmlns="http://w3.org"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        className="size-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>


  )
}