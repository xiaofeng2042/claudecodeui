# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start development environment (both client and server with hot reload)
npm run dev

# Start only the backend server
npm run server

# Start only the frontend development server
npm run client

# Build for production
npm run build

# Preview production build
npm run preview

# Start production server (build + serve)
npm start
```

### Environment Setup
- Copy `.env.example` to `.env` and configure ports
- Default ports: Frontend (3001), Backend (3002)
- Requires Node.js v20+ and Claude CLI installed

## Architecture Overview

This is a full-stack web application providing a browser interface for Claude Code CLI with the following key architectural components:

### Backend (Node.js + Express)
- **Server Entry**: `server/index.js` - Main Express server with WebSocket support
- **Claude Integration**: `server/claude-cli.js` - Manages Claude CLI processes and sessions
- **Project Management**: `server/projects.js` - Handles project discovery and session parsing
- **Authentication**: JWT-based auth with SQLite storage in `server/database/`
- **Git Operations**: `server/routes/git.js` - Complete git workflow support
- **Real-time Communication**: Dual WebSocket servers for chat (`/ws`) and shell (`/shell`)

### Frontend (React + Vite)
- **Main App**: `src/App.jsx` - Router and state management with session protection system
- **Chat Interface**: `src/components/ChatInterface.jsx` - Complex component handling message rendering, tool visualization, and file references
- **State Management**: Context-based (AuthContext, ThemeContext)
- **Communication**: `src/utils/websocket.js` and `src/utils/api.js` for client-server interaction

### Key Design Patterns
- **Session Protection**: Active chat sessions prevent UI refreshes during conversations
- **Modular Architecture**: Separate concerns with clear component boundaries  
- **Real-time Updates**: WebSocket-based project watching with file system change detection
- **Tool Permission System**: Configurable Claude CLI tool access through UI settings

## Claude CLI Integration

### Session Management
- Projects are auto-discovered from `~/.claude/projects/`
- Session files are parsed from JSONL format to extract conversation history
- Smart project directory detection by analyzing session logs
- Session resume/create logic handles both existing and new conversations

### Tool Configuration
- All Claude tools are **disabled by default** for security
- Enable tools selectively via Tools Settings panel (gear icon in sidebar)
- Tool permissions are passed to Claude CLI on session start
- Settings persist in local browser storage

### Permission Modes
- **Default**: Standard tool permissions
- **Plan Mode**: Planning-focused with limited tool access  
- **Bypass Permissions**: Full tool access (use with caution)

## Development Patterns

### Component Architecture
- Use functional components with hooks
- Leverage existing contexts (AuthContext, ThemeContext) for global state
- Follow established patterns in `src/components/` for new UI components
- Maintain mobile-responsive design using Tailwind CSS

### API Patterns
- RESTful endpoints for CRUD operations
- WebSocket for real-time communication (chat, file watching)
- Middleware-based authentication using JWT tokens
- Centralized API utilities in `src/utils/api.js`

### File Operations
- Project files are served through Express with proper security validation
- File tree navigation in `src/components/FileTree.jsx`
- Code editing via CodeMirror in `src/components/CodeEditor.jsx`
- Image uploads handled through temporary file system

### Git Integration
- Complete git workflow through `server/routes/git.js`
- Branch switching, staging, committing, and remote operations
- Git status and diff visualization in UI
- Repository validation prevents operations outside git repos

## Database & Storage

### SQLite Database (`server/database/`)
- User authentication and session management
- Database initialization via `init.sql`
- Uses better-sqlite3 for synchronous operations

### File System
- Project discovery through Claude's metadata files
- Intelligent caching for project directory mappings
- File watching with chokidar for real-time updates
- Temporary file management for image uploads

## Security Considerations

- Path validation prevents directory traversal
- Operations limited to designated project directories
- JWT token-based authentication with expiration
- WebSocket connections require authentication
- Claude tool permissions controllable via UI
- Process lifecycle management prevents resource leaks

## Performance Optimizations

- Message virtualization for large chat histories
- Debounced file system watching
- Project directory caching to reduce file system operations
- Memoized React components for expensive renders
- WebSocket connection reuse and automatic reconnection

## Mobile & Responsive Design

- Mobile-first responsive design with Tailwind CSS
- Touch-friendly interface with swipe gestures
- Adaptive layouts for different screen sizes
- Progressive Web App (PWA) capabilities
- Mobile navigation component for small screens

## Development Notes

- The codebase includes `.clinerules-*` files for different AI assistant modes
- Session protection system prevents UI disruption during active conversations
- File references in chat support `@` symbol autocomplete for project files
- Terminal emulation provides full shell access within project context
- Git panel provides visual interface for version control operations