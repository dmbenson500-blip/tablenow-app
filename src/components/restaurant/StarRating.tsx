import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onChange,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const value = index + 1;
        const filled = value <= rating;
        const partial = !filled && value - rating < 1;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => handleClick(value)}
            className={cn(
              "relative transition-transform",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors",
                filled
                  ? "fill-accent text-accent"
                  : partial
                  ? "fill-accent/50 text-accent"
                  : "fill-muted text-muted"
              )}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="ml-1 font-semibold text-foreground">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;