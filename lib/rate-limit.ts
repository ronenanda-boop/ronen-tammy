const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 100;

const bucket = new Map<string, { count: number; expires: number }>();

export function isRateLimited(identifier: string, limit = MAX_REQUESTS, windowMs = WINDOW_MS) {
  const now = Date.now();
  const entry = bucket.get(identifier);
  if (!entry || entry.expires < now) {
    bucket.set(identifier, { count: 1, expires: now + windowMs });
    return false;
  }
  if (entry.count >= limit) {
    return true;
  }
  entry.count += 1;
  bucket.set(identifier, entry);
  return false;
}
