export type UserRole = "admin" | "user"

export interface Session {
  user: {
    id: string
    email: string
    role: UserRole
  }
  expiresAt: number
}

