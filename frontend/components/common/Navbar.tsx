"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { User } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Navbar = () => {
  const [dialog, setDialog] = useState<"signin" | "signup" | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const url =
        dialog === "signin"
          ? `${API_URL}/auth/login`
          : `${API_URL}/auth/register`;
      const res = await axios.post(url, payload);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setDialog(null);

      toast(dialog === "signin" ? res.data.message : res.data.message, {
        description:
          dialog === "signin"
            ? "You have been logged in."
            : "You have been registered.",
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Authentication failed";
      setError(msg);
      toast("Error", {
        description: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast("Logged out successfully", {
      description: "You have been logged out.",
    });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center gap-4 p-4 border-b bg-white z-50">
        <img src="/logo.png" alt="Logo" className="w-[60px]" />
        <h1 className="font-bold">Fame Hotel</h1>
        {/* Navigation links */}
        <div className="flex gap-4 ml-8">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="ml-auto flex gap-4">
          {!token ? (
            <>
              <Button
                className=" px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => setDialog("signin")}
              >
                Sign In
              </Button>
              <Button
                className="px-4 py-2 rounded text-white"
                onClick={() => setDialog("signup")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300">
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/profile/bookings")}
                >
                  Booking
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      <div className="h-[66px]" />

      <Dialog
        open={dialog !== null}
        onOpenChange={(open) => !open && setDialog(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {dialog === "signin" ? "Sign In" : "Sign Up"}
            </DialogTitle>
            <DialogDescription>
              {dialog === "signin"
                ? "Sign in to your account."
                : "Create a new account."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              {dialog === "signup" && (
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {dialog === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
