import { models } from '../models';

export class AuthService {
  private users = new Map<string, models.User>();
  private sessions = new Map<string, models.AuthSession>();

  /** Register a new user (throws if username already exists) */
  register(userId: string, username: string, email: string, passwordHash: string): models.User {
    if (Array.from(this.users.values()).find(u => u.username === username)) {
      throw new Error(`Username "${username}" already taken`);
    }
    const user = new models.User(userId, username, email, passwordHash);
    this.users.set(userId, user);
    return user;
  }

  /** Log in a user by username/passwordHash, returning a new session */
  login(username: string, passwordHash: string): models.AuthSession {
    const user = Array.from(this.users.values()).find(u => u.username === username && u.passwordHash === passwordHash);
    if (!user) throw new Error('Invalid credentials');
    const session = new models.AuthSession(
      crypto.randomUUID(),
      new Date(),
      new Date(Date.now() + 1000 * 60 * 60) // expires in 1h
    );
    this.sessions.set(session.sessionId, session);
    console.log(`User ${username} logged in, session ${session.sessionId}`);
    return session;
  }

  /** Log out by invalidating the session */
  logout(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    session.invalidate();
    this.sessions.delete(sessionId);
    console.log(`Session ${sessionId} invalidated`);
  }

  /** Validate a session and return its user */
  validateSession(sessionId: string): models.User {
    const session = this.sessions.get(sessionId);
    if (!session || !session.validate()) {
      throw new Error('Session invalid or expired');
    }
    // assume session stores userId in a real impl
    // here we’ll just pick any user for demo
    return Array.from(this.users.values())[0];
  }
}
