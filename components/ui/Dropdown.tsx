




import { ChangeEvent } from "react";

export default function Dropdown({ label, options, name, required = false, onChange, value }:
  {
    label: string;
    options: { id: string; name: string }[];
    name: string;
    required: boolean;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void,
    value?: string
  }) {
  return <div className="flex flex-col gap-1.5">
    <label htmlFor={name}
      className="text-sm font-medium text-emerald-100/70">
      {label}{required && <span className="text-red-500">*</span>}
    </label>
    <select name={name} onChange={onChange} value={value}
      className="bg-[#1a3a2d] border border-white/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none">
      <option value="">Select {label}</option>
      {options.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
    </select>
  </div>
}