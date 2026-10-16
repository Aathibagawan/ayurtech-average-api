# Ayurtech Average API

A small, documented REST API built with Node.js and Express. It accepts numbers through `POST /average` and returns the arithmetic average of every valid number submitted during the current server session.

**Assignment ID:** `R280926724P`  
**Deal name:** `AYU0926PEND01`

## Features

- `POST /average` endpoint
- Running average maintained in memory
- Input validation and consistent JSON errors
- Small command-line client and cURL/Postman examples
- Unit and API tests with Jest and Supertest
- JSDoc documentation
- Husky Git hooks
- Commitlint enforcement for Conventional Commits

## Requirements

- Node.js 18 or later (uses the built-in `fetch` API)
- npm
- Git (needed for Git hooks and commits)

## Install

```bash
git clone https://github.com/Aathibagawan/ayurtech-average-api.git
cd ayurtech-average-api
npm install
npm test
npm start

```

`npm install` installs the dependencies declared in `package.json` and runs the `prepare` script to configure Husky hooks. The repository should include `.husky/` and `commitlint.config.js`.

## Start the server

```bash
npm start
```

Expected output:

```text
Ayurtech Average API running at http://localhost:3000
Endpoint: POST /average
```

Keep the server terminal open while testing. The default port is `3000`; set the `PORT` environment variable to use another port.

## API reference

### `POST /average`

**URL:** `http://localhost:3000/average`  
**Content-Type:** `application/json`

Request body:

```json
{
  "number": 10
}
```

Example response:

```json
{
  "average": 10,
  "count": 1
}
```

Submit another number:

```json
{
  "number": 20
}
```

Response:

```json
{
  "average": 15,
  "count": 2
}
```

Then submit `30`; the response will be `{"average":20,"count":3}` because `(10 + 20 + 30) / 3 = 20`.

`average` is the average of all valid numbers received by that server instance. `count` is the number of accepted requests.

### Validation

The `number` field must be a finite JSON number. Strings, missing values, `null`, arrays, and other invalid values return HTTP `400`.

Example invalid request:

```json
{
  "number": "hello"
}
```

Example error:

```json
{
  "error": "Invalid input",
  "message": "Request body must contain a finite numeric 'number' field.",
  "example": {
    "number": 10
  }
}
```

Malformed JSON also returns HTTP `400` with a JSON error response.

## Client options

### Option 1: Built-in command-line client

With the server running, open a **second terminal** in the project folder and run:

```bash
npm run client -- 10
npm run client -- 20
npm run client -- 30
```

Each command submits one number. Expected averages are `10`, `15`, and `20`. Use the same server session for all three calls.

### Option 2: PowerShell

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/average" -Method POST -ContentType "application/json" -Body '{"number":10}'
```

### Option 3: cURL

```bash
curl -X POST http://localhost:3000/average \
  -H "Content-Type: application/json" \
  -d "{\"number\":10}"
```

### Option 4: Postman

1. Start the server with `npm start`.
2. Create a `POST` request to `http://localhost:3000/average`.
3. Select **Body → raw → JSON**.
4. Enter `{"number":10}` and click **Send**.

## Run tests

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

The tests cover the running-average calculation, decimal and negative numbers, reset behavior, request validation, malformed JSON, and API responses.

## Git hooks and Conventional Commits

This project uses Husky and Commitlint:

- `.husky/pre-commit` runs `npm test` before a commit.
- `.husky/commit-msg` checks the commit message with Commitlint.
- `commitlint.config.js` enables the Conventional Commits rules.

Valid commit examples:

```text
feat: add average endpoint
fix: validate request body
test: cover invalid inputs
docs: improve README
chore: update dependencies
```

An invalid message such as `my first commit` should be rejected by the commit-message hook.

To test the hooks, make a change, stage it, and try a valid commit. Hooks are installed when dependencies are installed in a Git checkout.

## Project structure

```text
ayurtech-average-api/
├── .husky/
│   ├── commit-msg
│   └── pre-commit
├── client/
│   └── request.js
├── src/
│   ├── app.js
│   ├── average-calculator.js
│   └── server.js
├── test/
│   ├── app.test.js
│   └── average-calculator.test.js
├── .gitignore
├── commitlint.config.js
├── package.json
└── README.md
```

## Design notes

- The calculation is stored in memory; restarting the server resets the average and count.
- No database is required for this assignment.
- `createApp()` creates isolated application state, which keeps API tests independent and repeatable.
- `src/app.js` separates the API application from `src/server.js`, making the application easier to test.

## Repository

Public GitHub repository: https://github.com/Aathibagawan/ayurtech-average-api

## License

ISC
