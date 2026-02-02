import { Link } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const Favorites = () => {
  const { restaurants, favorites } = useApp();

  const favoriteRestaurants = restaurants.filter((r) => favorites.includes(r.id));

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-brown md:text-4xl">
            My Favorites
          </h1>
          <p className="text-muted-foreground">
            {favoriteRestaurants.length} saved restaurants
          </p>
        </div>

        {favoriteRestaurants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
            <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold text-brown">
              No favorites yet
            </h3>
            <p className="mb-6 max-w-md text-muted-foreground">
              Start exploring restaurants and tap the heart icon to save your favorites
              for easy access later.
            </p>
            <Button variant="cta" className="gap-2" asChild>
              <Link to="/restaurants">
                <Search className="h-4 w-4" />
                Explore Restaurants
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;