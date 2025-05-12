"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { authClient } from '../../lib/auth-client'; // Import authClient

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Use authClient.signIn.email
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/", // Redirect to home page after successful login
      }, {
        // Optional callbacks
        onRequest: () => setIsLoading(true), // Already handled above, but can be explicit
        onSuccess: (ctx) => {
          // router.push(ctx.callbackURL || '/'); // Better Auth handles redirect via callbackURL
          console.log('Login successful, redirecting...');
        },
        onError: (ctx) => {
          setError(ctx.error.message || 'An unknown login error occurred.');
          setIsLoading(false);
        }
      });

      // Note: If auto-redirect works via callbackURL, manual navigation might not be needed
      // If there was an error object returned directly (check better-auth docs if this happens)
      if (signInError) {
         setError(signInError.message || 'Login failed. Please check your credentials.');
         setIsLoading(false);
      }

    } catch (err: any) {
      console.error("Login submission error:", err);
      setError(err.message || 'An unexpected error occurred during login.');
      setIsLoading(false);
    }
    // No need for setIsLoading(false) here if onError handles it or onSuccess navigates away
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to access your projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
             {error && (
              <p className="text-sm text-red-600 dark:text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging In...' : 'Login'}
            </Button>
          </form>
          {/* Placeholder for Social Logins */}
          {/* <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
             TODO: Implement social login buttons using authClient.signIn.social 
             Example: <Button variant="outline" onClick={() => authClient.signIn.social({ provider: 'google' })} disabled={isLoading}>Google</Button>
             <Button variant="outline" onClick={() => authClient.signIn.social({ provider: 'github' })} disabled={isLoading}>GitHub</Button>
          </div> */}
        </CardContent>
        <CardFooter className="text-sm text-center block">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 