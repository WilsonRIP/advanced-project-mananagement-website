'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Menu, X, LogOut, User, Settings, Sun, Moon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../../components/ui/sheet";
import { authClient } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    setMobileMenuOpen(false);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
          onError: (error: any) => {
            console.error("Sign out error:", error);
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', onClick: toggleMenu },
    { name: 'Features', href: '/features', onClick: toggleMenu },
    { name: 'Pricing', href: '/pricing', onClick: toggleMenu },
    { name: 'About', href: '/about', onClick: toggleMenu },
    { name: 'Contact', href: '/contact', onClick: toggleMenu },
  ];

  return (
    <nav className="bg-background shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">ProjectPro</span>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            {session && (
               <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                 Dashboard
               </Link>
            )}
            <ThemeSwitcher />
            {isPending ? (
              <div className="animate-pulse flex space-x-2">
                <div className="h-8 w-20 bg-muted rounded-md"></div>
                <div className="h-8 w-24 bg-muted rounded-md"></div>
              </div>
            ) : session ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <ThemeSwitcher />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  {mobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                       <X className="block h-6 w-6" aria-hidden="true" />
                    </Button>
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  {session && (
                     <Link href="/dashboard" onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-base font-medium">Dashboard</Link>
                  )}
                </div>
                <hr className="my-2 border-border" />
                {isPending ? (
                   <div className="animate-pulse flex flex-col space-y-2 mt-2">
                      <div className="h-10 w-full bg-muted rounded-md"></div>
                      <div className="h-10 w-full bg-muted rounded-md"></div>
                    </div>
                ) : session ? (
                  <SheetClose asChild>
                      <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="w-full justify-start text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                      </Button>
                  </SheetClose>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Link href="/login" passHref>
                        <Button variant="outline" className="w-full justify-start text-base font-medium">
                          Login
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/signup" passHref>
                        <Button variant="default" className="w-full justify-start text-base font-medium">
                          Sign Up
                        </Button>
                      </Link>
                    </SheetClose>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 