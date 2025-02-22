# To-Do Api using Node.js

## Overview

This is a To-Do application built with Node.js, Express, multer and MongoDB using Mongoose for data modeling. The application allows users to manage tasks, including uploading images, setting priorities, and due dates.

## To-Do Model

The To-Do model is designed to handle tasks with the following fields:

### Fields

- **title**: The title of the task (required).
- **desc**: A description of the task (required).
- **image**: URL or path to an associated image (required).
- **user**: Reference to the User model (required).
- **dueDate**: The due date for the task (required).
- **priority**: The priority level of the task, which can be "low", "medium", or "high" (required).

### Timestamps

The model automatically includes `createdAt` and `updatedAt` timestamps for tracking when tasks are created and modified.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/khaledhelmyg/todo.git
   cd todo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   Ensure you have a MongoDB instance running. Update the connection string in your application configuration.

4. **Run the application:**

   ```bash
   npm start
   ```

## API Endpoints

### Create a Todo

`POST /todos`

- **Body:**
  ```json
  {
    "title": "Task Title",
    "desc": "Task Description",
    "image": "path/to/image.png",
    "user": "userId",
    "dueDate": "2024-12-31T23:59:59.999Z",
    "priority": "high"
  }
  ```

### Get All Todos

`GET /todos`

### Update a Todo

`PUT /todos/:id`

- **Body:**
  ```json
  {
    "title": "Updated Title",
    "desc": "Updated Description",
    "image": "path/to/new-image.png",
    "dueDate": "2024-12-31T23:59:59.999Z",
    "priority": "medium"
  }
  ```

### Delete a Todo

`DELETE /todos/:id`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Customization

Feel free to adjust any sections according to your application’s specifics, especially the repository link and any additional instructions. This README provides a clear overview of the To-Do model and its usage without delving into the schema definition. If you need more adjustments or additional information, just let me know!
