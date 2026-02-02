import { useState } from "react";
import { Link } from "react-router-dom";
import { format, parseISO, isPast, isToday } from "date-fns";
import { Calendar, Clock, Users, MapPin, X, Edit2, RotateCcw } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useApp, Reservation } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const Reservations = () => {
  const { reservations, restaurants, cancelReservation } = useApp();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const getRestaurant = (restaurantId: string) =>
    restaurants.find((r) => r.id === restaurantId);

  const categorizedReservations = {
    upcoming: reservations.filter(
      (r) => r.status === "confirmed" && !isPast(parseISO(r.date))
    ),
    past: reservations.filter(
      (r) =>
        r.status === "completed" ||
        (r.status === "confirmed" && isPast(parseISO(r.date)))
    ),
    cancelled: reservations.filter((r) => r.status === "cancelled"),
  };

  const handleCancelClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedReservation) {
      cancelReservation(selectedReservation.id);
      setCancelDialogOpen(false);
      setSelectedReservation(null);
    }
  };

  const getStatusBadge = (status: Reservation["status"], date: string) => {
    if (status === "cancelled") {
      return <Badge variant="destructive">Cancelled</Badge>;
    }
    if (status === "completed" || (status === "confirmed" && isPast(parseISO(date)))) {
      return <Badge variant="secondary">Completed</Badge>;
    }
    if (isToday(parseISO(date))) {
      return <Badge className="bg-success text-success-foreground">Today</Badge>;
    }
    return <Badge className="bg-primary text-primary-foreground">Confirmed</Badge>;
  };

  const ReservationCard = ({
    reservation,
    type,
  }: {
    reservation: Reservation;
    type: "upcoming" | "past" | "cancelled";
  }) => {
    const restaurant = getRestaurant(reservation.restaurantId);
    if (!restaurant) return null;

    return (
      <div className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-card">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <Link
            to={`/restaurant/${restaurant.id}`}
            className="aspect-video sm:aspect-square sm:w-40 shrink-0"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="font-bold text-brown hover:text-primary transition-colors"
                >
                  {restaurant.name}
                </Link>
                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
              </div>
              {getStatusBadge(reservation.status, reservation.date)}
            </div>

            <div className="mb-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(parseISO(reservation.date), "EEE, MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{reservation.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {reservation.partySize}{" "}
                  {reservation.partySize === 1 ? "guest" : "guests"}
                </span>
              </div>
            </div>

            <p className="mb-4 text-xs text-muted-foreground">
              Confirmation: {reservation.reservationNumber}
            </p>

            {/* Actions */}
            <div className="mt-auto flex flex-wrap gap-2">
              {type === "upcoming" && (
                <>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Edit2 className="h-3.5 w-3.5" />
                    Modify
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-muted-foreground hover:text-destructive"
                    onClick={() => handleCancelClick(reservation)}
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </Button>
                </>
              )}
              {type === "past" && (
                <>
                  <Button variant="cta" size="sm" className="gap-1.5" asChild>
                    <Link to={`/restaurant/${restaurant.id}`}>
                      <RotateCcw className="h-3.5 w-3.5" />
                      Book Again
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    Write Review
                  </Button>
                </>
              )}
              {type === "cancelled" && (
                <Button variant="outline" size="sm" className="gap-1.5" asChild>
                  <Link to={`/restaurant/${restaurant.id}`}>
                    <RotateCcw className="h-3.5 w-3.5" />
                    Book Again
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EmptyState = ({ type }: { type: string }) => (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center">
      <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-2 text-xl font-semibold text-brown">
        {type === "upcoming"
          ? "No upcoming reservations"
          : type === "past"
          ? "No past reservations"
          : "No cancelled reservations"}
      </h3>
      <p className="mb-6 text-muted-foreground">
        {type === "upcoming"
          ? "Ready to discover your next dining experience?"
          : type === "past"
          ? "Your completed reservations will appear here"
          : "Cancelled reservations will show up here"}
      </p>
      {type === "upcoming" && (
        <Button variant="cta" asChild>
          <Link to="/restaurants">Find a Restaurant</Link>
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-brown md:text-4xl">
            My Reservations
          </h1>
          <p className="text-muted-foreground">
            Manage your upcoming and past dining experiences
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6 grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="upcoming" className="relative">
              Upcoming
              {categorizedReservations.upcoming.length > 0 && (
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {categorizedReservations.upcoming.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {categorizedReservations.upcoming.length > 0 ? (
              categorizedReservations.upcoming.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  type="upcoming"
                />
              ))
            ) : (
              <EmptyState type="upcoming" />
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {categorizedReservations.past.length > 0 ? (
              categorizedReservations.past.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  type="past"
                />
              ))
            ) : (
              <EmptyState type="past" />
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {categorizedReservations.cancelled.length > 0 ? (
              categorizedReservations.cancelled.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  type="cancelled"
                />
              ))
            ) : (
              <EmptyState type="cancelled" />
            )}
          </TabsContent>
        </Tabs>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Reservation</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this reservation? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            {selectedReservation && (
              <div className="rounded-lg bg-muted p-4">
                <p className="font-medium">
                  {getRestaurant(selectedReservation.restaurantId)?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(parseISO(selectedReservation.date), "EEE, MMM d, yyyy")} at{" "}
                  {selectedReservation.time}
                </p>
              </div>
            )}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
                Keep Reservation
              </Button>
              <Button variant="destructive" onClick={handleConfirmCancel}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Reservations;