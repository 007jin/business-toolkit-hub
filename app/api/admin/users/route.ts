import { NextResponse } from "next/server";
import { updateUserStatus } from "../../../../lib/users";

function checkAdminAuth(req: Request) {
  const auth = req.headers.get("authorization");
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;
  if (!adminUser || !adminPass) return false;
  if (!auth || !auth.startsWith("Basic ")) return false;
  const payload = auth.replace(/^Basic\s+/i, "");
  try {
    const decoded = Buffer.from(payload, "base64").toString("utf-8");
    return decoded === `${adminUser}:${adminPass}`;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, action } = body;
  if (!id || !action) return NextResponse.json({ error: "Missing id or action" }, { status: 400 });

  if (action !== "approve" && action !== "deny") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const status = action === "approve" ? "approved" : "denied";
  const updated = await updateUserStatus(id, status as any);
  if (!updated) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ ok: true, user: updated });
}
