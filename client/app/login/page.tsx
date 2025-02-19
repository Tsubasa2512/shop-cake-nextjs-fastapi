import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import "../globals.css";
import { LoginForm } from "./login-form"
export const metadata: Metadata = {
  title: "Admin Login",
  description: "Login to access the admin dashboard",
}

export default function LoginPage() {
  return (
    <html>
      <head></head>
      <body>

        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-zinc-900" />
            <Image src="/logo/logo2.png" width={300} height={300} alt="Logo" className="mx-auto relative z-20 mt-auto" />
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This CMS has revolutionized the way we manage our content. It&apos;s simple, efficient, and
                  powerful.&rdquo;
                </p>
                <footer className="text-sm">Ally AI</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">Enter your credentials to access the admin dashboard</p>
              </div>
              <LoginForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                <Link href="/" className="underline underline-offset-4 hover:text-primary">
                  Back Client Website
                </Link>
                .
              </p>
              {/* <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </p> */}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

