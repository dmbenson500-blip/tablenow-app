import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const cuisineTypes = [
  "American", "Argentinian", "BBQ", "Brazilian", "British", "Brunch", "Burger", "Cafe", 
  "Cajun", "Caribbean", "Chinese", "Cuban", "Deli", "Dessert", "Dim Sum", "Ethiopian", 
  "Filipino", "French", "Fusion", "Gastropub", "German", "Greek", "Hawaiian", "Indian", 
  "Indonesian", "Irish", "Israeli", "Italian", "Japanese", "Korean", "Lebanese", "Malaysian", 
  "Mediterranean", "Mexican", "Moroccan", "Nepalese", "Noodles", "Pakistani", "Peruvian", 
  "Pizza", "Poke", "Polish", "Portuguese", "Ramen", "Russian", "Salad", "Sandwich", "Seafood", 
  "Soup", "Spanish", "Steakhouse", "Sushi", "Taco", "Thai", "Tibetan", "Turkish", 
  "Vegetarian", "Vietnamese", "Wine Bar", "Wings"
];
const priceRanges = ["$", "$$", "$$$", "$$$$"];
const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free"];

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const { restaurants } = useApp();
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query) ||
          r.address.toLowerCase().includes(query)
      );
    }

    // Cuisine filter
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((r) =>
        selectedCuisines.some((c) => r.cuisine.toLowerCase() === c.toLowerCase())
      );
    }

    // Price filter
    if (selectedPrice) {
      filtered = filtered.filter((r) => r.priceRange === selectedPrice);
    }

    // Dietary filter
    if (selectedDietary.length > 0) {
      filtered = filtered.filter((r) =>
        selectedDietary.some((d) =>
          r.dietaryOptions.map((o) => o.toLowerCase()).includes(d.toLowerCase())
        )
      );
    }

    // Sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case "price-low":
        filtered.sort((a, b) => a.priceRange.length - b.priceRange.length);
        break;
      case "price-high":
        filtered.sort((a, b) => b.priceRange.length - a.priceRange.length);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return filtered;
  }, [restaurants, searchQuery, selectedCuisines, selectedPrice, selectedDietary, sortBy]);

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const toggleDietary = (option: string) => {
    setSelectedDietary((prev) =>
      prev.includes(option)
        ? prev.filter((d) => d !== option)
        : [...prev, option]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCuisines([]);
    setSelectedPrice("");
    setSelectedDietary([]);
    setSortBy("rating");
  };

  const hasActiveFilters =
    searchQuery || selectedCuisines.length > 0 || selectedPrice || selectedDietary.length > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Restaurant name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Cuisine Types */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Cuisine Type</Label>
        <div className="space-y-2">
          {cuisineTypes.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox
                id={`cuisine-${cuisine}`}
                checked={selectedCuisines.includes(cuisine)}
                onCheckedChange={() => toggleCuisine(cuisine)}
              />
              <label
                htmlFor={`cuisine-${cuisine}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {cuisine}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Price Range</Label>
        <RadioGroup value={selectedPrice} onValueChange={setSelectedPrice}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="price-all" />
            <Label htmlFor="price-all" className="cursor-pointer">All Prices</Label>
          </div>
          {priceRanges.map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <RadioGroupItem value={price} id={`price-${price}`} />
              <Label htmlFor={`price-${price}`} className="cursor-pointer font-medium text-accent">{price}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Dietary Options */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Dietary Options</Label>
        <div className="space-y-2">
          {dietaryOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`dietary-${option}`}
                checked={selectedDietary.includes(option)}
                onCheckedChange={() => toggleDietary(option)}
              />
              <label
                htmlFor={`dietary-${option}`}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearAllFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-brown md:text-4xl">All Restaurants</h1>
          <p className="text-muted-foreground">
            {filteredRestaurants.length} restaurants found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-bold text-brown">Filters</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort & View */}
              <div className="flex items-center gap-3 ml-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden items-center gap-1 rounded-lg border p-1 sm:flex">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {filteredRestaurants.length > 0 ? (
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {filteredRestaurants.map((restaurant, index) => (
                  <div
                    key={restaurant.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <RestaurantCard
                      restaurant={restaurant}
                      variant={viewMode === "list" ? "compact" : "default"}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold text-brown">No restaurants found</h3>
                <p className="mb-6 text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="teal" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Restaurants;