import { NextResponse } from "next/server";
import { createUser, listUsers, updateUserStatus, findUserByVerificationToken, markUserVerified } from "../../../lib/users";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

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

async function sendVerificationEmail(to: string, token: string) {
  // Use env SMTP if provided, otherwise create Ethereal test account
  let transporter;
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/users/verify?token=${token}`;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || "no-reply@example.com",
    to,
    subject: "Verify your email",
    text: `Please verify your email by visiting: ${verifyUrl}`,
    html: `<p>Please verify your email by visiting: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
  });

  // If using Ethereal, return preview URL
  return nodemailer.getTestMessageUrl(info) || null;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(email, passwordHash);

  let previewUrl = null;
  try {
    previewUrl = await sendVerificationEmail(email, user.verificationToken!);
  } catch (e) {
    console.error("Email send failed", e);
  }

  return NextResponse.json({ id: user.id, previewUrl });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  if (action === "verify") {
    const token = url.searchParams.get("token");
    if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });
    const user = await findUserByVerificationToken(token);
    if (!user) return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    await markUserVerified(user.id);
    return NextResponse.json({ ok: true });
  }

  // otherwise return list (admin) - require basic auth
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await listUsers();
  return NextResponse.json({ users });
}
