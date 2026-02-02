export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  address: string;
  phone: string;
  hours: string;
  amenities: string[];
  distance: string;
  description: string;
  dietaryOptions: string[];
  availableToday: boolean;
}

export interface Review {
  id: string;
  restaurantId: string;
  userName: string;
  userInitials: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Bella Italia",
    cuisine: "Italian",
    priceRange: "$$",
    rating: 4.5,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    ],
    address: "123 Main St, Downtown, NY 10001",
    phone: "(555) 123-4567",
    hours: "Mon-Fri: 5pm-10pm, Sat-Sun: 12pm-11pm",
    amenities: ["parking", "wifi", "wheelchair", "outdoor"],
    distance: "0.8",
    description: "Authentic Italian cuisine in a cozy, romantic atmosphere. Our handmade pasta and wood-fired pizzas have been delighting guests for over 20 years.",
    dietaryOptions: ["vegetarian", "gluten-free"],
    availableToday: true,
  },
  {
    id: "2",
    name: "Tokyo Sushi Bar",
    cuisine: "Japanese",
    priceRange: "$$$",
    rating: 4.7,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&h=600&fit=crop",
    ],
    address: "456 Oak Avenue, Midtown, NY 10022",
    phone: "(555) 234-5678",
    hours: "Tue-Sun: 11:30am-10pm",
    amenities: ["wifi", "wheelchair"],
    distance: "1.2",
    description: "Premium omakase experience with the freshest fish flown in daily from Tokyo's Tsukiji Market. Our master chef has over 30 years of experience.",
    dietaryOptions: ["gluten-free"],
    availableToday: true,
  },
  {
    id: "3",
    name: "La Cantina",
    cuisine: "Mexican",
    priceRange: "$",
    rating: 4.3,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1653501318880-8a222814c6d1?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1653501318880-8a222814c6d1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&h=600&fit=crop",
    ],
    address: "789 Sunset Blvd, West Side, NY 10019",
    phone: "(555) 345-6789",
    hours: "Daily: 11am-11pm",
    amenities: ["parking", "outdoor", "wifi"],
    distance: "2.3",
    description: "Vibrant Mexican cantina serving authentic street tacos, fresh guacamole, and over 100 premium tequilas. Live mariachi on weekends!",
    dietaryOptions: ["vegetarian", "vegan", "gluten-free"],
    availableToday: true,
  },
  {
    id: "4",
    name: "The Steakhouse",
    cuisine: "American",
    priceRange: "$$$$",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop",
    ],
    address: "321 Park Avenue, Upper East, NY 10065",
    phone: "(555) 456-7890",
    hours: "Mon-Sat: 5pm-11pm, Sun: 4pm-10pm",
    amenities: ["parking", "wifi", "wheelchair"],
    distance: "3.1",
    description: "Prime dry-aged steaks, world-class wine selection, and impeccable service. A classic American steakhouse experience.",
    dietaryOptions: ["gluten-free"],
    availableToday: false,
  },
  {
    id: "5",
    name: "Golden Dragon",
    cuisine: "Chinese",
    priceRange: "$$",
    rating: 4.4,
    reviewCount: 298,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop",
    ],
    address: "567 Dragon Lane, Chinatown, NY 10013",
    phone: "(555) 567-8901",
    hours: "Daily: 11am-10:30pm",
    amenities: ["wifi", "wheelchair"],
    distance: "1.5",
    description: "Traditional Cantonese cuisine with dim sum served daily. Family-owned for three generations with recipes passed down through the years.",
    dietaryOptions: ["vegetarian", "vegan"],
    availableToday: true,
  },
  {
    id: "6",
    name: "Mediterranean Grill",
    cuisine: "Mediterranean",
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 267,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1529543544277-750e1b0536f3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
    ],
    address: "890 Olive Street, Greenwich Village, NY 10014",
    phone: "(555) 678-9012",
    hours: "Tue-Sun: 12pm-10pm",
    amenities: ["outdoor", "wifi", "wheelchair"],
    distance: "0.5",
    description: "Fresh Mediterranean flavors with house-made hummus, grilled kebabs, and authentic Greek specialties. Beautiful garden patio seating.",
    dietaryOptions: ["vegetarian", "vegan", "gluten-free"],
    availableToday: true,
  },
  {
    id: "7",
    name: "Curry Palace",
    cuisine: "Indian",
    priceRange: "$",
    rating: 4.2,
    reviewCount: 345,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&h=600&fit=crop",
    ],
    address: "234 Spice Road, East Village, NY 10003",
    phone: "(555) 789-0123",
    hours: "Daily: 11:30am-10:30pm",
    amenities: ["wifi", "wheelchair"],
    distance: "1.8",
    description: "Aromatic curries, fresh naan from our tandoor oven, and a legendary lunch buffet. Spice levels customized to your preference.",
    dietaryOptions: ["vegetarian", "vegan", "gluten-free"],
    availableToday: true,
  },
  {
    id: "8",
    name: "Le Petit Bistro",
    cuisine: "French",
    priceRange: "$$$",
    rating: 4.7,
    reviewCount: 178,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    ],
    address: "456 Parisian Way, SoHo, NY 10012",
    phone: "(555) 890-1234",
    hours: "Tue-Sat: 6pm-11pm, Sun: 11am-3pm (Brunch)",
    amenities: ["wifi", "outdoor"],
    distance: "2.0",
    description: "Classic French bistro fare in an intimate setting. Escargot, coq au vin, and crème brûlée made with traditional techniques.",
    dietaryOptions: ["vegetarian"],
    availableToday: true,
  },
  {
    id: "9",
    name: "BBQ Smokehouse",
    cuisine: "American",
    priceRange: "$$",
    rating: 4.5,
    reviewCount: 423,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop",
    ],
    address: "678 Smoke Lane, Brooklyn, NY 11201",
    phone: "(555) 901-2345",
    hours: "Wed-Mon: 12pm-9pm (or until sold out)",
    amenities: ["parking", "outdoor", "wheelchair"],
    distance: "4.2",
    description: "Low and slow smoked meats using traditional Texas methods. Brisket, ribs, and pulled pork that melts in your mouth. Worth the drive!",
    dietaryOptions: ["gluten-free"],
    availableToday: true,
  },
  {
    id: "10",
    name: "Veggie Haven",
    cuisine: "Vegetarian",
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&h=600&fit=crop",
    ],
    address: "901 Green Street, Chelsea, NY 10011",
    phone: "(555) 012-3456",
    hours: "Daily: 10am-10pm",
    amenities: ["wifi", "outdoor", "wheelchair"],
    distance: "1.0",
    description: "Creative plant-based cuisine that even meat-lovers adore. Organic, locally-sourced ingredients transformed into culinary masterpieces.",
    dietaryOptions: ["vegetarian", "vegan", "gluten-free"],
    availableToday: true,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    restaurantId: "1",
    userName: "Sarah M.",
    userInitials: "SM",
    rating: 5,
    date: "2026-01-28",
    text: "Absolutely incredible pasta! The carbonara was the best I've ever had outside of Rome. The atmosphere is romantic and cozy, perfect for a date night. Will definitely be back!",
    helpful: 12,
  },
  {
    id: "r2",
    restaurantId: "1",
    userName: "Michael R.",
    userInitials: "MR",
    rating: 4,
    date: "2026-01-25",
    text: "Great food and service. The tiramisu is a must-try! Only giving 4 stars because it was a bit noisy on a Saturday night.",
    helpful: 8,
  },
  {
    id: "r3",
    restaurantId: "1",
    userName: "Emily K.",
    userInitials: "EK",
    rating: 5,
    date: "2026-01-20",
    text: "We celebrated our anniversary here and it was perfect. The staff went above and beyond to make it special. The wine selection is excellent too!",
    helpful: 15,
  },
  {
    id: "r4",
    restaurantId: "2",
    userName: "David L.",
    userInitials: "DL",
    rating: 5,
    date: "2026-01-30",
    text: "The omakase experience was worth every penny. Chef Tanaka's skill is unmatched. Fresh, beautiful, and absolutely delicious.",
    helpful: 20,
  },
  {
    id: "r5",
    restaurantId: "2",
    userName: "Jennifer W.",
    userInitials: "JW",
    rating: 4,
    date: "2026-01-22",
    text: "Fantastic sushi, some of the best in the city. The only reason for 4 stars is the wait time, even with a reservation.",
    helpful: 6,
  },
  {
    id: "r6",
    restaurantId: "3",
    userName: "Carlos G.",
    userInitials: "CG",
    rating: 5,
    date: "2026-01-29",
    text: "Authentic Mexican food that reminds me of home! The al pastor tacos are incredible and the margaritas are strong. Love the live music on weekends!",
    helpful: 18,
  },
  {
    id: "r7",
    restaurantId: "3",
    userName: "Amanda T.",
    userInitials: "AT",
    rating: 4,
    date: "2026-01-18",
    text: "Great atmosphere and tasty food at reasonable prices. The guacamole made tableside is a fun experience. Gets very crowded though!",
    helpful: 11,
  },
];

export const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 11; hour <= 21; hour++) {
    for (let min = 0; min < 60; min += 15) {
      const time = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
      slots.push(time);
    }
  }
  return slots;
};

export const getAvailableSlots = (restaurantId: string, date: string): string[] => {
  // Simulate availability - some slots randomly unavailable
  const allSlots = generateTimeSlots();
  const seed = restaurantId.charCodeAt(0) + date.charCodeAt(date.length - 1);
  return allSlots.filter((_, index) => (index + seed) % 3 !== 0);
};