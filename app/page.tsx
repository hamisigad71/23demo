// This file is now the Login Page (previously app/page.tsx)
"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Ensure Image is imported
import { useRouter } from "next/navigation"; // Import useRouter

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter(); // Initialize useRouter

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call for login
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to the new homepage path after successful login
      router.push("/home"); // Changed redirect from /dashboard to /home
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error here
      setErrors({
        email: "Invalid credentials",
        password: "Please check your login details",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Handle social login
  };

  const handlePromoClick = () => {
    console.log("Promotional image button clicked!");
    // You can add navigation or open a modal here if needed
    // For example: router.push('/promotions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Promotional Image Only */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md mx-auto lg:mx-0" // Center on mobile, left-align on desktop
        >
          <Button
            variant="ghost" // Use ghost variant to remove default button styling
            className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl p-0 hover:scale-[1.01] transition-transform duration-300"
            onClick={handlePromoClick}
          >
            <Image
              src="https://scontent.fnbo18-1.fna.fbcdn.net/v/t51.75761-15/505191245_18014423747724332_7337792287830952095_n.webp?stp=dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH2iBmXSpHGCU7k2BF_SF-9wII0PwKUbOPAgjQ_ApRs44OwzKfmWC0k1mxAs2j-r275afqsovYlElqkyiKX0833&_nc_ohc=Wwfye5LCNqcQ7kNvwFSPkxa&_nc_oc=Adkn6K4f1wcRlnzIF6MgQ0Mj97FcwdrPSxtCngpv_P4vOWQxHkOydTL9wK07TievYWk&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=efTDsWBcThZWa_1CM43IYw&oh=00_AfR9PRiXirco7g-0S5YpZyzbEeIqJt38oj6XeuD00WosWg&oe=6889157E"
              alt="Mid-Year Mega Sale"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Optional: Add a subtle overlay for better click feedback */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          </Button>
        </motion.div>

        {/* Right Side - Login Form with Branding and Welcome Message */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2 pt-8 pb-4">
              <div className="flex justify-center">
                <Image
                  src="/images/jojo-scrubs-logo-new.png"
                  alt="JoJo Scrubs Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Welcome Back!
              </CardTitle>
              <p className="text-gray-600">
                Sign in to continue to your account.
              </p>
            </CardHeader>

            <CardContent className="space-y-6 pt-0">
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 hover:bg-gray-50 transition-all duration-300 bg-transparent"
                  onClick={() => handleSocialLogin("google")}
                >
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtDY3lQL0z3nfknrcD16ZxHe9BGCj-MlTGQ&s"
                    alt="Google logo"
                    width={20}
                    height={20}
                    className="mr-3"
                  />
                  Continue with Google
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 border-2 hover:bg-blue-50 transition-all duration-300 bg-transparent flex items-center justify-center"
                    onClick={() => handleSocialLogin("facebook")}
                  >
                    <Image
                      src="https://static.vecteezy.com/system/resources/thumbnails/018/930/698/small/facebook-logo-facebook-icon-transparent-free-png.png"
                      alt="Facebook logo"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 border-2 hover:bg-gray-50 transition-all duration-300 bg-transparent"
                    onClick={() => handleSocialLogin("apple")}
                  >
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_ps_PWPSsQ0ZeX7Zsqvtu_30qFYpdmW-0g&s"
                      alt="Apple logo"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                        errors.password ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
