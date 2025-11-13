'use client';

import { Wifi, LogOut, User, LogIn, Languages, Moon, Sun, Laptop } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-context';
import { Language } from '@/lib/translations';
import { useTheme } from "next-themes"


export function Header() {
  const { user, loading, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Wifi className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold font-headline text-primary tracking-tight">
              {t.SignalSage}
            </h1>
          </Link>
          <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        <Laptop className="mr-2 h-4 w-4" />
                        <span>System</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t.SelectLanguage}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as Language)}>
                  <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="ta">தமிழ்</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="te">తెలుగు</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="hi">हिन्दी</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {loading ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={''} alt={user.displayName ?? 'User'} />
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName ?? 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t.Logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t.Login}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
