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

const cuisineImages: Record<string, string[]> = {
  Italian: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  ],
  Japanese: [
    "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&h=600&fit=crop",
  ],
  Mexican: [
    "https://images.unsplash.com/photo-1653501318880-8a222814c6d1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&h=600&fit=crop",
  ],
  American: [
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop",
  ],
  Chinese: [
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop",
  ],
  Mediterranean: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529543544277-750e1b0536f3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
  ],
  Indian: [
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&h=600&fit=crop",
  ],
  French: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
  ],
  Thai: [
    "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop",
  ],
  Korean: [
    "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?w=800&h=600&fit=crop",
  ],
  Vietnamese: [
    "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1576577445504-6af96477db52?w=800&h=600&fit=crop",
  ],
  Greek: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529543544277-750e1b0536f3?w=800&h=600&fit=crop",
  ],
  Spanish: [
    "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=600&fit=crop",
  ],
  Brazilian: [
    "https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop",
  ],
  Ethiopian: [
    "https://images.unsplash.com/photo-1567360425618-1594206f'?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
  ],
  Seafood: [
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop",
  ],
  Steakhouse: [
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop",
  ],
  Vegetarian: [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&h=600&fit=crop",
  ],
  BBQ: [
    "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop",
  ],
  Peruvian: [
    "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
  ],
  Turkish: [
    "https://images.unsplash.com/photo-1529543544277-750e1b0536f3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
  ],
  Lebanese: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1529543544277-750e1b0536f3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
  ],
  Caribbean: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
  ],
  Cafe: [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=600&fit=crop",
  ],
  Pizza: [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
  ],
  Brunch: [
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop",
  ],
  Fusion: [
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
  ],
};

const getGallery = (cuisine: string): string[] => {
  return cuisineImages[cuisine] || cuisineImages["American"];
};

const streetNames = [
  "Main St", "Oak Avenue", "Park Blvd", "Broadway", "First St", "Second Ave",
  "Third St", "Market St", "Spring St", "Summer Ave", "Winter Blvd", "Autumn Ln",
  "Cedar Rd", "Pine St", "Maple Ave", "Elm St", "Birch Rd", "Willow Way",
  "River Rd", "Lake Ave", "Ocean Blvd", "Mountain View", "Valley Rd", "Highland Ave",
  "Sunset Blvd", "Sunrise Ave", "Moonlight Dr", "Starlight Way", "Garden St", "Flower Ave"
];

const neighborhoods = [
  "Downtown", "Midtown", "Upper East", "West Village", "SoHo", "Chelsea",
  "Brooklyn Heights", "Greenwich Village", "East Village", "Tribeca",
  "Financial District", "Chinatown", "Little Italy", "Nolita", "Murray Hill"
];

const generateAddress = (index: number): string => {
  const num = 100 + (index * 23) % 900;
  const street = streetNames[index % streetNames.length];
  const neighborhood = neighborhoods[index % neighborhoods.length];
  return `${num} ${street}, ${neighborhood}, NY ${10000 + (index % 100)}`;
};

const generatePhone = (index: number): string => {
  const mid = 100 + (index * 7) % 900;
  const end = 1000 + (index * 13) % 9000;
  return `(555) ${mid}-${end}`;
};

const hoursOptions = [
  "Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm",
  "Daily: 11am-10pm",
  "Tue-Sun: 5pm-11pm",
  "Mon-Sat: 11:30am-10:30pm, Sun: 12pm-9pm",
  "Daily: 11:30am-10pm",
  "Wed-Mon: 12pm-9pm (Closed Tuesdays)",
  "Mon-Thu: 5pm-10pm, Fri-Sun: 12pm-11pm",
  "Daily: 10am-10pm",
];

const restaurantData: Array<{
  name: string;
  cuisine: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  description: string;
  dietaryOptions: string[];
  amenities: string[];
}> = [
  // Italian (10)
  { name: "Bella Italia", cuisine: "Italian", priceRange: "$$", description: "Authentic Italian cuisine in a cozy, romantic atmosphere. Our handmade pasta and wood-fired pizzas have been delighting guests for over 20 years.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wifi", "wheelchair", "outdoor"] },
  { name: "Trattoria Roma", cuisine: "Italian", priceRange: "$$$", description: "Classic Roman dishes served in an elegant setting. Our chef brings 30 years of culinary expertise from the heart of Italy.", dietaryOptions: ["vegetarian"], amenities: ["wifi", "wheelchair"] },
  { name: "Pasta Paradise", cuisine: "Italian", priceRange: "$", description: "Quick-service pasta with authentic Italian flavors. Fresh ingredients, fast service, incredible taste.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["wifi"] },
  { name: "Nonna's Kitchen", cuisine: "Italian", priceRange: "$$", description: "Family recipes passed down through generations. Just like grandmother used to make.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wheelchair"] },
  { name: "Tuscan Table", cuisine: "Italian", priceRange: "$$$$", description: "Fine dining Tuscan experience with an extensive wine cellar featuring over 500 Italian wines.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wifi", "wheelchair", "outdoor"] },
  { name: "Little Venice", cuisine: "Italian", priceRange: "$$", description: "Venetian-inspired seafood and pasta dishes in a canal-side atmosphere.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "wifi"] },
  { name: "Sicilian Sun", cuisine: "Italian", priceRange: "$", description: "Casual Sicilian street food and pizzeria with family-friendly vibes.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["wifi", "wheelchair"] },
  { name: "Milano Modern", cuisine: "Italian", priceRange: "$$$", description: "Contemporary Italian cuisine with a modern twist. Innovative dishes meet traditional flavors.", dietaryOptions: ["vegetarian", "gluten-free", "vegan"], amenities: ["wifi", "wheelchair"] },
  { name: "Amalfi Coast", cuisine: "Italian", priceRange: "$$$", description: "Coastal Italian dining with the freshest seafood and Mediterranean views.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "parking", "wifi"] },
  { name: "Florentine Feast", cuisine: "Italian", priceRange: "$$", description: "Hearty Florentine steaks and traditional Tuscan fare in a rustic setting.", dietaryOptions: ["gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  
  // Japanese (10)
  { name: "Tokyo Sushi Bar", cuisine: "Japanese", priceRange: "$$$", description: "Premium omakase experience with the freshest fish flown in daily from Tokyo's Tsukiji Market.", dietaryOptions: ["gluten-free"], amenities: ["wifi", "wheelchair"] },
  { name: "Sakura Garden", cuisine: "Japanese", priceRange: "$$", description: "Traditional Japanese dining with private tatami rooms and a serene garden view.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["parking", "wifi"] },
  { name: "Ramen House", cuisine: "Japanese", priceRange: "$", description: "Authentic tonkotsu ramen slow-cooked for 18 hours. The real deal.", dietaryOptions: ["vegetarian"], amenities: ["wifi"] },
  { name: "Izakaya Night", cuisine: "Japanese", priceRange: "$$", description: "Japanese gastropub with sake flights and small plates perfect for sharing.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi", "outdoor"] },
  { name: "Omakase Dreams", cuisine: "Japanese", priceRange: "$$$$", description: "Exclusive 8-seat sushi counter with master chef preparing seasonal delicacies.", dietaryOptions: ["gluten-free"], amenities: ["wheelchair"] },
  { name: "Yakitori Alley", cuisine: "Japanese", priceRange: "$", description: "Charcoal-grilled skewers and cold beer in a lively atmosphere.", dietaryOptions: ["gluten-free"], amenities: ["outdoor"] },
  { name: "Tempura Temple", cuisine: "Japanese", priceRange: "$$", description: "Light, crispy tempura prepared to perfection with seasonal vegetables and seafood.", dietaryOptions: ["vegetarian"], amenities: ["wifi", "wheelchair"] },
  { name: "Kyoto Kitchen", cuisine: "Japanese", priceRange: "$$$", description: "Kaiseki-inspired multi-course dining showcasing the art of Japanese cuisine.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "Soba Noodle Co", cuisine: "Japanese", priceRange: "$", description: "Handmade buckwheat noodles served hot or cold with traditional accompaniments.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["wifi"] },
  { name: "Teppan Grill", cuisine: "Japanese", priceRange: "$$$", description: "Theatrical teppanyaki dining with skilled chefs cooking right at your table.", dietaryOptions: ["gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  
  // Mexican (8)
  { name: "La Cantina", cuisine: "Mexican", priceRange: "$", description: "Vibrant Mexican cantina serving authentic street tacos, fresh guacamole, and over 100 premium tequilas.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["parking", "outdoor", "wifi"] },
  { name: "Casa Oaxaca", cuisine: "Mexican", priceRange: "$$", description: "Regional Oaxacan cuisine featuring mole negro and mezcal tastings.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["outdoor", "wifi"] },
  { name: "Taqueria Express", cuisine: "Mexican", priceRange: "$", description: "Fast, fresh, and flavorful tacos just like the streets of Mexico City.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "El Mariachi", cuisine: "Mexican", priceRange: "$$", description: "Festive dining with live mariachi music and traditional Mexican celebrations.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "outdoor", "wifi", "wheelchair"] },
  { name: "Baja Fresh", cuisine: "Mexican", priceRange: "$", description: "Baja-style fish tacos and seafood with California flair.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "wifi"] },
  { name: "Hacienda Grill", cuisine: "Mexican", priceRange: "$$$", description: "Upscale Mexican dining with contemporary interpretations of classic dishes.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["parking", "wifi", "wheelchair", "outdoor"] },
  { name: "Puebla Kitchen", cuisine: "Mexican", priceRange: "$$", description: "Home-style Pueblan cooking with recipes from abuela's kitchen.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wifi"] },
  { name: "Mezcaleria", cuisine: "Mexican", priceRange: "$$", description: "Mezcal bar and tapas with over 200 artisanal mezcals to explore.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["outdoor", "wifi"] },
  
  // American (10)
  { name: "The Steakhouse", cuisine: "American", priceRange: "$$$$", description: "Prime dry-aged steaks, world-class wine selection, and impeccable service.", dietaryOptions: ["gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "BBQ Smokehouse", cuisine: "American", priceRange: "$$", description: "Low and slow smoked meats using traditional Texas methods. Worth the drive!", dietaryOptions: ["gluten-free"], amenities: ["parking", "outdoor", "wheelchair"] },
  { name: "Classic Diner", cuisine: "American", priceRange: "$", description: "All-American comfort food 24/7. Burgers, shakes, and apple pie.", dietaryOptions: ["vegetarian"], amenities: ["wifi", "wheelchair"] },
  { name: "Farm to Table", cuisine: "American", priceRange: "$$$", description: "Seasonal, locally-sourced New American cuisine celebrating regional farmers.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "wifi", "wheelchair"] },
  { name: "Burger Joint", cuisine: "American", priceRange: "$", description: "Gourmet burgers with creative toppings and hand-cut fries.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi"] },
  { name: "Southern Comfort", cuisine: "American", priceRange: "$$", description: "Soul food classics: fried chicken, mac & cheese, collard greens, and sweet tea.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "New England Kitchen", cuisine: "American", priceRange: "$$$", description: "Fresh lobster, clam chowder, and New England coastal favorites.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "wifi", "parking"] },
  { name: "Roadhouse Grill", cuisine: "American", priceRange: "$$", description: "Casual steaks, ribs, and cold beer in a lively roadhouse atmosphere.", dietaryOptions: ["gluten-free"], amenities: ["parking", "outdoor", "wifi"] },
  { name: "Brunch Club", cuisine: "American", priceRange: "$$", description: "Weekend brunch destination with bottomless mimosas and creative egg dishes.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "wifi", "wheelchair"] },
  { name: "Gastro Pub", cuisine: "American", priceRange: "$$", description: "Elevated pub fare with craft beers and creative cocktails.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi", "outdoor"] },
  
  // Chinese (8)
  { name: "Golden Dragon", cuisine: "Chinese", priceRange: "$$", description: "Traditional Cantonese cuisine with dim sum served daily. Family-owned for three generations.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["wifi", "wheelchair"] },
  { name: "Sichuan Fire", cuisine: "Chinese", priceRange: "$$", description: "Authentic Sichuan cuisine with bold, numbing spices that pack serious heat.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["wifi"] },
  { name: "Dumpling House", cuisine: "Chinese", priceRange: "$", description: "Handmade dumplings in every variety. Watch our dumpling masters at work.", dietaryOptions: ["vegetarian"], amenities: ["wifi", "wheelchair"] },
  { name: "Peking Palace", cuisine: "Chinese", priceRange: "$$$", description: "Elegant Northern Chinese dining featuring our famous Peking duck carved tableside.", dietaryOptions: ["gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "Shanghai Nights", cuisine: "Chinese", priceRange: "$$", description: "Shanghainese cuisine and cocktails in an Art Deco setting.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi", "outdoor"] },
  { name: "Wok Express", cuisine: "Chinese", priceRange: "$", description: "Fast wok-fired dishes made fresh to order. In and out in 15 minutes.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Tea Garden", cuisine: "Chinese", priceRange: "$$", description: "Cantonese dim sum and traditional Chinese tea service in a tranquil garden setting.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["outdoor", "wifi", "wheelchair"] },
  { name: "Hong Kong Harbor", cuisine: "Chinese", priceRange: "$$$", description: "Seafood-focused Cantonese dining with live tanks and harbor views.", dietaryOptions: ["gluten-free"], amenities: ["parking", "wifi", "wheelchair", "outdoor"] },
  
  // Mediterranean (6)
  { name: "Mediterranean Grill", cuisine: "Mediterranean", priceRange: "$$", description: "Fresh Mediterranean flavors with house-made hummus, grilled kebabs, and authentic specialties.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "wifi", "wheelchair"] },
  { name: "Olive Tree", cuisine: "Mediterranean", priceRange: "$", description: "Quick Mediterranean bowls and wraps with fresh, healthy ingredients.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Blue Sea", cuisine: "Mediterranean", priceRange: "$$$", description: "Coastal Mediterranean seafood with Greek and Turkish influences.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "parking", "wifi"] },
  { name: "Falafel King", cuisine: "Mediterranean", priceRange: "$", description: "Crispy falafel, creamy hummus, and fresh pita made hourly.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Mezze House", cuisine: "Mediterranean", priceRange: "$$", description: "Shareable mezze plates and Mediterranean wines in a social atmosphere.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "wifi", "wheelchair"] },
  { name: "Cyprus Gardens", cuisine: "Mediterranean", priceRange: "$$", description: "Cypriot specialties including halloumi, souvlaki, and traditional meze.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["outdoor", "wifi", "parking"] },
  
  // Indian (8)
  { name: "Curry Palace", cuisine: "Indian", priceRange: "$", description: "Aromatic curries, fresh naan from our tandoor oven, and a legendary lunch buffet.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi", "wheelchair"] },
  { name: "Tandoor House", cuisine: "Indian", priceRange: "$$", description: "Specializing in tandoor-cooked meats and fresh breads with modern presentation.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wifi"] },
  { name: "Spice Route", cuisine: "Indian", priceRange: "$$$", description: "Regional Indian cuisine from Kerala to Kashmir, celebrating India's diverse flavors.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi", "wheelchair", "outdoor"] },
  { name: "Bombay Bistro", cuisine: "Indian", priceRange: "$$", description: "Mumbai street food favorites elevated with premium ingredients.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["wifi"] },
  { name: "Masala Kitchen", cuisine: "Indian", priceRange: "$", description: "Fast-casual Indian with customizable bowls and fresh-made chai.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Royal India", cuisine: "Indian", priceRange: "$$$", description: "Elegant North Indian dining with attentive service and royal Mughlai recipes.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "Chennai Express", cuisine: "Indian", priceRange: "$", description: "South Indian dosas, idlis, and filter coffee in an authentic express format.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Goa Beach", cuisine: "Indian", priceRange: "$$", description: "Goan coastal cuisine with Portuguese influences and tropical cocktails.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "wifi"] },
  
  // French (6)
  { name: "Le Petit Bistro", cuisine: "French", priceRange: "$$$", description: "Classic French bistro fare in an intimate setting. Escargot, coq au vin, and crème brûlée.", dietaryOptions: ["vegetarian"], amenities: ["wifi", "outdoor"] },
  { name: "Maison Blanche", cuisine: "French", priceRange: "$$$$", description: "Fine French dining with seasonal tasting menus and an award-winning wine program.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "Café Paris", cuisine: "French", priceRange: "$$", description: "Parisian café experience with croissants, quiche, and people-watching.", dietaryOptions: ["vegetarian"], amenities: ["outdoor", "wifi"] },
  { name: "Brasserie Lyon", cuisine: "French", priceRange: "$$", description: "Lyonnaise cuisine: charcuterie, rich sauces, and hearty French comfort food.", dietaryOptions: ["gluten-free"], amenities: ["wifi", "wheelchair"] },
  { name: "Provence Kitchen", cuisine: "French", priceRange: "$$$", description: "Sun-drenched flavors of Southern France with lavender, olive oil, and fresh herbs.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["outdoor", "parking", "wifi"] },
  { name: "Patisserie Belle", cuisine: "French", priceRange: "$$", description: "French patisserie and tearoom with exquisite pastries and light fare.", dietaryOptions: ["vegetarian"], amenities: ["wifi"] },
  
  // Thai (6)
  { name: "Thai Orchid", cuisine: "Thai", priceRange: "$$", description: "Authentic Thai cuisine with dishes from all four regions of Thailand.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi", "wheelchair"] },
  { name: "Bangkok Street", cuisine: "Thai", priceRange: "$", description: "Thai street food classics: pad thai, papaya salad, and mango sticky rice.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Coconut Thai", cuisine: "Thai", priceRange: "$$", description: "Creamy coconut curries and aromatic soups in a modern setting.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "wifi"] },
  { name: "Siam Palace", cuisine: "Thai", priceRange: "$$$", description: "Royal Thai cuisine with elaborate presentations and complex flavors.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "Tom Yum House", cuisine: "Thai", priceRange: "$", description: "Specializing in soups and noodles. Our tom yum is legendary.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Chiang Mai Kitchen", cuisine: "Thai", priceRange: "$$", description: "Northern Thai specialties including khao soi and sai oua.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi", "outdoor"] },
  
  // Korean (6)
  { name: "Seoul Kitchen", cuisine: "Korean", priceRange: "$$", description: "Traditional Korean BBQ with premium cuts and banchan spread.", dietaryOptions: ["gluten-free"], amenities: ["parking", "wifi"] },
  { name: "Kimchi House", cuisine: "Korean", priceRange: "$", description: "Home-style Korean comfort food and our famous 100-day aged kimchi.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "K-BBQ Premium", cuisine: "Korean", priceRange: "$$$", description: "Premium Korean BBQ with Wagyu beef and VIP private rooms.", dietaryOptions: ["gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "Bibimbap Bowl", cuisine: "Korean", priceRange: "$", description: "Fast-casual Korean bowls with fresh vegetables and gochujang.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Pojangmacha", cuisine: "Korean", priceRange: "$$", description: "Late-night Korean drinking food: fried chicken, tteokbokki, and soju.", dietaryOptions: ["vegetarian"], amenities: ["outdoor", "wifi"] },
  { name: "Hanguk Garden", cuisine: "Korean", priceRange: "$$", description: "Garden-setting Korean dining with seasonal vegetables and traditional recipes.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "parking", "wifi"] },
  
  // Vietnamese (5)
  { name: "Pho House", cuisine: "Vietnamese", priceRange: "$", description: "Steaming bowls of pho with 24-hour bone broth and fresh herbs.", dietaryOptions: ["gluten-free"], amenities: ["wifi"] },
  { name: "Saigon Kitchen", cuisine: "Vietnamese", priceRange: "$$", description: "Southern Vietnamese cuisine with vibrant flavors and fresh ingredients.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi", "outdoor"] },
  { name: "Banh Mi Shop", cuisine: "Vietnamese", priceRange: "$", description: "Crusty baguettes with traditional Vietnamese fillings. Quick and delicious.", dietaryOptions: ["vegetarian"], amenities: ["wifi"] },
  { name: "Hanoi House", cuisine: "Vietnamese", priceRange: "$$", description: "Northern Vietnamese specialties with refined, subtle flavors.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi", "wheelchair"] },
  { name: "Viet Garden", cuisine: "Vietnamese", priceRange: "$$", description: "Fresh Vietnamese cuisine with a garden terrace and craft cocktails.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "wifi", "parking"] },
  
  // Greek (4)
  { name: "Santorini Blue", cuisine: "Greek", priceRange: "$$", description: "Greek taverna with ocean views, grilled seafood, and flowing ouzo.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["outdoor", "wifi", "parking"] },
  { name: "Athens Grill", cuisine: "Greek", priceRange: "$", description: "Fast-casual Greek gyros, souvlaki, and salads made fresh.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi"] },
  { name: "Olympus Restaurant", cuisine: "Greek", priceRange: "$$$", description: "Fine Greek dining celebrating the Mediterranean diet.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["parking", "wifi", "wheelchair", "outdoor"] },
  { name: "Mykonos Nights", cuisine: "Greek", priceRange: "$$", description: "Greek party atmosphere with live music, dancing, and plate smashing!", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["outdoor", "parking"] },
  
  // Spanish (4)
  { name: "Tapas & Vino", cuisine: "Spanish", priceRange: "$$", description: "Authentic Spanish tapas with an extensive sherry and wine selection.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["outdoor", "wifi"] },
  { name: "Barcelona Nights", cuisine: "Spanish", priceRange: "$$$", description: "Catalan cuisine and molecular gastronomy in a stylish setting.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi", "wheelchair"] },
  { name: "Paella House", cuisine: "Spanish", priceRange: "$$", description: "Wood-fired paella cooked to order with the crispiest socarrat.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "wifi", "parking"] },
  { name: "Churros & Chocolate", cuisine: "Spanish", priceRange: "$", description: "Spanish café serving churros, tapas, and strong café con leche.", dietaryOptions: ["vegetarian"], amenities: ["wifi"] },
  
  // Other cuisines (13 more to reach 100)
  { name: "Veggie Haven", cuisine: "Vegetarian", priceRange: "$$", description: "Creative plant-based cuisine that even meat-lovers adore. Organic and locally-sourced.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi", "outdoor", "wheelchair"] },
  { name: "Ethiopian Kitchen", cuisine: "Ethiopian", priceRange: "$", description: "Communal dining with injera bread and aromatic stews. Eat with your hands!", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi"] },
  { name: "Peruvian Flame", cuisine: "Peruvian", priceRange: "$$", description: "Ceviche, lomo saltado, and pisco sours in a vibrant atmosphere.", dietaryOptions: ["gluten-free"], amenities: ["wifi", "outdoor"] },
  { name: "Turkish Delight", cuisine: "Turkish", priceRange: "$$", description: "Kebabs, mezze, and Turkish coffee in an ornate setting.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi", "outdoor", "parking"] },
  { name: "Beirut Nights", cuisine: "Lebanese", priceRange: "$$", description: "Lebanese mezze, shawarma, and hookahs in a social atmosphere.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "wifi"] },
  { name: "Caribbean Breeze", cuisine: "Caribbean", priceRange: "$", description: "Jerk chicken, plantains, and rum punch bring island vibes.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "wifi"] },
  { name: "Brazilian Churrasco", cuisine: "Brazilian", priceRange: "$$$", description: "All-you-can-eat Brazilian steakhouse with rodizio service.", dietaryOptions: ["gluten-free"], amenities: ["parking", "wifi", "wheelchair"] },
  { name: "Seafood Shack", cuisine: "Seafood", priceRange: "$$", description: "Fresh catches daily with lobster rolls, oysters, and fried clams.", dietaryOptions: ["gluten-free"], amenities: ["outdoor", "wifi"] },
  { name: "Pizza Napoli", cuisine: "Pizza", priceRange: "$", description: "Neapolitan pizza from a 900° wood-fired oven. Simple perfection.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["wifi", "outdoor"] },
  { name: "Fusion Kitchen", cuisine: "Fusion", priceRange: "$$$", description: "Creative fusion cuisine blending Asian and Western techniques.", dietaryOptions: ["vegetarian", "gluten-free"], amenities: ["wifi", "outdoor"] },
  { name: "Sunrise Brunch", cuisine: "Brunch", priceRange: "$$", description: "All-day brunch with organic eggs, avocado toast, and craft coffee.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["outdoor", "wifi", "wheelchair"] },
  { name: "The Coffee House", cuisine: "Cafe", priceRange: "$", description: "Third-wave coffee, fresh pastries, and light lunch fare.", dietaryOptions: ["vegetarian", "vegan"], amenities: ["wifi", "outdoor"] },
  { name: "Vegan Planet", cuisine: "Vegetarian", priceRange: "$$", description: "100% vegan menu proving plant-based can be exciting and delicious.", dietaryOptions: ["vegetarian", "vegan", "gluten-free"], amenities: ["wifi", "wheelchair"] },
];

export const restaurants: Restaurant[] = restaurantData.map((data, index) => {
  const id = (index + 1).toString();
  const rating = Math.round((3.8 + Math.random() * 1.2) * 10) / 10;
  const reviewCount = 50 + Math.floor(Math.random() * 450);
  const distance = (0.3 + Math.random() * 9.7).toFixed(1);
  const availableToday = Math.random() > 0.2; // 80% available
  
  return {
    id,
    name: data.name,
    cuisine: data.cuisine,
    priceRange: data.priceRange,
    rating,
    reviewCount,
    image: getGallery(data.cuisine)[0],
    gallery: getGallery(data.cuisine),
    address: generateAddress(index),
    phone: generatePhone(index),
    hours: hoursOptions[index % hoursOptions.length],
    amenities: data.amenities,
    distance,
    description: data.description,
    dietaryOptions: data.dietaryOptions,
    availableToday,
  };
});

export const reviews: Review[] = [
  { id: "r1", restaurantId: "1", userName: "Sarah M.", userInitials: "SM", rating: 5, date: "2026-01-28", text: "Absolutely incredible pasta! The carbonara was the best I've ever had outside of Rome. The atmosphere is romantic and cozy, perfect for a date night.", helpful: 12 },
  { id: "r2", restaurantId: "1", userName: "Michael R.", userInitials: "MR", rating: 4, date: "2026-01-25", text: "Great food and service. The tiramisu is a must-try! Only giving 4 stars because it was a bit noisy on a Saturday night.", helpful: 8 },
  { id: "r3", restaurantId: "1", userName: "Emily K.", userInitials: "EK", rating: 5, date: "2026-01-20", text: "We celebrated our anniversary here and it was perfect. The staff went above and beyond to make it special.", helpful: 15 },
  { id: "r4", restaurantId: "2", userName: "David L.", userInitials: "DL", rating: 5, date: "2026-01-30", text: "The omakase experience was worth every penny. Chef Tanaka's skill is unmatched.", helpful: 20 },
  { id: "r5", restaurantId: "2", userName: "Jennifer W.", userInitials: "JW", rating: 4, date: "2026-01-22", text: "Fantastic sushi, some of the best in the city. The only reason for 4 stars is the wait time.", helpful: 6 },
  { id: "r6", restaurantId: "3", userName: "Carlos G.", userInitials: "CG", rating: 5, date: "2026-01-29", text: "Authentic Mexican food that reminds me of home! The al pastor tacos are incredible.", helpful: 18 },
  { id: "r7", restaurantId: "3", userName: "Amanda T.", userInitials: "AT", rating: 4, date: "2026-01-18", text: "Great atmosphere and tasty food at reasonable prices. Gets very crowded though!", helpful: 11 },
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
  const allSlots = generateTimeSlots();
  const seed = parseInt(restaurantId) + date.charCodeAt(date.length - 1);
  return allSlots.filter((_, index) => (index + seed) % 3 !== 0);
};
