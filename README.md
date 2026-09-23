# 🐧 Ubuntu Web OS & Workspace Explorer

## 📝 Summary

Ubuntu Web OS & Workspace Explorer is a browser-based desktop environment and workspace file management system built to mimic the look, feel, and functionality of the Ubuntu Linux operating system. It allows users to manage multiple top-level workspaces, navigate through deeply nested file and folder hierarchies, and edit text documents directly in the browser. Powered by client-side IndexedDB persistence, all user workspaces, directory trees, and file contents remain saved locally across browser sessions.

---

## ✨ Features

### 🖥️ Ubuntu Desktop Environment

- **Top System Bar:** Displays system indicators, workspace information, user controls, and quick action options.
- **Collapsible Dock & Sidebar:** Offers icon-based quick navigation, user profile avatar popovers, and collapsible states.
- **Desktop Workspace View:** A responsive wallpaper view supporting active file displays, directory grid layouts, and context menus.

### 📁 Multi-Workspace & File System Management

- **Workspace Isolation:** Create and switch between multiple independent workspaces at the top level.
- **Nested Directory Tree:** Organize files and subfolders endlessly using relative parent-child relational structures.
- **Dynamic Breadcrumb Navigation:** Instantly calculate and render directory trails, allowing one-click jumping to any parent directory.
- **Interactive Modals:** Dedicated modal dialogs for creating new workspaces, adding folders or files, and renaming existing entities.
- **Contextual Item Actions:** Custom dropdown menus on files and folders providing rename and recursive deletion operations.

### 📝 Integrated Text File Editor

- **In-App Editing:** Open text files side-by-side with the file directory explorer in a split-panel configuration.
- **Unsaved Changes Tracking:** Visual dirty-state indicators that alert users when unsaved content is present.
- **Save & Discard Controls:** Explicit save actions that update client-side database records, with confirmation prompts to protect unsaved work upon closing.

### 💾 Local Data Persistence

- **Offline IndexedDB Storage:** Reliable browser-side relational database storage to retain workspaces, file contents, and directory structures without needing a backend server.
- **Optimistic Query Caching:** Asynchronous cache updates ensuring seamless interface responses during file creation, deletion, or modification.

---

## 🛠️ Tech Stack

- **Core Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling & Design System:** Tailwind CSS with custom background gradients
- **UI Component Library:** shadcn/ui primitives (Dialogs, Dropdowns, Buttons, Inputs, Tooltips)
- **Database & Persistence:** Dexie.js (IndexedDB wrapper)
- **State Management & Caching:** TanStack Query (React Query)
- **Iconography:** Lucide React

---

## 🛠️ Project Structure

```
├── app/
│   ├── layout.tsx         # Root layout with fonts & theme providers
│   └── page.tsx           # Entry point rendering <UbuntuHome />
├── components/
│   ├── UbuntuHome/        # Main shell wrapper for OS layout
│   ├── TopBar/            # Ubuntu status bar (top fixed menu)
│   ├── SideBar/           # Collapsible navigation drawer
│   ├── Screen/            # Desktop workspace display area
│   ├── Breadcrumbs/       # Folder path breadcrumb trail
│   └── CreateFolder/      # Dialog modal for folder generation
├── components/ui/         # Reusable shadcn/ui primitives
│   ├── sidebar.tsx        # Responsive layout provider & sidebar controls
│   ├── dropdown-menu.tsx # Popover user actions
│   ├── avatar.tsx        # User image fallbacks
│   └── ...               # Dialog, Inputs, Buttons, Tabs, Tables
├── Hooks/
│   ├── useWorkspaceQuery.ts            # CRUD operation by react query
│   └── useWorkspaceState.ts            # UI states handle
├── Shared/
│   ├── CustomModal.tsx                 # Reusable Modal Implement
│   └── CustomTextEditor.tsx            # Rich text editor
├── types/
│   ├── type.d.ts          # Global TypeScript type definitions
└── utils/
    ├── handler.ts         # Utility functions (e.g., handleBreadcrumbs logic)
    └── db.ts              # Database Implementation
```

## 📐 Architecture

### 1. Presentation Layer

- **App Shell:** Coordinates the fixed Top Bar, Sidebar Dock, and Desktop Canvas.
- **Explorer Panel:** Displays current folder contents in a grid layout with contextual action menus.
- **Text Editor Panel:** Rendered conditionally alongside the explorer when a text file is opened for editing.
- **Dialog Modals:** Standalone components handling user input for workspace creation, item renaming, and folder/file additions.

### 2. State & Cache Layer

- **UI State Hook:** Tracks UI configurations such as active workspace ID, currently open file, selected folder path, modal toggles, and editor dirty states.
- **Database Mutation Hook:** Exposes asynchronous methods to query, create, update, and delete workspace nodes in IndexedDB.
- **Query Client:** Caches database entities client-side to ensure zero-latency navigation and immediate UI updates.

### 3. Data Persistence Layer

- **Relational Node Model:** Workspaces, folders, and files share a unified data schema where structural relationships are defined by parent identifiers.
- **Client Database:** Dexie.js interfaces with the browser's IndexedDB engine to store relational data locally and maintain schema integrity.

---

## ⚡ Installation & Setup

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm, pnpm, or yarn package manager

### Steps

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/coderyeasin/workspace-explorer.git
   cd workspace-explorer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` to view the application.

---
