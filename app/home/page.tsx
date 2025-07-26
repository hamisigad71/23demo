"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowRight,
  Play,
  Camera,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CountdownTimer } from "@/components/countdown-timer";
import { ProductAccessoryCarousel } from "@/components/product-accessory-carousel";

const featuredProducts = [
  {
    id: 1,
    name: "Premium Comfort Scrub Set",
    price: 4500,
    originalPrice: 5500,
    image: "https://i.imgur.com/vpw5T09.jpeg",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Professional V-Neck Top",
    price: 2800,
    originalPrice: 3200,
    image: "https://i.imgur.com/DtWb0OP.jpeg",
    rating: 4.9,
    reviews: 89,
    badge: "New",
  },
  {
    id: 3,
    name: "Elastic Waist Scrub Pants",
    price: 3200,
    originalPrice: 3800,
    image:
      "https://scontent.fnbo18-1.fna.fbcdn.net/v/t51.75761-15/504445908_18014423756724332_7874801041506342832_n.webp?stp=dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFMZ9UnYw1XNR22hmQSWXIwCLnc8T5trUYIudzxPm2tRloL5EfHgOJ8lwstGqb4eQpE1FBpENLKC-tpg13Huao-&_nc_ohc=EUAMpZGN0wMQ7kNvwF6O_da&_nc_oc=Adm7RkyzeBxiUhWIPdzfTT4wTCcz-zHhpBabP1nqCvwCbV2BgXOddrAIQWsD_io0yxY&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=l4GzzQoLtyAwkBLI2OJb7w&oh=00_AfSDyP1aT8vg_IkPD_yML1VSHRT52l7Q3xBZ5I2WxliFKA&oe=6889524C",
    rating: 4.7,
    reviews: 156,
    badge: "Popular",
  },
  {
    id: 4,
    name: "Antimicrobial Scrub Set",
    price: 5200,
    originalPrice: 6000,
    image: "https://i.imgur.com/bnlvgth.jpeg",
    rating: 4.9,
    reviews: 203,
    badge: "Premium",
  },
  // Duplicating products to create 2 rows of 4
  {
    id: 5,
    name: "Classic Comfort Scrub Top",
    price: 3000,
    originalPrice: 3500,
    image: "https://i.imgur.com/jlpCLAY.jpeg",
    rating: 4.7,
    reviews: 95,
    badge: "New Arrival",
  },
  {
    id: 6,
    name: "Stretch Fit Scrub Pants",
    price: 3800,
    originalPrice: 4200,
    image: "https://i.imgur.com/Bx7Z5xp.jpeg",
    rating: 4.8,
    reviews: 110,
    badge: "Limited Edition",
  },
  {
    id: 7,
    name: "Unisex Scrub Jacket",
    price: 4000,
    originalPrice: 4800,
    image: "https://i.imgur.com/n13u9DF.jpeg",
    rating: 4.6,
    reviews: 75,
    badge: "Warmth",
  },
  {
    id: 8,
    name: "Comfort Fit Scrub Set",
    price: 4900,
    originalPrice: 5800,
    image: "https://i.imgur.com/JbGZbVC.jpeg",
    rating: 4.9,
    reviews: 180,
    badge: "Best Value",
  },
];

const testimonials = [
  {
    name: "Dr. Sarah Kimani",
    role: "Pediatric Nurse",
    content:
      "The quality and comfort of JoJo Scrubs is unmatched. I've been wearing them for 2 years and they still look brand new!",
    rating: 5,
    // Using randomuser.me for a more typical avatar look
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Dr. Michael Ochieng",
    role: "Emergency Medicine",
    content:
      "Perfect fit, durable fabric, and the antimicrobial properties give me peace of mind during long shifts.",
    rating: 5,
    // Using randomuser.me for a more typical avatar look
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Nurse Grace Wanjiku",
    role: "ICU Specialist",
    content:
      "Finally found scrubs that combine style, comfort, and functionality. The delivery was super fast too!",
    rating: 5,
    // Using randomuser.me for a more typical avatar look
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]); // Corrected: Added testimonials.length to dependency array

  // Calculate next Friday for the promotion
  const getNextFriday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
    let daysUntilFriday = 5 - dayOfWeek;
    if (daysUntilFriday <= 0) {
      daysUntilFriday += 7;
    }
    const nextFriday = new Date(
      today.setDate(today.getDate() + daysUntilFriday)
    );
    nextFriday.setHours(10, 0, 0, 0); // Set to 10:00 AM
    return nextFriday.toISOString();
  };

  const promotionTargetDate = getNextFriday();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ===== HERO SECTION (REVISED) ===== */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center p-8 lg:p-16 bg-slate-50 text-center lg:items-start lg:text-left">
          {" "}
          {/* Centered items for mobile, left-aligned for large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-4 md:mb-6 bg-pink-100 text-pink-700 px-3 py-1 text-xs md:text-sm font-medium border border-pink-200 rounded-full">
              {" "}
              {/* Smaller badge, rounded */}
              🇰🇪 Proudly Kenyan • Free Delivery Nationwide
            </Badge>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 leading-tight tracking-tighter" /* Slightly larger h1, tighter tracking for impact */
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Engineered for Comfort.
            <span className="block bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
              Designed for Heroes.
            </span>
          </motion.h1>
          <motion.p
            className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-slate-600 max-w-xl leading-relaxed" /* Slightly smaller text for balance, consistent max-width */
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Discover Kenya's finest medical scrubs. Unmatched comfort, durable
            fabrics, and professional style, trusted by healthcare heroes
            nationwide.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 items-center justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto" /* Full width on mobile, auto on sm+ */
              asChild
            >
              <Link href="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full transition-all duration-300 group bg-transparent w-full sm:w-auto" /* Full width on mobile, auto on sm+ */
            >
              <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Watch Story
            </Button>
          </motion.div>
        </div>
        {/* IMAGE CONTAINER FIXES HERE */}
        <div className="relative min-h-[50vh] lg:min-h-screen">
          <Image
            src="https://scontent.fnbo18-1.fna.fbcdn.net/v/t51.75761-15/488582576_18006617801724332_1087545292500469767_n.jpg?stp=dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFihvncD2Or8CBMdQjudX2y2oVvCPuqSu_ahW8I-6pK76BibyAz9FsaxP1Mr2gsNE57RcDBtKhzRN11GB_py6QI&_nc_ohc=psI0bQ0ofTcQ7kNvwFF0gJp&_nc_oc=AdkIHxjE7KWzKcxv9CJBJT8yQi3G-7s3tiMsznP9jGEKMj0Xf6qYlKPBrp8sRytcDhI&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=2KF-gmzMA-mI3Z8qmZcJMw&oh=00_AfQ86B1_ebTqjsgCfdYxjITFGg9-xwGys4bwPb2afPmktg&oe=6889336A"
            alt="Confident medical professional smiling while wearing premium scrubs"
            fill
            // Keep object-cover. object-top for mobile, then object-center for larger screens
            className="object-cover object-top md:object-center"
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
          />
          {/* Subtle gradient overlay to enhance text readability on image if text overlaps */}
          <div className="absolute inset-0 bg-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/10"></div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 md:py-16 bg-white">
        {" "}
        {/* Adjusted padding */}
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-1 md:space-y-2">
              {" "}
              {/* Adjusted vertical space */}
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                5+
              </div>{" "}
              {/* Slightly smaller numbers for balance */}
              <div className="text-sm md:text-base text-gray-600">
                Years of Excellence
              </div>{" "}
              {/* Adjusted text size */}
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                10K+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Happy Customers
              </div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                50+
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Product Varieties
              </div>
            </div>
            <div className="space-y-1 md:space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                4.9★
              </div>
              <div className="text-sm md:text-base text-gray-600">
                Customer Rating
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Promotion - Assuming CountdownTimer component also handles its own responsive text */}
      <CountdownTimer
        targetDate={promotionTargetDate}
        promotionMessage="Flash Sale! Get 20% OFF All Scrubs This Friday!"
      />

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        {" "}
        {/* Adjusted padding */}
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              {" "}
              {/* Adjusted h2 size, tighter margin */}
              Featured Collection
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {" "}
              {/* Adjusted p size */}
              Discover our most popular scrubs, loved by healthcare
              professionals across Kenya
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {" "}
            {/* Adjusted grid for 3 columns on medium, 4 on large */}
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border border-gray-100 bg-white/90 backdrop-blur-sm rounded-lg">
                  {" "}
                  {/* Added subtle border, slightly more rounded */}
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg pb-[125%]">
                      <Image
                        src={
                          product.image && product.image !== ""
                            ? product.image
                            : "/placeholder.svg"
                        }
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" /* Less aggressive hover scale */
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" // More precise sizes
                      />
                      <div className="absolute top-3 left-3 md:top-4 md:left-4">
                        {" "}
                        {/* Adjusted badge position */}
                        <Badge className="bg-blue-600 text-white text-xs md:text-sm px-2 py-1 rounded">
                          {" "}
                          {/* Smaller, less prominent badge */}
                          {product.badge}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {" "}
                        {/* Adjusted heart icon position */}
                        <Button
                          size="icon" /* Use icon size for smaller button */
                          variant="secondary"
                          className="rounded-full h-8 w-8" /* Smaller circular button */
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {" "}
                        {/* Adjusted quick add button position */}
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm py-2">
                          {" "}
                          {/* Smaller button text and padding */}
                          <ShoppingCart className="mr-1 h-4 w-4" />{" "}
                          {/* Smaller icon and margin */}
                          Quick Add
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      {" "}
                      {/* Adjusted padding */}
                      <div className="flex items-center mb-1 md:mb-2">
                        {" "}
                        {/* Adjusted margin */}
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 md:h-4 md:w-4 fill-current"
                            /> /* Smaller stars */
                          ))}
                        </div>
                        <span className="text-xs md:text-sm text-gray-600 ml-1 md:ml-2">
                          {" "}
                          {/* Smaller text for ratings */}
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {" "}
                        {/* Smaller product name, medium font-weight, tighter line-height */}
                        {product.name}
                      </h3>
                      <div className="flex items-baseline mb-2">
                        {" "}
                        {/* Aligned baseline, slightly reduced margin */}
                        <span className="text-xl md:text-sm font-bold text-pink-600">
                          {" "}
                          {/* Bold price, slightly smaller on mobile */}
                          KSh {product.price.toLocaleString()}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 line-through ml-2">
                          {" "}
                          {/* Smaller original price */}
                          KSh {product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 bg-transparent text-base md:text-lg" /* Adjusted button text size */
              asChild
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Virtual Try-On Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-pink-50">
        {" "}
        {/* Adjusted padding */}
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-center lg:text-left space-y-4 md:space-y-6">
              {" "}
              {/* Adjusted vertical spacing */}
              <Badge className="bg-pink-600 text-white px-3 py-1 text-xs md:text-sm font-medium rounded-full">
                {" "}
                {/* Smaller badge */}
                Innovation
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Experience Your Scrubs with{" "}
                <span className="text-pink-600">Virtual Try-On</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                Not sure which color or style suits you best? Our cutting-edge
                virtual try-on feature lets you see how JoJo Scrubs look on you
                before you buy.
              </p>
              <Button
                size="lg"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto" /* Button adjustments */
                asChild
              >
                <Link href="/virtual-try-on">
                  Try It Now
                  <Camera className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-2xl">
              {" "}
              {/* Slightly smaller height on mobile, more rounded corners */}
              <Image
                src="https://scontent.fnbo18-1.fna.fbcdn.net/v/t51.75761-15/490767791_18008474696724332_7241502076619063386_n.webp?stp=dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFznufF3xUPPpBBVGdmscXfQkEONTS59QBCQQ41NLn1AHaedUij9p7T6qw28IqRqYgt44FANf9wmL-PWxitaWaY&_nc_ohc=1tfkigc1RkkQ7kNvwHkDc69&_nc_oc=AdmG5tXbBFYGyyszvTaKbaIzpmFBOv12TQRMgKkuT7a6wxSQiam-iFxZxo7hhA_QhKQ&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=kTbvRGPV9rVedaQ23gPbGw&oh=00_AfSISgoj-Ng-vCkstITosjb_E7iDG70TpbqeaXXduqtp-w&oe=688AA653"
                alt="Virtual Try-On Interface"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play className="h-14 w-14 md:h-16 md:w-16 text-white/80 hover:text-white transition-colors cursor-pointer" />{" "}
                {/* Slightly smaller play icon */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New: Product Accessory Carousel */}
      <ProductAccessoryCarousel />

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-pink-50 to-white">
        {" "}
        {/* Adjusted padding */}
        <div className="max-w-xl mx-auto px-4">
          {" "}
          {/* Narrower max-width for better focus on testimonial */}
          <motion.div
            // On small screens, it remains centered.
            // On medium screens and up (md:), it takes full width of its grid column,
            // aligns its self to start, and its content to text-left.
            className="text-center mb-12 md:mb-16 md:text-left md:w-full md:mx-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Trusted by Healthcare Heroes
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              See what medical professionals are saying about JoJo Scrubs
            </p>
          </motion.div>
          <motion.div
            className="relative"
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white border shadow-lg pt-10 rounded-xl">
              {" "}
              {/* More subtle shadow, more rounded corners */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full shadow-lg border-4 border-white z-10">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={
                      testimonials[currentTestimonial].image &&
                      testimonials[currentTestimonial].image !== ""
                        ? testimonials[currentTestimonial].image
                        : "/placeholder.svg"
                    }
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </div>
              <CardContent className="p-6 md:p-8 text-center pt-12 md:pt-16">
                {" "}
                {/* Adjusted padding, more top padding for avatar */}
                <div className="text-center">
                  {" "}
                  {/* Centered content for testimonials */}
                  <div className="font-semibold text-gray-900 text-lg md:text-xl mb-1 md:mb-2">
                    {" "}
                    {/* Adjusted name size */}
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm md:text-base text-gray-500 mb-3 md:mb-4">
                    {" "}
                    {/* Adjusted role size */}
                    {testimonials[currentTestimonial].role}
                  </div>
                  <blockquote className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 italic leading-relaxed">
                    {"'"}
                    {testimonials[currentTestimonial].content}
                    {"'"} {/* Added quotes */}
                  </blockquote>
                </div>
                <div className="flex justify-center mb-4">
                  {" "}
                  {/* Centered stars */}
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 md:h-6 md:w-6 text-pink-500 fill-current mx-0.5" /* Slightly smaller stars, slight margin between them */
                      />
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <div className="flex justify-center mt-6 space-x-2">
            {" "}
            {/* Adjusted margin */}
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-pink-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#F43F93] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Ready to Upgrade Your Scrubs?
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-white">
              Join thousands of healthcare professionals who trust JoJo Scrubs
              for their daily comfort and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              {" "}
              {/* Adjusted gap */}
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-[#F43F93] px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full w-full sm:w-auto" /* Button adjustments */
                asChild
              >
                <Link href="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#F43F93] px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full bg-transparent w-full sm:w-auto" /* Button adjustments */
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
