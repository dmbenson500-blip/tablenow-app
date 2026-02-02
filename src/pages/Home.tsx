import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowRight, Utensils, CalendarCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { useApp } from "@/context/AppContext";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { restaurants } = useApp();

  const featuredRestaurants = restaurants.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/restaurants");
    }
  };

  const howItWorks = [
    {
      icon: Search,
      title: "Discover",
      description: "Browse thousands of restaurants by cuisine, location, or ambiance",
    },
    {
      icon: CalendarCheck,
      title: "Book",
      description: "Select your preferred date, time, and party size instantly",
    },
    {
      icon: Utensils,
      title: "Enjoy",
      description: "Show up and enjoy your meal. No waiting, no hassle!",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden py-16 md:py-24 lg:py-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-in">
              Find Your Perfect Table
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              Discover and book the best restaurants in your area. From cozy bistros to fine dining experiences.
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by location, cuisine, or restaurant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 border-0 bg-background pl-12 pr-4 text-base shadow-lg"
                />
              </div>
              <Button type="submit" variant="hero" size="xl" className="gap-2">
                Search Restaurants
                <Search className="h-5 w-5" />
              </Button>
            </form>

            {/* Quick Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/80 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="text-sm font-medium">10,000+ Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                <span className="text-sm font-medium">500+ Restaurants</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5" />
                <span className="text-sm font-medium">50,000+ Reservations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-brown md:text-4xl">Featured Restaurants</h2>
              <p className="text-muted-foreground">Handpicked favorites loved by our community</p>
            </div>
            <Button variant="tealOutline" className="hidden gap-2 md:inline-flex" asChild>
              <Link to="/restaurants">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="tealOutline" className="gap-2" asChild>
              <Link to="/restaurants">
                View All Restaurants
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-brown md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Book your perfect dining experience in three simple steps
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div
                key={step.title}
                className="group relative text-center animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg transition-transform group-hover:scale-110">
                  <step.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="absolute left-1/2 top-10 hidden h-[2px] w-full -translate-x-[-50%] bg-primary/20 md:block md:last:hidden" />
                <h3 className="mb-2 text-xl font-bold text-brown">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="cta" size="lg" className="gap-2" asChild>
              <Link to="/restaurants">
                Start Exploring
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl bg-brown p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-brown-foreground md:text-4xl">
                Ready for Your Next Dining Adventure?
              </h2>
              <p className="mb-8 text-lg text-brown-foreground/80">
                Join thousands of food lovers who discover new restaurants and book tables effortlessly with TableNow.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button variant="cta" size="lg" className="gap-2" asChild>
                  <Link to="/restaurants">
                    Book a Table Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="tealOutline" size="lg" className="border-brown-foreground text-brown-foreground hover:bg-brown-foreground hover:text-brown">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;