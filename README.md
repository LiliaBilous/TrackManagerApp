# Track Manager App

## ✨ Test Assignment Description
This is a test assignment aimed at building a single-page application (SPA) for managing music tracks.

### 🔍 Requirements Summary
- The main page (`/tracks`) available at `http://localhost:3000` is a list view with a **Create Track** button.
- All other views (e.g., create/edit forms) must be implemented as **modal windows**.
- **All data must be persisted via API** provided in the test archive (Node.js backend).
- **Loading indicators** should be shown during API interactions.

API Documentation is available at: http://localhost:8000/documentation

---

## ✅ Main Features Implemented

### 1. Create a Track (metadata only)
- Open modal with form.
- Fields: title, artist, album, genres (with + / x UI).
- Genres fetched from API.
- Client-side validation for required fields.
- Optional field for cover image URL with format validation.
- Default image shown if no cover provided.

### 2. Edit Track Metadata
- Edit modal opens with pre-filled values.
- Fields and validation same as creation.
- Changes are persisted and reflected immediately in UI.

### 3. Upload Audio File (separate flow)
- Upload modal for `.mp3` or `.wav`.
- File type and size validation.
- Ability to remove uploaded file.
- Uploaded files are playable via HTML `<audio>` tag.

### 4. Delete Track
- Single-track deletion with confirmation modal.
- UI and backend updated accordingly.

### 5. List View
- Paginated list of tracks.
- Sorting by title, artist, genre.
- Filtering by artist and genre.
- Debounced search across title, artist, album.
- Only one track can play audio at a time.

---

## ➕ Extra Features
- ☑️ **Bulk Delete**: Select multiple tracks or use "Select All" checkbox.
- ☑️ **Audio Waveform Visualization**: Inline waveform player via `wavesurfer.js`.
- ☑️ **Custom Toast Notifications**: Implemented with `vue-toastification`, enhanced with `data-testid` support.
- ☑️ **Full Testability Coverage**: All required `data-testid` attributes added as per task specs.

---

## 🚀 Local Project Setup

### ⚙ Prerequisites
- Node.js **v20.13.1** or higher
- npm **v9+**

### 0 Steps to Run
1. **Install dependencies:**
```bash
npm install
```

2. **Start frontend app:**
```bash
npm run dev
```

3. **Start backend (Node API server):**
Follow README.md instructions from the provided server archive(backend/README.md).

### 🔗 App URL
- http://localhost:3000

---

## 📊 Testability Checklist
All interactive elements include proper `data-testid` attributes:
- `tracks-header`, `create-track-button`, `search-input`, `sort-select`, `filter-genre`, `filter-artist`, `pagination`, `pagination-prev`, `pagination-next`
- `track-item-{id}`, `track-item-{id}-title`, `track-item-{id}-artist`
- `edit-track-{id}`, `delete-track-{id}`, `upload-track-{id}`
- Form fields: `track-form`, `input-title`, `input-artist`, `input-album`, `input-cover-image`, `genre-selector`, `submit-button`
- Validation: `error-title`, `error-artist`, `error-genre`, `error-{fieldname}`
- Dialogs: `confirm-dialog`, `confirm-delete`, `cancel-delete`
- Toasts: `toast-container`, `toast-success`, `toast-error`, `toast-info`
- Loaders: `loading-indicator`, `loading-tracks` (with `data-loading="true"`)
- Audio player: `audio-player-{id}`, `play-button-{id}`, `pause-button-{id}`, `audio-progress-{id}`
- Bulk ops: `select-mode-toggle`, `select-all`, `track-checkbox-{id}`, `bulk-delete-button`

---

## 🌟 Evaluation Notes
- Built using **Vue 3 + Vite**
- UI styled with pure CSS
- State management via **Pinia**
- Modular services: API, form validation, and notifications
- Code is maintainable, well-structured, and easy to extend

---

## 📚 License
MIT — For test use only.

---
