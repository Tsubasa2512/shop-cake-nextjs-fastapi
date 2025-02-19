"use server"

import { setSession, clearSession } from "@/lib/auth"
import type { Session } from "@/lib/types/auth"
import { redirect } from "next/navigation"

export async function loginAdmin(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const email = formData.get("email")
  const password = formData.get("password")

  if (email === "admin@example.com" && password === "admin123") {
    const session: Session = {
      user: {
        id: "1",
        email: email.toString(),
        role: "admin",
      },
      expiresAt: Date.now() + 1000 * 60 * 60 * 24,
    }

    await setSession(session)

    return {
      success: true,
      message: "Login successful",
    }
  }

  return {
    success: false,
    message: "Invalid email or password",
  }
}

export async function logoutAdmin() {
  await clearSession()
  redirect("/admin/login")
}

