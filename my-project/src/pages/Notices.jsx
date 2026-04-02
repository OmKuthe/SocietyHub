import { useState } from "react";

export default function Notices() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Water Supply Maintenance",
      description: "Water will be unavailable from 10 AM to 2 PM.",
      audience: "All",
    },
    {
      id: 2,
      title: "Meeting Reminder",
      description: "Committee meeting at 6 PM.",
      audience: "Committee",
    },
  ]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audience, setAudience] = useState("All");

  const addNotice = () => {
    if (!title || !desc) return;

    setNotices([
      {
        id: Date.now(),
        title,
        description: desc,
        audience,
      },
      ...notices,
    ]);

    setTitle("");
    setDesc("");
    setAudience("All");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notices</h1>

      {/* Add Notice */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Create Notice</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 rounded w-full mb-2"
        />

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded w-full mb-2"
        />

        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="border p-2 rounded mb-2"
        >
          <option>All</option>
          <option>Members</option>
          <option>Committee</option>
        </select>

        <button
          onClick={addNotice}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Post Notice
        </button>
      </div>

      {/* Notices List */}
      <div className="grid gap-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">{n.title}</h2>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                {n.audience}
              </span>
            </div>

            <p className="text-gray-600">{n.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}