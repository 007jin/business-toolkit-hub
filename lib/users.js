import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const dataFile = process.env.USERS_DATA_FILE || path.join(process.cwd(), "data", "users.json");

async function readUsers() {
  try {
    const txt = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(txt || "[]");
  } catch (e) {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, "[]", "utf-8");
    return [];
  }
}

async function writeUsers(users) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(users, null, 2), "utf-8");
}

export async function createUser(email, passwordHash) {
  const users = await readUsers();
  const id = crypto.randomUUID();
  const token = crypto.randomBytes(24).toString("hex");
  const user = { id, email, passwordHash, status: "pending", verificationToken: token };
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function listUsers() {
  return await readUsers();
}

export async function findUserByVerificationToken(token) {
  const users = await readUsers();
  return users.find((u) => u.verificationToken === token);
}

export async function updateUserStatus(id, status) {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx].status = status;
  await writeUsers(users);
  return users[idx];
}

export async function markUserVerified(id) {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx].verificationToken = undefined;
  users[idx].status = "pending";
  await writeUsers(users);
  return users[idx];
}
