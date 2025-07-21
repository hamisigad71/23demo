"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/home" }, // Updated to /home
    { name: "Products", href: "/products" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+254 700 123 456</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@jojoscrubs.co.ke</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>🚚 Free delivery on orders over KSh 5,000</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/90 backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/home" className="flex items-center ml-[-1rem]">
              {" "}
              {/* Updated to /home */}
              <div>
                <Image
                  src="/images/jojo-scrubs-logo-new.png"
                  alt="JoJo Scrubs Logo"
                  width={150}
                  height={45}
                  className="h-auto"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 lg:pl-[10px]">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search scrubs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  3
                </Badge>
              </Button>

              <Button variant="ghost" size="sm" className="relative" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {items.length}
                    </Badge>
                  )}
                </Link>
              </Button>

              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  {/* Link to user dashboard */}
                  <User className="h-5 w-5" />
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search scrubs..."
                    className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-full"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                    asChild
                  >
                    <Link href="/">Sign In</Link> {/* Updated to / */}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full bg-transparent"
                    asChild
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
