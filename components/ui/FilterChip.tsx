"use client";

import { FilterChipProps } from "@/types/filters"



export default function FilterChip({ label, onDismiss }: FilterChipProps) {

  return <span className="inline-flex items-center 
  gap-x-2 px-3 py-1 bg-[#3e7a5d] text-[#e1f0e9] 
  text-sm font-medium rounded-md border border-[#4d8c6d]">
    {label}
    <button type="button" className="group -mr-1 p-0.5 hover:bg-[#4d8c6d] 
    rounded-sm transition-colors focus:outline-none" onClick={onDismiss}>
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
        strokeWidth="2.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span className="sr-only">x</span>
    </button>
  </span>


}