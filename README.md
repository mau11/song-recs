# song-recs

> song-recs is a web app where users can share YouTube music recommendations, discover new songs, and give feedback with likes or dislikes.

<img src="./public/images/screenshot.png" alt="Screenshot of completed song-recs app" height="300">

## Table of Contents

1. [Tech Stack](#tech-stack)
1. [Requirements](#requirements)
1. [Development](#development)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Running the Server](#running-the-server)
1. [View Application](#view-application)
1. [Deployment](#deployment)

## Tech Stack

- **JavaScript**
- **CSS**
- **EJS**
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **Render**

## Requirements

- Node v24.2.0
- pnpm v10.6.2

## Development

#### Setting up Database

Setup up a [MongoDB Atlas account](https://www.mongodb.com/). Create a new database called `song-recs` with the collection: `songs`.

#### Environment Variables

Run the command below to copy environment variables from the example, then add your values and save.

```sh
$ cp .env.example .env
```

| Environment Variable | Notes                                                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                 | port number (default: 3000)                                                                                                                           |
| DB_NAME              | MongoDB database name                                                                                                                                 |
| DB_CONNECTION_STRING | MongoDB connection string in the format: `mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority` |

#### Installing Dependencies

```sh
$ nvm use
$ pnpm install
```

#### Running the Server

Once dependencies have been installed, run the following command to start the development server:

```sh
$ pnpm dev
```

## View Application

For development, in your browser, navigate to:

```sh
http://localhost:3000
```

## Deployment

View the latest deploy on Render at: https://song-recs.onrender.com/
