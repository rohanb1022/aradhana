import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { AuthUser } from "../store/useAuthStore";
import React from "react";

const Signup = () => {
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:pt-28">
      <SignupCard />
    </div>
  );
};

export default Signup;

function SignupCard() {

  const [formData , setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const { isSigningUp , signup} = useAuthStore() as {
    authUser: AuthUser | null;
    isSigningUp: boolean;
    signup: (data: { username: string; email: string; password: string }) => void;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({ ...formData })
  };

  return (
    <form 
      className="w-full max-w-md shadow-md"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Fill the form below to create a new account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="username123" 
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData , email : e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button 
          type="submit" 
          className="w-full"
          disabled={isSigningUp}
          >
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-primary">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
