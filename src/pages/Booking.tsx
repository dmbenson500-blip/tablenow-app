import { useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Calendar, Users, Clock, Phone, MessageSquare, ArrowLeft, CheckCircle2, PartyPopper } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface LocationState {
  date: string;
  time: string;
  partySize: number;
}

const Booking = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurants, addReservation, user } = useApp();

  const state = location.state as LocationState;
  const restaurant = restaurants.find((r) => r.id === restaurantId);

  const [step, setStep] = useState<"details" | "confirmation">("details");
  const [phone, setPhone] = useState(user?.phone || "");
  const [specialRequests, setSpecialRequests] = useState("");
  const [reservation, setReservation] = useState<{
    reservationNumber: string;
    date: string;
    time: string;
    partySize: number;
  } | null>(null);
  const [errors, setErrors] = useState<{ phone?: string }>({});

  if (!restaurant || !state) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold text-brown">Booking information not found</h1>
          <Button variant="teal" asChild>
            <Link to="/restaurants">Browse Restaurants</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!phone || phone.length < 10) {
      setErrors({ phone: "Please enter a valid phone number" });
      return;
    }

    // Create reservation
    const newReservation = addReservation({
      restaurantId: restaurant.id,
      date: state.date,
      time: state.time,
      partySize: state.partySize,
      phone,
      specialRequests,
      status: "confirmed",
    });

    setReservation({
      reservationNumber: newReservation.reservationNumber,
      date: state.date,
      time: state.time,
      partySize: state.partySize,
    });
    setStep("confirmation");
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-8">
        {step === "details" ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to restaurant
              </button>
              <h1 className="text-3xl font-bold text-brown">Complete Your Reservation</h1>
            </div>

            {/* Booking Summary */}
            <div className="mb-8 rounded-xl border bg-card p-6 shadow-card">
              <div className="flex items-start gap-4">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="mb-1 text-xl font-bold text-brown">{restaurant.name}</h2>
                  <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {format(parseISO(state.date), "EEE, MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-medium">{state.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Party Size</p>
                    <p className="font-medium">
                      {state.partySize} {state.partySize === 1 ? "Guest" : "Guests"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors({});
                  }}
                  className={cn("mt-2", errors.phone && "border-destructive")}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  We'll send a confirmation text to this number
                </p>
              </div>

              <div>
                <Label htmlFor="requests" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Special Requests (Optional)
                </Label>
                <Textarea
                  id="requests"
                  placeholder="Dietary restrictions, seating preferences, special occasion..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <Button variant="cta" size="lg" type="submit" className="w-full">
                Confirm Reservation
              </Button>
            </form>
          </>
        ) : (
          /* Confirmation Screen */
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-success">
                <CheckCircle2 className="h-12 w-12 text-success-foreground" />
              </div>
              <div className="mb-2 flex justify-center">
                <PartyPopper className="h-8 w-8 text-accent animate-bounce" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-brown">Reservation Confirmed!</h1>
              <p className="text-muted-foreground">
                We've sent a confirmation to your phone
              </p>
            </div>

            <div className="mb-8 rounded-xl border bg-card p-6 text-left shadow-card">
              <div className="mb-6 border-b pb-4">
                <p className="text-sm text-muted-foreground">Confirmation Number</p>
                <p className="text-2xl font-bold text-primary">
                  {reservation?.reservationNumber}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-bold text-brown">{restaurant.name}</h2>
                  <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {reservation && format(parseISO(reservation.date), "EEE, MMM d")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-medium">{reservation?.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Guests</p>
                    <p className="font-medium">{reservation?.partySize}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="teal" size="lg" asChild>
                <Link to="/reservations">View My Reservations</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Booking;