"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink(
  { href, children }: Readonly<
    { href: string, children: React.ReactNode }>) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return <Link
    className={`p-2  rounded-md text-white ${isActive ? 'bg-[#4F4391]' : 'bg-[#584B9E]'} `}
    href={href}>{children}</Link>
}