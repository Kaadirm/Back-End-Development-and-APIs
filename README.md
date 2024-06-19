# Back End Development and APIs Certification

This repository contains my projects and code challenges completed as part of the FreeCodeCamp Back End Development and APIs Certification. 

## Overview

1. **Managing Packages with NPM**: Learned to use npm, manage `package.json`, and handle dependencies.
2. **Basic Node and Express**: Built servers, handled routing, and served files using Node.js and Express.
3. **MongoDB and Mongoose**: Performed CRUD operations with MongoDB and Mongoose.

## Projects

### Timestamp Microservice
- **Endpoint**: `/api/timestamp/:date_string?`
- **Example**: `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`

### Request Header Parser Microservice
- **Endpoint**: `/api/whoami`
- **Example**: `{ "ipaddress": "159.20.14.100", "language": "en-US,en;q=0.9", "software": "Mozilla/5.0" }`

### URL Shortener Microservice
- **Endpoint**: `/api/shorturl/new`
- **Example**: `{ "original_url": "https://www.google.com", "short_url": 1 }`

### Exercise Tracker
- **Endpoints**:
  - `/api/users` to create a user.
  - `/api/users/:_id/exercises` to add an exercise.
  - `/api/users/:_id/logs` to get logs.

### File Metadata Microservice
- **Endpoint**: `/api/fileanalyse`
- **Example**: `{ "name": "myfile.png", "type": "image/png", "size": 12345 }`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kaadirm/Back-End-Development-and-APIs.git
