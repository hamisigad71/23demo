"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import { Header } from "@/components/header";

// I've put your original image URLs back in for accurate testing on your end.
// These are the URLs you provided in your initial code.
const products = [
  {
    id: 1,
    name: "Premium Comfort Scrub Set",
    price: 4500,
    originalPrice: 5500,
    image:
      "https://scontent-mba2-1.xx.fbcdn.net/v/t51.75761-15/505484892_18014423699724332_4845588221508944756_n.webp?stp=dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGjhA9CUt_0iIATVDVT1ugL7eGEUG79wwHt4YRQbv3DATQmzoe5vuMrsyj3Fiu1CrKuswptXtezyeR9ObOcX6Zo&_nc_ohc=T53hBM4m42cQ7kNvwFWJAHx&_nc_oc=AdkP81g-hi_FxH1t66bpAxbv2D2vIgSsAUS1hGlCsQkgbxdnFjq3aMGSNDCJSCcBdUs&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=29h6QsLmRlBy1V14yzUx9A&oh=00_AfSJEbkYRav21Vf_vL-v3UkVYYK4oxU8RNoGucFB5RVBsg&oe=687D7899",
    rating: 4.8,
    reviews: 124,
    colors: ["#2563eb", "#059669", "#dc2626", "#7c3aed"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Sets",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 2,
    name: "Professional V-Neck Top",
    price: 2800,
    originalPrice: 3200,
    image:
      "https://scontent-mba2-1.xx.fbcdn.net/v/t51.75761-15/500814257_18012364505724332_8849880899660047592_n.webp?stp=dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEjEeoB-MGQoO_M0wehzk79iCwLtYPfj-iILAu1g9-P6ARV-Ng08Fdn2sE2uaGFTjXFk_OQIfHVbb4e1xyXFKF3&_nc_ohc=s_S7OKAO-wkQ7kNvwHgH30w&_nc_oc=AdkpWzB_RunbrvPJamhvE2A5DUYYf14p7wFD_n_JkFJnOgDKRsqCCEcHe0Q_81wd7vQ&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=jDklNLFA0nyanFvYQshuwA&oh=00_AfTCgEjh6FXi3x1hSAVBoSc5lFQ7Lawl1lCYlaVxEC-xoA&oe=687D9EDA",
    rating: 4.9,
    reviews: 89,
    colors: ["#2563eb", "#059669", "#dc2626"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Tops",
    badge: "New",
    inStock: true,
  },
  {
    id: 3,
    name: "Elastic Waist Scrub Pants",
    price: 3200,
    originalPrice: 3800,
    image:
      "https://scontent-mba2-1.xx.fbcdn.net/v/t51.75761-15/495391606_18010022852724332_7788481617204146161_n.webp?stp=dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEMxADSQNQNiZtgcKmYxNqTSySAlxCyqpFLJICXELKqkfEb2Ph9qtSiR69Nics7DNASCPz9q4m_L_SSpGGBH4qA&_nc_ohc=GYyWz7fnsFQQ7kNvwH1eFng&_nc_oc=Adn13BrsbeOS-Jwqq6Ay_Vh5OaK3ez62XdWsta9hqQxQCuN94SdyJy_wY9kWRKHptjY&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=2xLpKzYB-fs64cbEsANAXA&oh=00_AfSE5_xtxbk5FhRfySA4LCsq8vR715qGx9xxrsegHba7sw&oe=687DD497",
    rating: 4.7,
    reviews: 156,
    colors: ["#2563eb", "#059669", "#dc2626", "#7c3aed", "#f59e0b"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Pants",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 4,
    name: "Antimicrobial Scrub Set",
    price: 5200,
    originalPrice: 6000,
    image:
      "https://scontent-mba2-1.xx.fbcdn.net/v/t51.75761-15/504445908_18014423756724332_7874801041506342832_n.webp?stp=c0.119.1440.1440a_dst-jpg_s206x206_tt6&_nc_cat=108&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeFMZ9UnYw1XNR22hmQSWXIwCLnc8T5trUYIudzxPm2tRloL5EfHgOJ8lwstGqb4eQpE1FBpENLKC-tpg13Huao-&_nc_ohc=26D63gr7eoIQ7kNvwGAdfs2&_nc_oc=Adn6W0w3dvurrPvq1a4eEvzc7AEp-jeVv-OoOpzSy6xMowAO0WHsKNK4J0exH3aM5hM&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=-Adln7RQGkQ-tjd1h3k1zw&oh=00_AfQCZaqX-6vNgH_RN8c0259Ns2-pQ9PR0fBtDTwZRoEvNg&oe=687D74CC",
    rating: 4.9,
    reviews: 203,
    colors: ["#2563eb", "#059669"],
    sizes: ["S", "M", "L", "XL"],
    category: "Sets",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 5,
    name: "Stretch Fabric Scrub Top",
    price: 2500,
    originalPrice: 2900,
    image:
      "https://scontent-mba2-1.xx.fbcdn.net/v/t51.75761-15/501166752_18012364487724332_6761881025142317018_n.webp?stp=dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeGJCcvJgRGj4gmx0UxPLYBf-zLoPY-nASv7Mug9j6cBK9E5cZQsV9ed2--wgZoBUe7bPDiZfsgBEjP-h8SgqtOg&_nc_ohc=0Uy6l5Ml5B8Q7kNvwFRCEc2&_nc_oc=AdmBWj31cJHDHqTajACJb-yibiwsVS-PRxlwE8KnVYh8rBMSiisFQY5m6eA57RwVkFM&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=jDklNLFA0nyanFvYQshuwA&oh=00_AfSmAOuN-FGDIYkKU8cLBIp4pewZW7Ta4xIDKUEViUcpXQ&oe=687DC6E3",
    rating: 4.6,
    reviews: 78,
    colors: ["#2563eb", "#059669", "#dc2626", "#7c3aed"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Tops",
    badge: "",
    inStock: false,
  },
  {
    id: 6,
    name: "Cargo Pocket Scrub Pants",
    price: 3500,
    originalPrice: 4000,
    image:
      "https://scontent-mba2-1.xx.fbcdn.net/v/t51.75761-15/500906978_18012364514724332_5565403094066170215_n.webp?stp=dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_eui2=AeG5BQ_MnqxyrEoLdV5hHgieWi7_B9Mpe3taLv8H0yl7e7GVdS7TJrQAFIiVkeR_AnkRiou05v0PiDmO7mr-s-YJ&_nc_ohc=GY0H9R00ZTcQ7kNvwFx5cPZ&_nc_oc=AdlTJQipt6ll1NX3TV2YcRdOud6W5PRjUGt7DJA_6hOXGBersYzBtEDXAUgEYwm-Clo&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=jDklNLFA0nyanFvYQshuwA&oh=00_AfQPrUKRk5gpY03wfMMV39N9YAHJGZmuNGA76qt-qFvb0Q&oe=687DCC36",
    rating: 4.8,
    reviews: 142,
    colors: ["#2563eb", "#059669", "#dc2626"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Pants",
    badge: "",
    inStock: true,
  },
];

const categories = ["All", "Sets", "Tops", "Pants"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [
    searchQuery,
    selectedCategory,
    selectedSizes,
    priceRange,
    sortBy,
    inStockOnly,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSizes([]);
    setPriceRange([0, 10000]);
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of premium medical scrubs designed
            for comfort and style.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="text-sm mb-2 block">Category</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-sm md:text-xs mb-2 block">
  Price Range: KSh {priceRange[0].toLocaleString()} - KSh{" "}
  {priceRange[1].toLocaleString()}
</label>
<Slider
  value={priceRange}
  onValueChange={setPriceRange}
  max={10000}
  min={0}
  step={100}
  className="mt-2"
/>


                {/* Sizes */}
                <div className="mb-6">
                  <label className="text-sm mb-2 block">Sizes</label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        variant={
                          selectedSizes.includes(size) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          if (selectedSizes.includes(size)) {
                            setSelectedSizes(
                              selectedSizes.filter((s) => s !== size)
                            );
                          } else {
                            setSelectedSizes([...selectedSizes, size]);
                          }
                        }}
                        className="h-8"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* In Stock Only */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) =>
                        setInStockOnly(checked === true)
                      }
                    />
                    <label htmlFor="inStock" className="text-sm cursor-pointer">
                      In stock only
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products found
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className={`group cursor-pointer hover:shadow-xl transition-all duration-300 ${
                      !product.inStock ? "opacity-75" : ""
                    } ${viewMode === "list" ? "flex-row" : ""}`}
                  >
                    <CardContent
                      className={`p-0 ${viewMode === "list" ? "flex" : ""}`}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "list"
                            ? "w-48 h-48 flex-shrink-0" // Fixed size for list view
                            : "pb-[100%] rounded-t-lg" // Padding-bottom for 1:1 aspect ratio in grid view
                        }`}
                        // Removed explicit h-XX classes from here, relying on padding-bottom
                        // for responsive aspect ratio in grid view.
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className={`object-contain group-hover:scale-110 transition-transform duration-500`} // Changed to object-contain
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {product.badge && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-blue-600 text-white">
                              {product.badge}
                            </Badge>
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge
                              variant="secondary"
                              className="text-lg px-4 py-2"
                            >
                              Out of Stock
                            </Badge>
                          </div>
                        )}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-full"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        {product.inStock && (
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Quick Add
                            </Button>
                          </div>
                        )}
                      </div>

                      <div
                        className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                      >
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <h3 className=" text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-gray-500 text-sm mb-4">
                          {product.category}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className=" text-gray-800">
                              KSh {product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                              <span className="text-gray-500 line-through ml-2">
                                KSh {product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
