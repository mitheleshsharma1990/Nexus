
'use client'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        relative px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200
        ${pending
          ? 'bg-emerald-800/50 text-white/50 cursor-not-allowed border border-white/5'
          : 'bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] border border-emerald-400/20'
        }
      `}
    >
      <span className="flex items-center justify-center gap-2">
        {pending && (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {pending ? 'Creating...' : label}
      </span>
    </button>
  )
}