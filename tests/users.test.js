import fs from 'fs/promises';
import path from 'path';
import assert from 'assert';
import { describe, it, beforeEach, afterEach } from 'node:test';

const tempFile = path.join(process.cwd(), 'data', 'users.test.json');
process.env.USERS_DATA_FILE = tempFile;

import { createUser, listUsers, updateUserStatus, findUserByVerificationToken } from '../lib/users.js';

beforeEach(async () => {
  try { await fs.unlink(tempFile); } catch {}
});

afterEach(async () => {
  try { await fs.unlink(tempFile); } catch {}
});

describe('users store', () => {
  it('creates and lists users', async () => {
    const u = await createUser('a@example.com', 'hash');
    const all = await listUsers();
    assert.equal(all.length, 1);
    assert.equal(all[0].email, 'a@example.com');
  });

  it('finds by verification token and updates status', async () => {
    const u = await createUser('b@example.com', 'h2');
    const found = await findUserByVerificationToken(u.verificationToken);
    assert(found && found.email === 'b@example.com');
    const updated = await updateUserStatus(u.id, 'approved');
    assert(updated && updated.status === 'approved');
  });
});
