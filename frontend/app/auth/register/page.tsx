"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const goToLogin = () => {
    window.location.href = "/auth/login";
}

const Register = () => {
  return <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <CardHeader>
          <CardTitle>Register for an account</CardTitle>
          <CardDescription>
            Enter your email below to register
          </CardDescription>
          <CardAction>
            <Button variant="link" onClick={goToLogin}>
              Sign In
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </div>;
};

export default Register;
