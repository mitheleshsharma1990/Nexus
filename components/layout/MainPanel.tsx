export default function MainPanel({ children }: { children: React.ReactNode }) {
  return <div className="h-full w-3/6 m-4 p-4 border rounded-xl bg-[#224b3a]">
    <h1 className="text-2xl font-bold mb-4">Issues</h1>
    <ul className=" rounded-xl flex flex-row gap-1 mb-2">
      <li className="px-3 py-.5 rounded text-white bg-[#2D6A4F]">List</li>
      <li className="px-3 py-.5 bg-[#344E41] rounded text-white">Board</li>
      <li className="px-3 py-.5 bg-[#344E41] rounded text-white">Roadmap</li>
    </ul>
    {children}
  </div>
}