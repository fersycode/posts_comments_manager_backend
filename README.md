# Posts & Comments Manager - Backend

Backend API built with NestJS, MongoDB, and TypeScript for managing posts and comments with full CRUD operations.

## Technologies

- **NestJS 10+** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **TypeScript** - Type-safe JavaScript
- **Class Validator** - DTO validation
- **Class Transformer** - Object transformation

## Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## Installation

```bash
# Install dependencies
npm install
```

##  Configuration

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb_connection_string
PORT=3000
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get post by ID |
| POST | `/posts` | Create a new post |
| POST | `/posts/bulk` | Create multiple posts |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/comments?postId={id}` | Get comments by post ID |
| POST | `/comments` | Create a new comment |
| DELETE | `/comments/:id` | Delete a comment |



## Project Structure

```
src/
├── app.module.ts           # Root module
├── main.ts                 # Application entry point
├── common/                 # Shared resources
│   ├── filters/            # Exception filters
│   │   └── all-exceptions.filter.ts
│   ├── interceptors/       # Request/response interceptors
│   │   ├── logging.interceptor.ts
│   │   └── transform.interceptor.ts
│   ├── utils/              # Utility functions
│   │   └── api-response.util.ts
│   ├── dto/                # Common DTOs
│   │   └── pagination.dto.ts
│   └── responses/          # Response interfaces
│       ├── success-response.interface.ts
│       ├── error-response.interface.ts
│       └── paginated-response.interface.ts
├── posts/                  # Posts module
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   ├── posts.module.ts
│   ├── dto/
│   │   ├── create-post.dto.ts
│   │   └── update-post.dto.ts
│   └── schemas/
│       └── post.schema.ts
└── comments/               # Comments module
    ├── comments.controller.ts
    ├── comments.service.ts
    ├── comments.module.ts
    ├── dto/
    │   └── create-comment.dto.ts
    └── schemas/
        └── comment.schema.ts
```

## Features

### Core Features
- Complete CRUD operations for Posts and Comments
- Bulk post creation endpoint
- MongoDB integration with Mongoose
- Request validation with DTOs
- Standardized API responses

### Architecture & Code Quality
- Modular architecture with feature modules
- Global exception handling
- Request/response logging interceptor
- Response transformation interceptor
- Clean code principles
- TypeScript strict mode

### Validation
- Input validation with class-validator
- Custom validation messages
- Email format validation
- MongoDB ObjectId validation

### Error Handling
- Global exception filter
- Standardized error responses
- Detailed error messages
- HTTP status codes

## Testing with Postman/Thunder Client

Import the `postman-collection.json` file included in the project to get:
- Pre-configured requests for all endpoints
- Example request bodies
- Environment variables setup

## Bulk Upload

Use the `posts-bulk-example.json` file to test bulk upload

## CORS Configuration

CORS is enabled for `http://localhost:4200` (Angular development server).

To modify allowed origins, edit `src/main.ts`:

```typescript
app.enableCors({
  origin: 'http://localhost:4200',
  credentials: true,
});
```

## Response Format

All API responses follow a standardized format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "status": 400,
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

## Validation Rules

### Post
- `title`: Required, minimum 3 characters
- `body`: Required, minimum 10 characters
- `author`: Required

### Comment
- `postId`: Required, valid MongoDB ObjectId
- `name`: Required
- `email`: Required, valid email format
- `body`: Required

## Future Enhancements

- [ ] JWT Authentication
- [ ] Pagination for posts list
- [ ] Search and filtering
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker support

## Author

Fersy Martínez: Created as part of a Full-Stack technical assessment.

## License

This project is open source and available for educational purposes.