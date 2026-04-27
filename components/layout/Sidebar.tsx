import NavLink from '@/components/ui/NavLink';

export default function Sidebar() {
  const workspaceName = "Google";
  const teamName = "Google docs";
  return <div className="w-56 flex-none h-full m-4 p-4 border rounded-xl bg-[#3f3693]">
    <h1 className="text-2xl font-bold mb-4">Workspace: {workspaceName}</h1>
    <nav className="flex flex-col space-y-2">
      <NavLink href="/dashboard">My Issues Inbox</NavLink>
      <NavLink href="/team">Team: {teamName}</NavLink>
      <NavLink href="/issues">Issues</NavLink>
      <NavLink href="/cycles">Cycles</NavLink>
      <NavLink href="/projects">Projects</NavLink>
      <NavLink href="/roadmap">Roadmap</NavLink>
      <NavLink href="/settings">Settings</NavLink>
    </nav>
  </div>
}