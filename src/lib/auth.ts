import { SignJWT, jwtVerify } from 'jose';

// Secret key should ideally come from environment variables
const SECRET_KEY = new TextEncoder().encode(
  'techily-fly-super-secret-key-replace-in-production'
);

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  // Simple SHA-256 hash for demonstration, in production use Scrypt or bcrypt (or Cloudflare Workers friendly crypto)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const attemptHash = await hashPassword(password);
  return attemptHash === hash;
}

export async function createSessionCookie(userId: string): Promise<string> {
  const jwt = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
  
  return jwt;
}

export async function verifySession(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return { userId: payload.userId as string };
  } catch (error) {
    return null;
  }
}
