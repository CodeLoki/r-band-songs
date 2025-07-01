# Band Songs React App

A modern React application for managing band songs, setlists, and gigs. Built with React, TypeScript, and Vite.

## Features

- Song management and organization
- Setlist creation and editing
- Gig scheduling and tracking
- Real-time data sync with Firebase
- Responsive design for desktop and mobile
- User authentication and permissions

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components and routing
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    Add the Firebase API key to your shell profile:

    ```bash
    # Add to ~/.zprofile (for macOS with zsh)
    export VITE_FIREBASE_API_KEY="your-firebase-api-key-here"
    ```

    Then reload your shell configuration:

    ```bash
    source ~/.zprofile
    ```

4. Start the development server:

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser to `http://localhost:5173`

## Environment Configuration

### Required Environment Variables

The application requires the following environment variable to be set:

- `VITE_FIREBASE_API_KEY` - Your Firebase project's API key

### Setting Environment Variables

#### For Development (macOS/Linux)

Add the environment variable to your shell profile:

```bash
# For zsh (default on macOS)
echo 'export VITE_FIREBASE_API_KEY="your-firebase-api-key-here"' >> ~/.zprofile
source ~/.zprofile

# For bash
echo 'export VITE_FIREBASE_API_KEY="your-firebase-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

#### For Production Deployment

Set the environment variable in your hosting platform's dashboard or deployment configuration.

### Getting Your Firebase API Key

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Copy the `apiKey` value from your web app configuration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Firebase** - Backend and authentication
- **Elastic UI** - Component library
- **React Router** - Navigation

## Contributing

This project follows the implementation tasks outlined in the project documentation.
