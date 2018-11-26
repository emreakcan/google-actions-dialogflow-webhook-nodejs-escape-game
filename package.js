{
  "name": "functions",
  "description": "This is your Action's webhook",
  "version": "0.0.1",
  "private": true,
  "license": "Apache Version 2.0",
  "author": "Google Inc.",
  "engines": {
    "node": "8"
  },
  "scripts": {
    "lint": "eslint --fix \"**/*.js\"",
    "start": "firebase serve --only functions",
    "deploy": "firebase deploy --only functions",
    "test": "npm run lint"
  },
  "dependencies": {
    "actions-on-google": "^2.0.0",
    "firebase-admin": "^5.11.0",
    "firebase-functions": "^1.0.0"
  },
  "devDependencies": {
    "eslint": "^4.19.0",
    "eslint-config-google": "^0.9.1"
  }
}
