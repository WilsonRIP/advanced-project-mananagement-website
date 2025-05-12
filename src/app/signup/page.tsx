"use client";

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { authClient } from '../../lib/auth-client'; // Import authClient

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        setIsLoading(false);
        return;
    }

    try {
      // Use authClient.signUp.email
      const { error: signUpError, data } = await authClient.signUp.email({
        name,
        email,
        password,
        // callbackURL: "/welcome", // Optional: Redirect after email verification if enabled
      }, {
        // Optional callbacks
        onRequest: () => setIsLoading(true), // Handled above
        onSuccess: (ctx) => {
          // By default, better-auth signs the user in automatically.
          // Redirect to home/dashboard.
          console.log('Signup successful, redirecting...');
          router.push('/'); // Redirect to home page
        },
        onError: (ctx) => {
          setError(ctx.error.message || 'An unknown signup error occurred.');
          setIsLoading(false);
        }
      });

       // If there was an error object returned directly
      if (signUpError) {
         setError(signUpError.message || 'Signup failed. Please try again.');
         setIsLoading(false);
      }

    } catch (err: any) {
      console.error("Signup submission error:", err);
      setError(err.message || 'An unexpected error occurred during signup.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 dark:from-gray-900 dark:via-black dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Join ProjectPro and manage your projects efficiently</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
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
                placeholder="•••••••• (min. 8 chars)"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
             {error && (
              <p className="text-sm text-red-600 dark:text-red-500 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center block">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Log In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 