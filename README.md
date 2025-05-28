# AI Autonomous Drone Portfolio Website

This is a modern portfolio website for showcasing AI-powered autonomous drone technology, featuring:

- Responsive design with modern UI/UX
- Node.js backend for form handling and API endpoints
- Dynamic content loading for drone specifications and projects

## Setup Instructions

### Prerequisites
- Node.js 14.x or later
- npm 6.x or later

### Installation

1. Clone or download this repository to your local machine
2. Open a terminal/command prompt in the project directory
3. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the Node.js server:
   ```
   npm start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Backend Features

The Node.js backend provides:

1. **Contact Form API**: Processes and stores form submissions
2. **Drone Data API**: Serves dynamic information about drone models
3. **Static File Serving**: Delivers the frontend assets

## Project Structure

- `/css`: Stylesheets for the website
- `/js`: Frontend JavaScript files
- `/images`: Images and media files
- `/data`: Directory for storing form submissions (created automatically)
- `server.js`: Main Node.js server file
- `package.json`: Project dependencies and scripts

## Customization

To customize the drone data, edit the array in `server.js` in the `/api/drones` endpoint.

## Contact Form

The contact form sends data to the backend API at `/api/contact`, which saves submissions to `data/submissions.json`.

---

© 2025 DroneVision - AI-Powered Autonomous Solutions
