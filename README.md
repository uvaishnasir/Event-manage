# Event Management System

This is an Event Management System built using the MERN stack. The application allows users to create, manage, and RSVP to events, while providing features like reminders, notifications, and attendee management.

## Problem Solved

The system streamlines the process of organizing events, allowing users to:
- Create, read, update, and delete events.
- RSVP to events and manage attendees.
- Schedule and receive reminders via email.
- Track user activity and interactions with the system.

## Tech Stack

- **MongoDB**: Database for storing event and user information.
- **Express.js**: Backend framework for handling API requests.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: Server-side environment to handle backend operations.

### Additional Tools
- **Nodemailer**: For sending email notifications/reminders.
- **Mongoose**: For database interactions with MongoDB.

## Database Design

### Key Collections:
- **Users**: Stores user details and activity logs.
- **Events**: Stores event details, attendee lists, and reminder schedules.

### Relationships:
- Users can RSVP to multiple events.
- Events are linked to their creators and attendees.

## How to Run the Project

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd event-management-system
   ```

2. **Install dependencies in root directory and Backend directory**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm run both
   ```

---