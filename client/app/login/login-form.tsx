"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginAdmin } from "@/app/api/auth/actions"

export function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState<string>("")
    const [isPending, setIsPending] = useState(false)

    async function onSubmit(formData: FormData) {
        setError("")
        setIsPending(true)

        try {
            const response = await loginAdmin(formData)

            if (response.success) {
                // Redirect to dashboard on successful login
                router.push("/admin")
            } else {
                setError(response.message)
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.")
            console.log(error);

        } finally {
            setIsPending(false)
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" value="admin@example.com" placeholder="name@example.com" required disabled={isPending} />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="/admin/forgot-password"  className="text-sm text-muted-foreground hover:text-primary">
                                Forgot password?
                            </Link>
                        </div>
                        <Input id="password" type="password" value="admin123" name="password" required disabled={isPending} />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" name="remember" />
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember me
                        </label>
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Signing in..." : "Sign in"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

