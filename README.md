# alx-project-nexus
This is a documentation hub for my major learnings from the ALX ProDev Frontend Engineering program. I worked on a CinemaExpress, an AI powered app that allows users discover movies tailored to their personal tastes

### Video Presentation
**Please Watch**: https://screenrec.com/share/Qlr37LHph0

### Powerpoint presentation
**Please Read**: https://drive.google.com/file/d/1Jr_ZeqACvdtDby9kHDy9LWoORdSp5leM/view?usp=drive_link

## Overview
As part of my **Pro Frontend Development Program**, I researched the **Pro Backend Development track** to understand the skills, tools, and practices it emphasizes. This helped me see how backend knowledge complements frontend expertise in building full-stack applications.

## Major Learnings
- **Key Technologies:** Web Development, Mobile Development, Progressive Web Apps (PWA).  
- **Core Backend Tools & Concepts:** API design & integration, databases (SQL/NoSQL), authentication, system design, and deployment workflows.  
- **Frontend-Backend Link:** Importance of GraphQL, REST APIs, and TypeScript for seamless integration.  

## Challenges & Solutions (Researched)
- **Challenge:** Scaling APIs and handling complex data.  
  **Solution:** Adopt modular architecture, GraphQL for efficient queries, and caching strategies.  
- **Challenge:** Ensuring performance and reliability.  
  **Solution:** System design principles (load balancing, database optimization, microservices).  

## Best Practices & Takeaways
- Maintain clean, well-documented, and testable code.  
- Prioritize security (authentication, authorization, data protection).  
- Use version control and CI/CD pipelines for smooth collaboration.  
- Frontend and backend must align closely for successful full-stack delivery.  

---
# Frontend Requirements – Movie Recommendation App
Introduction
This document defines the frontend requirements for the Movie Recommendation App. The backend (Django API) provides authentication, movie data, ratings, and recommendations. The frontend will serve as the user interface, enabling seamless interaction with these backend services.

## User Roles
Guest (Unauthenticated User)
View landing page and app description
Register a new account
Log in
Authenticated User
Browse/search movies
Rate movies
View personalized recommendations
Manage profile (update password, view rated movies)
Log out

### Admin (Optional – via Django Admin)
Managed through backend admin panel (not core frontend)

## Functional Requirements
Authentication & Authorization
Sign up (username, email, password)
Log in with JWT/session tokens
Log out securely
Handle errors for invalid credentials
Movie Browsing & Search
Display movies in a list/grid with poster, title, genre, rating
Search movies by title
Filter movies by genre or year
Ratings & Reviews
Users can rate movies (1–5 stars)
Show average ratings for each movie
Update ratings in real time
Recommendations
Personalized recommendations for logged-in users
Popular/top-rated movies for all users

### User Profile
View and edit profile details
View rated movies
Update password

## UI/UX Requirements
Responsive and mobile-first design
Clean, minimal layout
Consistent theme (light/dark mode optional)

### Pages/Views
Landing Page – Welcome, description, CTA (login/register)
Sign Up Page – Registration form
Login Page – Login form with error handling
Dashboard – Movie listings, search & filter bar
Movie Details Page – Poster, description, genre, rating submission
Recommendations Page – Personalized suggestions
Profile Page – User info, rated movies, settings

## API Integration
Base URL: https://movie-recommendation-api-0thd.onrender.com/
Docs: /swagger/

Example Endpoints
Auth
POST /auth/register/ → Register
POST /auth/login/ → Login

Movies
GET /movies/ → List movies
GET /movies/{id}/ → Movie details

Ratings
POST /ratings/ → Submit rating
GET /ratings/user/{id}/ → Fetch user ratings

Recommendations
GET /recommendations/user/{id}/ → Personalized recommendations

## Suggested Tech Stack

Framework: React (Next.js optional)
Styling: TailwindCSS or Material UI
State Management: Redux Toolkit / React Query
Auth: JWT handling with Axios interceptors
Testing: Jest + React Testing Library

## Deliverables
Fully responsive frontend app
API integration with backend
Authentication & authorization workflows
Movie browsing, search, rating, and recommendations
Deployment (Netlify/Vercel) linked to backend
