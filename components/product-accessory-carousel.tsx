// This file is now the Homepage (previously app/page.tsx)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

const accessories = [
  {
    id: 1,
    name: "Suture Kit",
    price: 5500,
    image: "https://i.imgur.com/JJGfZwo.jpeg", // Placeholder for Suture Kit
  },
  {
    id: 2,
    name: "Stethoscope Case",
    price: 1800,
    image: "https://i.imgur.com/Hv2nUxD.jpeg", // Placeholder for Stethoscope Case
  },
  {
    id: 3,
    name: "Single-Tube Student's Stethoscope",
    price: 1000,
    image: "https://i.imgur.com/SeGIQVX.jpeg", // Placeholder for Stethoscope
  },
  {
    id: 4,
    name: "Pulse Oximeter",
    price: 1200,
    image: "https://i.imgur.com/pXemaw3.jpeg", // Placeholder for Pulse Oximeter
  },
  {
    id: 5,
    name: "Pentorch Rechargeable Batteries",
    price: 1200,
    image: "https://i.imgur.com/Dexe3YP.jpeg", // Placeholder for Pentorch
  },
  // Add more accessories as needed
];

export function ProductAccessoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Adjusted itemsPerPage to control how many appear at max, but actual display
  // will be controlled by grid classes. For phone, this should effectively be 1.
  const itemsPerPage = 4;

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(accessories.length / itemsPerPage)
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(accessories.length / itemsPerPage)) %
        Math.ceil(accessories.length / itemsPerPage)
    );
  };

  const startIndex = currentIndex * itemsPerPage;
  // This slice is still based on `itemsPerPage` for pagination logic,
  // but the grid classes determine the visual layout.
  const currentItems = accessories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Medical Accessories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your practice with our high-quality medical accessories.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center">
          {/* Navigation buttons are for the carousel functionality, not individual item layout */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 z-10 bg-white/80 hover:bg-white rounded-full shadow-md hidden sm:flex" /* Hide on very small screens for better content space */
            onClick={handlePrev}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <div className="overflow-hidden w-full">
            <motion.div
              key={currentIndex} // Key change to re-trigger animation on slide change
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              // Modified grid classes for explicit phone vertical layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {currentItems.map((accessory) => (
                <Card
                  key={accessory.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={accessory.image || "/placeholder.svg"}
                        alt={accessory.name}
                        width={200}
                        height={200}
                        // Ensure image always takes full width of its container, object-contain maintains aspect ratio
                        className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-500 bg-gray-50"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors text-pink-800">
                        {accessory.name}
                      </h3>
                      <p className="text-gray-800 font-bold">
                        KSh {accessory.price.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10 bg-white/80 hover:bg-white rounded-full shadow-md hidden sm:flex" /* Hide on very small screens */
            onClick={handleNext}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Manual pagination dots, also good for small screens */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({
            length: Math.ceil(accessories.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
