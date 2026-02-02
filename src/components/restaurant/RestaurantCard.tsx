import { Link } from "react-router-dom";
import { Star, MapPin, Heart } from "lucide-react";
import { Restaurant } from "@/data/restaurants";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  restaurant: Restaurant;
  variant?: "default" | "compact";
}

const RestaurantCard = ({ restaurant, variant = "default" }: RestaurantCardProps) => {
  const { toggleFavorite, isFavorite } = useApp();
  const favorite = isFavorite(restaurant.id);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        variant === "compact" && "flex"
      )}
    >
      {/* Image */}
      <Link
        to={`/restaurant/${restaurant.id}`}
        className={cn(
          "block overflow-hidden",
          variant === "compact" ? "h-full w-32 flex-shrink-0" : "aspect-[4/3]"
        )}
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(restaurant.id)}
        className={cn(
          "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 backdrop-blur transition-all hover:scale-110",
          favorite && "animate-pulse-heart"
        )}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors",
            favorite ? "fill-accent text-accent" : "text-muted-foreground"
          )}
        />
      </button>

      {/* Available Today Badge */}
      {restaurant.availableToday && (
        <div className="absolute left-3 top-3">
          <Badge className="bg-success text-success-foreground">
            <span className="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-success-foreground" />
            Available Today
          </Badge>
        </div>
      )}

      {/* Content */}
      <div className={cn("flex flex-1 flex-col p-4", variant === "compact" && "py-3")}>
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link to={`/restaurant/${restaurant.id}`}>
            <h3 className="font-bold text-brown transition-colors hover:text-primary">
              {restaurant.name}
            </h3>
          </Link>
          <Badge variant="outline" className="shrink-0 border-primary text-primary">
            {restaurant.cuisine}
          </Badge>
        </div>

        <div className="mb-3 flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-semibold">{restaurant.rating}</span>
            <span className="text-muted-foreground">({restaurant.reviewCount})</span>
          </div>
          <span className="font-bold text-accent">{restaurant.priceRange}</span>
        </div>

        <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{restaurant.distance} miles away</span>
        </div>

        {variant === "default" && (
          <div className="mt-auto">
            <Button variant="teal" size="sm" className="w-full" asChild>
              <Link to={`/restaurant/${restaurant.id}`}>View Details</Link>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};

export default RestaurantCard;