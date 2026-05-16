"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  status: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.status === 401) {
        setUsers([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUsers(data.users || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const takeAction = async (id: string, action: "approve" | "deny") => {
    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    fetchUsers();
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border">
        <h1 className="text-2xl font-bold mb-4">Admin — User Approvals</h1>

        {loading ? (
          <p>Loading…</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-gray-600">No users or unauthorized. Ensure `ADMIN_USER`/`ADMIN_PASS` are set for API access.</p>
        ) : (
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Email</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="py-3">{u.email}</td>
                  <td className="py-3">{u.status}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button onClick={() => takeAction(u.id, "approve")} className="bg-green-600 text-white px-3 py-1 rounded">Approve</button>
                      <button onClick={() => takeAction(u.id, "deny")} className="bg-red-600 text-white px-3 py-1 rounded">Deny</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
