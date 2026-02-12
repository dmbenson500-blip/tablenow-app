# TableNow - Restaurant Reservation Platform
## Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** February 2026  

---

## 1. Executive Summary

TableNow is a modern restaurant reservation and discovery platform that connects diners with local restaurants. The application enables users to search, discover, and book tables at restaurants in real-time while providing restaurants with efficient reservation management tools.

**Primary Goal:** Create a feature-rich, testable application that provides comprehensive QA learning opportunities across functional, performance, security, and UX testing domains.

---

## 2. Target Users

### Primary Users (Diners)
- Age: 25-55
- individuals who regularly dine out
- Value convenience and real-time availability
- Use mobile and desktop devices interchangeably

### Secondary Users (Restaurant Staff)
- Restaurant managers and hosts
- Need efficient reservation management
- Require real-time table status updates

---

## 3. Core Features & User Stories

### 3.1 User Authentication & Profiles

#### Feature: User Registration
**User Story:** As a new user, I want to create an account so that I can make reservations and save my preferences.

**Acceptance Criteria:**
- Users can register with email/password or social login (Google, Apple)
- Email verification required before first booking
- Password must meet security requirements (8+ chars, mixed case, number, special char)
- User profile includes: name, email, phone, dietary restrictions, preferences
- Profile photo upload optional (max 5MB, jpg/png only)

#### Feature: User Login
**User Story:** As a returning user, I want to securely log in so that I can access my reservations.

**Acceptance Criteria:**
- Login with email/password or social accounts
- "Remember me" option (30-day session)
- "Forgot password" flow with email reset link
- Account lockout after 5 failed attempts (15-minute cooldown)
- Session timeout after 24 hours of inactivity

---

### 3.2 Restaurant Discovery & Search

#### Feature: Restaurant Browse & Search
**User Story:** As a diner, I want to discover restaurants based on my preferences so that I can find the perfect place to eat.

**Acceptance Criteria:**
- Search by restaurant name, cuisine type, location, or keyword
- Filter by: cuisine type, price range ($-$$$$), distance, rating, party size availability
- Sort by: relevance, rating, distance, price, newest
- Display results in grid or list view
- Show key info on cards: name, cuisine, rating, price range, distance, photo
- "Near Me" geolocation-based search (with permission)
- Search results load within 2 seconds for 100+ restaurants

#### Feature: Restaurant Detail Page
**User Story:** As a diner, I want to view detailed restaurant information so that I can make an informed booking decision.

**Acceptance Criteria:**
- Display: name, cuisine, description, address with map, hours, price range, rating
- Photo gallery (min 3 photos, max 20)
- Menu link/viewer (PDF or image gallery)
- Amenities (parking, outdoor seating, WiFi, wheelchair accessible)
- Dietary options (vegetarian, vegan, gluten-free, etc.)
- User reviews and ratings (5-star system)
- Real-time availability calendar for next 30 days
- "Call Restaurant" and "Get Directions" buttons

### 3.3 Reservation System

#### Feature: Table Booking
**User Story:** As a diner, I want to book a table for my desired date, time, and party size so that I can secure my dining experience.

**Acceptance Criteria:**
- Select date (today to 60 days ahead)
- Select time in 15-minute increments during restaurant hours
- Select party size (1-20 guests)
- View real-time table availability before confirming
- Add special requests (birthday, anniversary, dietary needs, seating preference)
- Require phone number confirmation
- Display booking confirmation with reservation number
- Send confirmation email within 1 minute
- Send SMS reminder 24 hours before reservation (opt-in)

#### Feature: Reservation Management
**User Story:** As a diner, I want to view, modify, or cancel my reservations so that I can manage my plans.

**Acceptance Criteria:**
- "My Reservations" page shows upcoming and past bookings
- Upcoming reservations show: restaurant, date, time, party size, status
- Modify reservation (date, time, party size) up to 2 hours before
- Cancel reservation up to 2 hours before
- Cancellation confirmation required (prevent accidental cancels)
- Show cancellation policy before confirming
- Past reservations show option to rebook or review

#### Feature: Waitlist
**User Story:** As a diner, I want to join a waitlist when my desired time is fully booked so that I can still get a table if one opens up.

**Acceptance Criteria:**
- "Join Waitlist" option appears for fully booked slots
- User receives confirmation of waitlist position
- Notification sent if table becomes available (30-minute window to claim)
- Automatic removal from waitlist after 30 minutes without response
- User can remove themselves from waitlist anytime

---

### 3.4 Reviews & Ratings

#### Feature: Restaurant Reviews
**User Story:** As a diner, I want to read and write reviews so that I can share my experience and learn from others.

**Acceptance Criteria:**
- Only users who have dined (past reservation) can leave reviews
- One review per reservation
- Reviews include: 5-star rating, title (max 100 chars), description (max 1000 chars)
- Optional: photo upload (max 5 photos, 5MB each)
- Reviews display with user name, date, rating, text, photos
- Overall restaurant rating calculates from all reviews
- Sort reviews by: most recent, highest rated, lowest rated
- Flag inappropriate reviews (moderation queue for admin)

---

### 3.5 User Favorites & History

#### Feature: Favorite Restaurants
**User Story:** As a diner, I want to save my favorite restaurants so that I can easily find and book them again.

**Acceptance Criteria:**
- Heart icon to add/remove favorites from any restaurant card or detail page
- "My Favorites" page shows all saved restaurants
- Visual indicator on cards showing favorited status
- Remove from favorites with confirmation
- No limit on number of favorites

#### Feature: Booking History
**User Story:** As a diner, I want to view my past dining experiences so that I can rebook or review them.

**Acceptance Criteria:**
- Display all past reservations (completed, cancelled, no-show)
- Show restaurant name, date, party size, status
- "Book Again" quick action
- "Write Review" action for unreviewed completed reservations
- Filter by date range, restaurant, or status
- Export booking history as CSV

### 3.6 Special Features

#### Feature: "Surprise Me" Random Restaurant Picker
**User Story:** As an indecisive diner, I want the app to suggest a random restaurant so that I can discover new places.

**Acceptance Criteria:**
- Button displays random restaurant based on user preferences
- Filters: cuisine preference, price range, distance radius
- Shows restaurant card with image and key details
- "Try Another" button to get new suggestion
- "Book Now" direct action from suggestion

#### Feature: Group Booking Poll
**User Story:** As a diner organizing group dining, I want to create a poll so that my group can vote on restaurant choices.

**Acceptance Criteria:**
- Create poll with 2-5 restaurant options
- Set voting deadline (1-7 days)
- Generate shareable link for poll
- Friends vote without account (optional)
- Display results after deadline
- Winner auto-suggested for booking

#### Feature: Split Bill Calculator
**User Story:** As a diner, I want to calculate bill splits so that I can easily divide costs with my party.

**Acceptance Criteria:**
- Enter total bill amount
- Select number of people
- Choose split type: equal, by item, custom
- Calculate tip percentage (15%, 18%, 20%, custom)
- Display per-person amount
- Share breakdown via text/email

## 4. Restaurant Management Dashboard (Admin)

### Feature: Reservation Management (Restaurant View)
**User Story:** As a restaurant manager, I want to manage my reservations so that I can optimize table turnover.

**Acceptance Criteria:**
- Dashboard shows all reservations for selected date
- Time slot view (hour-by-hour) and table view
- Mark reservations: confirmed, seated, completed, no-show, cancelled
- Manual reservation creation (walk-ins, phone bookings)
- Block time slots for private events
- Set table availability and capacity
- View waitlist and approve/notify waiters

## 5. Technical Requirements

### 5.1 Performance
- Page load time: < 2 seconds (3G connection)
- Search results: < 2 seconds for 1000+ restaurants
- Image optimization: Progressive JPEG/WebP formats
- API response time: < 500ms for 95th percentile
- Support 1000+ concurrent users

### 5.2 Security
- HTTPS only (TLS 1.3)
- Input sanitization and validation
- SQL injection prevention
- XSS protection
- CSRF tokens for state-changing operations
- Rate limiting: 100 requests/minute per user
- PCI DSS compliance for payment processing
- Data encryption at rest and in transit

### 5.3 Browser & Device Support
- Desktop: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile: iOS Safari 14+, Chrome Android 90+
- Responsive design: 320px to 2560px width
- Touch-optimized for mobile interactions
- Offline mode: View past reservations without connectivity

### 5.4 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast (4.5:1 minimum)
- Alt text for all images
- ARIA labels for interactive elements

### 5.5 Data & Analytics
- Track user behavior: searches, views, bookings, cancellations
- A/B testing capability for UI variations
- Error logging and monitoring
- Performance monitoring (Core Web Vitals)
- Conversion funnel tracking

## 6. API Endpoints Reference (for API Testing)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation

### Restaurants
- `GET /api/restaurants` - List restaurants (with filters/pagination)
- `GET /api/restaurants/:id` - Restaurant details
- `GET /api/restaurants/:id/availability` - Check availability
- `GET /api/restaurants/search` - Search restaurants

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/:id` - Get reservation details
- `PUT /api/reservations/:id` - Modify reservation
- `DELETE /api/reservations/:id` - Cancel reservation
- `GET /api/users/me/reservations` - User's reservations

### Reviews
- `POST /api/restaurants/:id/reviews` - Create review
- `GET /api/restaurants/:id/reviews` - Get restaurant reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### User
- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update profile
- `GET /api/users/me/favorites` - Get favorites
- `POST /api/users/me/favorites/:restaurantId` - Add favorite
- `DELETE /api/users/me/favorites/:restaurantId` - Remove favorite

---


