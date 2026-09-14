import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

/* Redacted assets: images that only unlock with the case study password.

   The repository is public, so the originals cannot sit in it or in /public
   in the clear. They are stored encrypted under /private and decrypted by the
   asset route for a request that carries a valid unlock cookie. Layout is
   iv (12 bytes) · GCM tag (16) · ciphertext. */

function key(): Buffer {
  const k = process.env.ASSET_KEY;
  if (!k) throw new Error('ASSET_KEY is not set');
  const buf = Buffer.from(k, 'base64');
  if (buf.length !== 32) throw new Error('ASSET_KEY must be 32 bytes, base64');
  return buf;
}

export function encryptAsset(plain: Buffer): Buffer {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key(), iv);
  const ct = Buffer.concat([c.update(plain), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), ct]);
}

export function decryptAsset(buf: Buffer): Buffer {
  const d = createDecipheriv('aes-256-gcm', key(), buf.subarray(0, 12));
  d.setAuthTag(buf.subarray(12, 28));
  return Buffer.concat([d.update(buf.subarray(28)), d.final()]);
}

export const ASSET_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
};
