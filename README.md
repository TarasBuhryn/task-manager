# Task Manager

This project includes a backend built with Ruby on Rails (RoR) and a frontend using React.js with Vite. Below are the setup instructions and basic commands for each part.

## Backend Setup (Ruby on Rails)

### 1. Installing Dependencies

```bash
bundle install
```

### 2.  Setting Up the Database

```bash
rails db:create
rails db:migrate
rails db:seed
```

### 3.  Starting the Server

```bash
rails server
```

The server will be available at http://localhost:3000.

### 4.  Start sidekiq for background jobs

```bash
bundle exec sidekiq
```

## Frontend Setup (React.js + Vite)

### 1. Installing Dependencies

```bash
npm install
```

### 2.  Starting the Server

```bash
npm run dev
```

This command will start a local server for the frontend, available at http://localhost:5173 (by default for Vite).