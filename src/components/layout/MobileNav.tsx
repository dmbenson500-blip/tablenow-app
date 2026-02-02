import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, CalendarDays } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const location = useLocation();
  const { favorites } = useApp();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/restaurants", icon: Search, label: "Explore" },
    { href: "/reservations", icon: CalendarDays, label: "Bookings" },
    { href: "/favorites", icon: Heart, label: "Favorites", badge: favorites.length },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "relative flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
              isActive(item.href)
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <div className="relative">
              <item.icon className={cn("h-5 w-5", isActive(item.href) && "fill-primary/20")} />
              {item.badge && item.badge > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
            {isActive(item.href) && (
              <span className="absolute -bottom-2 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;