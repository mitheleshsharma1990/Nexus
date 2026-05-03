"use client";

import { useState, useEffect } from "react";
import { CreateIssueInput, createIssue } from "@/lib/actions/issues"
import { Priority } from "@/types";
import ModalPortal from "../ui/ModalPortal";
import SubmitButton from "../ui/SubmitButton";

export default function NewIssueForm({ statuses, users, projectIds, cycleIds, onClose }: {
  statuses: { id: string, name: string }[],
  users: { id: string, name: string }[],
  projectIds: { id: string, name: string }[],
  cycleIds?: { id: string, name: string }[],
  onClose: () => void
}) {

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 1000);
    return () => clearTimeout(timer);
  }, [error])
  const formAction = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as Priority;
    const statusId = formData.get("statusId") as string;
    const assigneeIds = formData.getAll("assigneeIds") as string[];
    const cycleId = formData.get("cycleId") as string;
    const projectId = formData.get("projectId") as string;

    const input: CreateIssueInput = {
      title,
      description,
      priority,
      statusId,
      assigneeIds,
      cycleId,
      projectId
    };

    const result = await createIssue(input);

    if (!result.success) {
      setError(result.error);
      return;
    }
    setError("");
    onClose();
  }

  return <ModalPortal onClose={onClose}>
    <form action={formAction} className="flex flex-col bg-[#224b3a] border border-white/10 rounded-2xl max-h-[90vh] w-full max-w-2xl text-white overflow-hidden shadow-2xl">

      {/* FIXED HEADER */}
      <div className="p-6 border-b border-white/10 bg-[#224b3a]">
        <h2 className="text-xl font-bold tracking-tight text-white/90">New Issue</h2>
      </div>
      {error && (
        <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/20">
          <p className="text-sm font-medium text-red-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {error}
          </p>
        </div>
      )}
      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-white/10">

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium text-emerald-100/70">Title</label>
          <input
            type="text" name="title" id="title"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium text-emerald-100/70">Description</label>
          <textarea
            name="description" id="description" rows={3}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
          />
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="priority" className="text-sm font-medium text-emerald-100/70">Priority</label>
            <select name="priority" id="priority" className="bg-[#1a3a2d] border border-white/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="statusId" className="text-sm font-medium text-emerald-100/70">Status</label>
            <select name="statusId" className="bg-[#1a3a2d] border border-white/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none">
              <option value="">Select Status</option>
              {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        {/* Assignees (Multi-select) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="assigneeIds" className="text-sm font-medium text-emerald-100/70">Assignees</label>
          <select name="assigneeIds" multiple className="bg-white/5 border border-white/10 rounded-lg p-2 h-24 focus:ring-2 focus:ring-emerald-500 bg-[#1a3a2d] outline-none text-sm">
            {users.map(u => <option key={u.id} value={u.id} className="p-1">{u.name}</option>)}
          </select>
        </div>

        {/* Project & Cycle */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="projectId" className="text-sm font-medium text-emerald-100/70">Project</label>
            <select name="projectId" className="bg-[#1a3a2d] border border-white/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none">
              <option value="">Select Project</option>
              {projectIds.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cycleId" className="text-sm font-medium text-emerald-100/70">Cycle</label>
            <select name="cycleId" className="bg-[#1a3a2d] border border-white/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none">
              <option value="">Select Cycle</option>
              {cycleIds?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* FIXED FOOTER */}
      <div className="p-6 border-t border-white/10 bg-[#224b3a] flex justify-end">
        <SubmitButton label="Create Issue" />
      </div>
    </form>


  </ModalPortal>
}