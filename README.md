#  HNG12 Stage 1 - Number Classifier API  

##  Project Description  
This is a simple public API developed as part of the HNG12 Internship (Stage 1 Backend Task).  
The API takes a number and returns interesting mathematical properties about it, along with a fun fact.  

##  Live Deployment  
Access the deployed API here:  
[https://number-classifier-ysc9.onrender.com](https://number-classifier-ysc9.onrender.com)  

---

## Setup Instructions  
To run this project locally, follow these steps:  

### 1. Clone the Repository  
```sh
git clone https://github.com/dainty92/hng12-stage1.git
cd hng12-stage1

### 2. Install Dependencies
```sh
npm install

### 3. Start the server
```sh
node app.js
```

##  API Documentation

### Endpoint URL
```sh
GET https://number-classifier-ysc9.onrender.com/api/classify-number?number=371
```

### Response Format (200 OK)
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": [
    "armstrong",
    "odd"
  ],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Response (400 Bad Request)
```json
{
  "number": "alphabet",
  "error": true
}
```

## How the API Works
- Accepts a GET request with a number parameter.
- Validates that the input is a number.
- Determines the following properties:
    - Prime Number
    - Perfect Number
    - Armstrong Number
    - Even/Odd Classification
    - Sum of Digits
- Fetches a fun fact from the Numbers API.

## Backlinks
https://hng.tech/hire/nodejs-developers