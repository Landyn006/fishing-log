# Fishing Log

## Project Overview

Fishing Log is a web application that helps anglers organize fishing trips and keep track of their catches. Users can record trip dates and locations, save fish species and measurements, and review their fishing history.

## MVP Features

- Record fishing trips with dates and locations.
- View previously recorded fishing trips.
- Record fish catches with species, weight, and length.
- Associate each catch with the correct fishing trip.
- Store information using a SQLite database.
- Run the backend using Docker.

## Technology Stack

- Frontend: React and Vite
- Backend: Node.js and Express
- Database: SQLite with better-sqlite3
- Containerization: Docker and Docker Compose
- Version Control: Git and GitHub

## Project Structure

- client/ - React frontend
- server/ - Express backend and SQLite database
- Dockerfile - Builds the backend container
- docker-compose.yml - Runs the backend container

## Running the Application Locally

### Backend

1. Open a terminal.
2. Navigate to the server folder.
3. Install dependencies:

   npm install

4. Start the backend:

   npm start

The API runs at http://localhost:3000.

### Frontend

1. Open another terminal.
2. Navigate to the client folder.
3. Install dependencies:

   npm install

4. Start the frontend:

   npm run dev

Open the local URL provided by Vite.

## Running with Docker

From the main project folder, run:

docker compose build

docker compose up -d

To check the container:

docker compose ps

To stop the container:

docker compose down

## Testing

The backend API can be tested using:

- http://localhost:3000/
- http://localhost:3000/api/trips
- http://localhost:3000/api/catches

The Docker container was successfully built and tested.

## Future Enhancements

- Track bait and lure information.
- Add fishing statistics and catch filters.
- Explore AI-powered fishing insights that help anglers identify patterns in their catches and receive personalized fishing recommendations.

## Project Status

The core MVP features have been implemented and tested. Docker containerization is complete. Cloud deployment and additional documentation are planned next.