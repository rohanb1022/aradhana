import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
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

const Login = () => {
  return (
    <div className=" max-h-[90vh] flex justify-center items-center px-4 sm:pt-28">
      <LoginCard />
    </div>
  );
};

export default Login;

function LoginCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const { isLoggingIn, signin } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signin(formData);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md shadow-md">
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Enter your username and password to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="username123"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="underline hover:text-primary">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
