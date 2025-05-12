"use client";

import React from 'react';
import { authClient } from '../../lib/auth-client'; // Adjust path as needed
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'; // Adjust path
import { Button } from '../components/ui/button'; // Adjust path
import { Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, isPending: isLoadingSession } = authClient.useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut(); // Removed callbackURL parameter
      // Better Auth handles the redirect via callbackURL <- Comment may no longer be accurate if redirect doesn't happen automatically
      console.log('Logging out...');
    } catch (error) {
        console.error("Logout error:", error);
        // Handle logout error (e.g., show a notification)
        setIsLoggingOut(false); // Re-enable button if logout fails
    }
     // No need to manually redirect if callbackURL is set
  };

  if (isLoadingSession) {
    return (
        <div className="container mx-auto py-10 px-4 text-center flex justify-center items-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading profile...
        </div>
    );
  }

  if (!session) {
      // Should ideally be handled by route protection/middleware
      // Redirecting here can cause flashes of content
      // router.push('/login');
      return <div className="container mx-auto py-10 px-4 text-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Manage your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{session.user?.name || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{session.user?.email || 'N/A'}</span>
          </div>
           <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Email Verified:</span>
            <span className="font-medium">{session.user?.emailVerified ? 'Yes' : 'No'}</span>
          </div>
          {/* Add more profile fields or settings here later */}

           <div className="pt-4">
                <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full sm:w-auto"
                >
                    {isLoggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
} 