import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="items-center text-center space-y-3 p-6">
            <Logo />
            <CardTitle className="font-headline text-2xl font-bold pt-4">Welcome Back!</CardTitle>
            <CardDescription>Enter your credentials to access your links.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form action="/dashboard" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full font-semibold">
                Sign In
              </Button>
               <Button variant="outline" className="w-full font-semibold" asChild>
                <Link href="/register">Don't have an account? Sign Up</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
