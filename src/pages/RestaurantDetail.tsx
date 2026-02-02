import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format, addDays, parseISO } from "date-fns";
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Wifi,
  Accessibility,
  TreePine,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  ExternalLink,
  ThumbsUp,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import StarRating from "@/components/restaurant/StarRating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { reviews, getAvailableSlots } from "@/data/restaurants";
import { cn } from "@/lib/utils";

const amenityIcons: Record<string, { icon: typeof Car; label: string }> = {
  parking: { icon: Car, label: "Parking" },
  wifi: { icon: Wifi, label: "Free WiFi" },
  wheelchair: { icon: Accessibility, label: "Wheelchair Accessible" },
  outdoor: { icon: TreePine, label: "Outdoor Seating" },
};

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { restaurants, toggleFavorite, isFavorite } = useApp();

  const restaurant = restaurants.find((r) => r.id === id);
  const restaurantReviews = reviews.filter((r) => r.restaurantId === id);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [partySize, setPartySize] = useState<string>("2");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewSort, setReviewSort] = useState("recent");

  const availableSlots = useMemo(() => {
    if (!restaurant) return [];
    return getAvailableSlots(restaurant.id, format(selectedDate, "yyyy-MM-dd"));
  }, [restaurant, selectedDate]);

  const similarRestaurants = useMemo(() => {
    if (!restaurant) return [];
    return restaurants
      .filter((r) => r.id !== restaurant.id && r.cuisine === restaurant.cuisine)
      .slice(0, 3);
  }, [restaurant, restaurants]);

  const sortedReviews = useMemo(() => {
    const sorted = [...restaurantReviews];
    switch (reviewSort) {
      case "recent":
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "highest":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
    }
    return sorted;
  }, [restaurantReviews, reviewSort]);

  if (!restaurant) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold text-brown">Restaurant not found</h1>
          <Button variant="teal" asChild>
            <Link to="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const favorite = isFavorite(restaurant.id);

  const handleBookNow = () => {
    if (selectedTime && partySize) {
      navigate(`/booking/${restaurant.id}`, {
        state: {
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
          partySize: parseInt(partySize),
        },
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === restaurant.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? restaurant.gallery.length - 1 : prev - 1
    );
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/restaurants" className="hover:text-primary">Restaurants</Link>
          <span>/</span>
          <span className="text-foreground">{restaurant.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8 overflow-hidden rounded-2xl">
              <div className="aspect-[16/9] bg-muted">
                <img
                  src={restaurant.gallery[currentImageIndex]}
                  alt={`${restaurant.name} - Image ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur transition-transform hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur transition-transform hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {restaurant.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      index === currentImageIndex
                        ? "w-6 bg-accent"
                        : "bg-background/80 hover:bg-background"
                    )}
                  />
                ))}
              </div>
              <button
                onClick={() => toggleFavorite(restaurant.id)}
                className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur transition-transform hover:scale-110"
              >
                <Heart
                  className={cn(
                    "h-6 w-6 transition-colors",
                    favorite ? "fill-accent text-accent" : "text-muted-foreground"
                  )}
                />
              </button>
            </div>

            {/* Restaurant Info */}
            <div className="mb-8">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-brown md:text-4xl">
                    {restaurant.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="border-primary text-primary">
                      {restaurant.cuisine}
                    </Badge>
                    <span className="font-bold text-accent">{restaurant.priceRange}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <span className="font-semibold">{restaurant.rating}</span>
                      <span className="text-muted-foreground">
                        ({restaurant.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-6 text-muted-foreground">{restaurant.description}</p>

              {/* Contact & Details */}
              <div className="grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{restaurant.address}</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Get Directions
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{restaurant.phone}</p>
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-sm text-muted-foreground">{restaurant.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-bold text-brown">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {restaurant.amenities.map((amenity) => {
                  const config = amenityIcons[amenity];
                  if (!config) return null;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2"
                    >
                      <config.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{config.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-brown">Reviews</h2>
                <Select value={reviewSort} onValueChange={setReviewSort}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {sortedReviews.length > 0 ? (
                <div className="space-y-4">
                  {sortedReviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-xl border bg-card p-6"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                            {review.userInitials}
                          </div>
                          <div>
                            <p className="font-medium">{review.userName}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(parseISO(review.date), "MMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="mb-3 text-muted-foreground">{review.text}</p>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-card">
              <h2 className="mb-6 text-xl font-bold text-brown">Make a Reservation</h2>

              {/* Date Picker */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(selectedDate, "EEE, MMM d, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Party Size */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Party Size</label>
                <Select value={partySize} onValueChange={setPartySize}>
                  <SelectTrigger>
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select party size" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Available Times</label>
                <Tabs defaultValue="dinner" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="lunch">Lunch</TabsTrigger>
                    <TabsTrigger value="dinner">Dinner</TabsTrigger>
                  </TabsList>
                  <TabsContent value="lunch" className="mt-3">
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots
                        .filter((slot) => parseInt(slot.split(":")[0]) < 15)
                        .slice(0, 6)
                        .map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "cta" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                            className="text-sm"
                          >
                            {slot}
                          </Button>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="dinner" className="mt-3">
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots
                        .filter((slot) => parseInt(slot.split(":")[0]) >= 17)
                        .slice(0, 9)
                        .map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "cta" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                            className="text-sm"
                          >
                            {slot}
                          </Button>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Book Now Button */}
              <Button
                variant="cta"
                size="lg"
                className="w-full"
                disabled={!selectedTime}
                onClick={handleBookNow}
              >
                {selectedTime ? "Book Now" : "Select a Time"}
              </Button>

              {!restaurant.availableToday && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  This restaurant is fully booked today. Try another date!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Similar Restaurants */}
        {similarRestaurants.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-brown">Similar Restaurants</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default RestaurantDetail;