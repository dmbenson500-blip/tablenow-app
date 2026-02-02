import { Link } from "react-router-dom";
import { Utensils, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-brown text-brown-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Utensils className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-brown-foreground">TableNow</span>
            </Link>
            <p className="text-sm text-brown-foreground/80">
              Discover and book the best restaurants in your area. Your perfect dining experience is just a click away.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-brown-foreground/80 transition-colors hover:text-accent" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-brown-foreground/80 transition-colors hover:text-accent" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-brown-foreground/80 transition-colors hover:text-accent" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brown-foreground">Explore</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/restaurants" className="text-sm text-brown-foreground/80 transition-colors hover:text-accent">
                All Restaurants
              </Link>
              <Link to="/reservations" className="text-sm text-brown-foreground/80 transition-colors hover:text-accent">
                My Reservations
              </Link>
              <Link to="/favorites" className="text-sm text-brown-foreground/80 transition-colors hover:text-accent">
                Favorites
              </Link>
              <Link to="/profile" className="text-sm text-brown-foreground/80 transition-colors hover:text-accent">
                My Profile
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brown-foreground">Contact</h3>
            <div className="space-y-2 text-sm text-brown-foreground/80">
              <p>1234 Restaurant Row</p>
              <p>New York, NY 10001</p>
              <p>support@tablenow.com</p>
              <p>(555) 123-4567</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brown-foreground">Newsletter</h3>
            <p className="text-sm text-brown-foreground/80">
              Get the latest restaurant recommendations and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-brown-foreground/20 bg-brown-foreground/10 text-brown-foreground placeholder:text-brown-foreground/50"
              />
              <Button variant="cta" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-brown-foreground/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-brown-foreground/60 md:flex-row md:text-left">
            <p>© 2026 TableNow. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-accent">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-accent">Terms of Service</a>
              <a href="#" className="transition-colors hover:text-accent">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;