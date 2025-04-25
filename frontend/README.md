# Music Track Manager

This is a single-page application for managing music tracks. It allows to create, edit, delete, filter, and upload tracks. The application uses Vue 3 with the Composition API and Vite, and interacts with a provided NodeJS backend via REST API.

## 🚀 Getting Started

### Requirements

- NodeJS v20.13.1
- NPM v10+

### Installation

```bash
npm install
```

### Run the Application

```bash
npm start
```

After starting, the application will be available at:

```
http://localhost:3000
```

The backend server must also be running (instructions provided in the backend README).
API documentation: http://localhost:8000/documentation

## 🛠 Technologies Used

- Vue 3 with Composition API
- Pinia for state management
- Vite as the build tool
- Plain CSS for styling


## ✅ Implemented Features

### Main Features

- **Track List View** with pagination, sorting, and filtering by genre and artist
- **Track Creation Modal**
  - Required fields: title, artist
  - Genre tags with add/remove functionality
  - Validation for required fields
  - Cover image URL validation with fallback image
- **Edit Track Modal**
  - Prefilled form with existing metadata
  - Real-time update of list view on save
- **File Upload Flow**
  - Upload and remove track audio files
  - File type and size validation
  - Inline audio player
- **Track Deletion**

### Extra Features

- ✅ Bulk delete of selected tracks
- ✅ Optimistic UI updates (UI updates immediately before server confirmation)
- ✅ Audiowave visualization for the currently played track (WaveSurfer.js)

## 📦 Testability

All required `data-testid` attributes are implemented across:

- Headers, buttons, filters
- Track list items
- Forms and inputs
- Notifications and loaders
- Audio controls
- Bulk selection controls

Loading states also include `data-loading="true"` and `aria-disabled` where appropriate.

## 📁 Folder Structure (Simplified)

```
src/
├── assets/         # Static assets like images, fonts, etc.
├── components/     # Reusable Vue components
├── views/          # Page-level components
├── stores/         # Pinia stores for state management
├── utils/          # Utility functions and helpers
├── services/       # API service calls and integrations
├── router/         # Vue Router configuration and route definitions
└── App.vue         # Root Vue component
```
```

## 📎 Notes

- Styling is done with plain CSS.
- Backend audio playback is mocked due to file unavailability from the server.