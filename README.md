# Task Management App
<img width="2534" height="1288" alt="image" src="https://github.com/user-attachments/assets/bd657349-b157-4af1-b1fa-1fa83acaed73" />

Task Management App with Vue.js

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### env variables
For local development you need to add these variables to your env file
```
VITE_APP_BASE_URL=https://kbybdtacoqvgcijrkzkv.supabase.co/rest/v1/
VITE_APP_AUTH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWJkdGFjb3F2Z2NpanJremt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMzUwNjAsImV4cCI6MjA3MTYxMTA2MH0.SAF_9jupuaVLHq0l7Zbew7t6avUdg_UkdVGqLZmHTQE
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
## Framework and Tools
- Farmework: Vue.js
- Ui library: Nuxt Ui
- Styling: Tailwindcss
- State management: Pinia
- Data fetching: TanstackQuery
## Components Overview
```
.
└── src/
    └── components/
        ├── global/
        │   └── navbar
        ├── tasks/
        │   ├── task-card
        │   ├── task-category
        │   ├── task-delete-modal
        │   ├── task-form
        │   ├── task-modal
        │   ├── task-priority
        │   └── task-skeleton
        └── ui/
            ├── form/
            │   └── date-picker
            └── modal
```
## Features

**Task List View**
- Display tasks in cards/list with title, description, category, completion status
- Show task images with proper loading and error states
- Category-based filtering (dropdown or tabs)
- Loading states during data fetching
- Add Task button/CTA

**Add/Edit Task Form**
- Form validation with error messages
- Save/Cancel functionality
- Show loading state during submission

**Task Detail View**
- Display full task information
- Toggle completion status
- Edit and Delete actions
- Handle image display with fallback
- Navigate back to list

**Category Integration**
- Fetch and display categories from API
- Use category colors for visual distinction
- Display category icons where appropriate
