"use client";

import { useState } from "react";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string | undefined>>
  >({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });
  const router = useRouter();

  if (isEmailSent) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" // Add bg-cover and bg-center
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/83/ca/2a/83ca2a3747c71bf71748289b0eb8de68.jpg')",
        }} // Add the background image here
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 max-w-md bg-white bg-opacity-80 p-8 rounded-lg shadow-lg" // Added background to the inner div for readability
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
            }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
          >
            <Check className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900">
            {formData.firstName}! Welcome to JoJo Scrubs Kenya,
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Ready to shop with us? Discover our premium medical scrubs
            collection designed just for healthcare heroes like you.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              router.push("/home");
            }}
          >
            Start Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string | undefined>> = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone) newErrors.phone = "Phone number is required";
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      // Add more password strength checks here if needed (uppercase, number, etc.)
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password =
          (newErrors.password ? newErrors.password + " | " : "") +
          "One uppercase letter required";
      }
      if (!/[0-9]/.test(formData.password)) {
        newErrors.password =
          (newErrors.password ? newErrors.password + " | " : "") +
          "One number required";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 3) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.agreeToTerms)
        newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsLoading(true);
      // Simulate API call for registration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setIsEmailSent(true);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Placeholder for actual social login logic
  };

  const handlePromoClick = () => {
    console.log("Promotional image clicked!");
    // Placeholder for actual promo click logic, e.g., router.push('/sale')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding / Promotional Image Button */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-20 h-20 relative rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/jojo-scrubs-logo-new.png" // Corrected image path
                alt="JoJo Scrubs Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-left">
              {" "}
              {/* Corrected branding text container */}
              <div className="text-3xl font-bold text-gray-900">
                JoJo Scrubs
              </div>
              <div className="text-gray-600">Premium Medical Wear</div>
            </div>
          </div>

          {/* Promotional Image as a Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <Button
              variant="ghost"
              className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl p-0 hover:scale-[1.01] transition-transform duration-300"
              onClick={handlePromoClick}
            >
              <Image
                src="https://i.imgur.com/BksypOb.jpeg"
                alt="Mid-Year Mega Sale"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            </Button>
          </motion.div>

          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Join Our Community!
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create your account and discover why thousands of healthcare
              professionals choose JoJo Scrubs.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">10K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-blue-50/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">4.9★</div>
                <div className="text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
        {/* End Left Side */}

        {/* Right Side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-3xl font-bold text-center text-gray-900">
                Create Account
              </CardTitle>
              <p className="text-center text-gray-600">
                Step {currentStep} of {totalSteps}
              </p>
              <Progress value={progress} className="w-full h-2" />
            </CardHeader>

            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 hover:bg-gray-50 transition-all duration-300 bg-transparent"
                    onClick={() => handleSocialLogin("google")}
                  >
                    <Image
                      src="https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png" // Corrected image path
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
                        src="https://cdn.creazilla.com/icons/7911211/facebook-icon-lg.png"
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
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="firstName"
                            className="text-sm font-medium text-gray-700"
                          >
                            First Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) =>
                                updateFormData("firstName", e.target.value)
                              }
                              className={`pl-10 h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                                errors.firstName
                                  ? "border-red-500"
                                  : "border-gray-200"
                              }`}
                            />
                          </div>
                          {errors.firstName && (
                            <p className="text-sm text-red-500">
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="lastName"
                            className="text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) =>
                              updateFormData("lastName", e.target.value)
                            }
                            className={`h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                              errors.lastName
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-500">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

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
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            className={`pl-10 h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+254 700 123 456"
                            value={formData.phone}
                            onChange={(e) =>
                              updateFormData("phone", e.target.value)
                            }
                            className={`pl-10 h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                              errors.phone
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Password Setup */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
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
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) =>
                              updateFormData("password", e.target.value)
                            }
                            className={`pl-10 pr-10 h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                              errors.password
                                ? "border-red-500"
                                : "border-gray-200"
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
                          <p className="text-sm text-red-500">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-gray-700"
                        >
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              updateFormData("confirmPassword", e.target.value)
                            }
                            className={`pl-10 pr-10 h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                              errors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-500">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">
                          Password Requirements:
                        </h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                formData.password.length >= 8
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                            <span>At least 8 characters</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                /[A-Z]/.test(formData.password)
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                            <span>One uppercase letter</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                /[0-9]/.test(formData.password)
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                            <span>One number</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Address & Terms */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="address"
                          className="text-sm font-medium text-gray-700"
                        >
                          Address
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            id="address"
                            type="text"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={(e) =>
                              updateFormData("address", e.target.value)
                            }
                            className={`pl-10 h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                              errors.address
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          />
                        </div>
                        {errors.address && (
                          <p className="text-sm text-red-500">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="city"
                          className="text-sm font-medium text-gray-700"
                        >
                          City
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Nairobi"
                          value={formData.city}
                          onChange={(e) =>
                            updateFormData("city", e.target.value)
                          }
                          className={`h-12 border-2 transition-all duration-300 focus:border-blue-500 ${
                            errors.city ? "border-red-500" : "border-gray-200"
                          }`}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-500">{errors.city}</p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) =>
                              updateFormData("agreeToTerms", checked as boolean)
                            }
                            className="mt-1"
                          />
                          <Label
                            htmlFor="agreeToTerms"
                            className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                        {errors.agreeToTerms && (
                          <p className="text-sm text-red-500">
                            {errors.agreeToTerms}
                          </p>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="subscribeNewsletter"
                            checked={formData.subscribeNewsletter}
                            onCheckedChange={(checked) =>
                              updateFormData(
                                "subscribeNewsletter",
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor="subscribeNewsletter"
                            className="text-sm text-gray-600 cursor-pointer"
                          >
                            Subscribe to our newsletter for updates and
                            exclusive offers
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1 h-12 border-2 font-semibold bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 group"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* End Right Side */}
      </div>
    </div>
  );
}
