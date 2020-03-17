# Localsearch Challenge

This repos addresses the challenge posed by [https://gist.github.com/ractive/8ea5e93b26ab24e5caf58d1c8c235b0d].

## Installation

requirement:

- `node v13.10.1` was used.

### Backend

To install and run the backend run the following commands in a terminal starting at the root of this repo.

```bash
cd backend/
npm ci
npx nodemon --exec babel-node src/index.js
```

### Frontend

To install and run the frontend run the following commands in a terminal starting at the root of this repo.

```bash
cd frontend/
npm ci
npx webpack-dev-server --mode development --hot
```

## Usage

The backends runs on port `3000` and the frontend on port `8080`.

To open the webapp, you should navigate to [http://localhost:8080].

You can view the different places using their ID, either by clicking on the corresponding button or by adding the ID to the URL as a URL parameter.
(e.g. [http://localhost:8080/GXvPAor1ifNfpF0U5PTG0w])