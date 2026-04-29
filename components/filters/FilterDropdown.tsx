"use client"

import { useState, useRef, useEffect } from "react"
import { FilterDropdownProps } from "@/types/filters"



export default function FilterDropdown(
  { label, options, selectedIds, onSelect, onDeselect }:
    FilterDropdownProps) {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const count = selectedIds.length
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])


  return <div ref={dropdownRef} className="relative">
    <button onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center gap-2 px-3 py-1.5 text-sm 
          border rounded-md transition-colors
          ${count > 0
          ? 'border-green-600 bg-green-950 text-green-300'
          : 'border-gray-600 bg-transparent text-gray-300 hover:border-gray-400'
        }`}
    >
      {label} {count > 0 && (
        <span className="bg-green-700 text-green-100 text-xs 
            px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )} {isOpen ? '▲' : '▼'}
    </button>
    {
      isOpen && <div
        className="absolute top-full left-0 mt-1 w-52 z-50
          bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
      >
        {
          options.map(option => {
            const isSelected = selectedIds.includes(option.id);
            return <button
              key={option.id}
              onClick={() => isSelected ? onDeselect(option.id) : onSelect(option.id)}
              className="flex items-center gap-2.5 w-full px-3 py-2 
                  text-sm text-gray-200 hover:bg-gray-800 transition-colors"
            >
              <div className={`w-4 h-4 border rounded flex items-center 
                  justify-center shrink-0 transition-colors
                  ${isSelected
                  ? 'bg-green-600 border-green-600'
                  : 'border-gray-500'
                }`}>
                {isSelected && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {option.label}
            </button>

          })}
      </div>
    }
  </div>
}