# Posts & Comments Manager - Backend

Backend API built with NestJS, MongoDB, and TypeScript for managing posts and comments with full CRUD operations.

## Technologies

- **NestJS 10+** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **TypeScript** - Type-safe JavaScript
- **Class Validator** - DTO validation
- **Class Transformer** - Object transformation
- **Docker** - Containerization

## Prerequisites

- Docker installed on your machine
- MongoDB Atlas account (credentials will be provided)

## Quick Start with Docker

### 1. Build the Docker Image

```bash
docker build -t nest-api .
```

### 2. Run the Application

```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb_connection_string" \
  -e JWT_SECRET="3cb0d3c67327a37970216a1bf7c7ffc5f4dcc633" \
  -e JWT_EXPIRES_IN="7d" \
  -v uploads_data:/app/uploads \
  nest-api
```

**Note 1:** Replace `mongodb_connection_string` with the MongoDB URI provided separately for security reasons.
**Note 2:** Remember to execute the command on a single line on windows bash, or if Linux with "\"

### 3. Access the API

The API will be available at `http://localhost:3000`

## Alternative: Running Without Docker

If you prefer to run the application locally without Docker:

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb_connection_string
PORT=3000
JWT_SECRET=3cb0d3c67327a37970216a1bf7c7ffc5f4dcc633
JWT_EXPIRES_IN=7d
```

### Running

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```
## Features

### Core Features
- Complete CRUD operations for Posts and Comments
- Bulk post creation endpoint
- MongoDB integration with Mongoose
- Request validation with DTOs
- Standardized API responses
- Image upload support for posts

### Architecture & Code Quality
- Modular architecture with feature modules
- Global exception handling
- Request/response logging interceptor
- Response transformation interceptor
- Clean code principles
- TypeScript strict mode
- Docker containerization
- Persistent images with Docker volume

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

Use the `posts-bulk-example.json` file to test bulk upload functionality.

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
- `image`: Optional, file upload

### Comment
- `postId`: Required, valid MongoDB ObjectId
- `name`: Required
- `email`: Required, valid email format
- `body`: Required

## Docker Volume

The application uses a Docker volume (`uploads_data`) to persist uploaded images. This ensures that images are not lost when the container is stopped or removed.

## Stopping the Application

To stop the running container:

```bash
# Find the container ID
docker ps

# Stop the container
docker stop <container_id>
```

## Future Enhancements

- [✔] JWT Authentication
- [✔] Posts with images
- [✔] Docker support
- [ ] Pagination for posts list
- [ ] Search and filtering
- [ ] Rate limiting
- [ ] API documentation with Swagger
- [ ] Unit and integration tests

## Author

Fersy Martínez: Created as part of a Full-Stack technical assessment.

## License

This project is open source and available for educational purposes.
```