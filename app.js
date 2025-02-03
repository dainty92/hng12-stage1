const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Function to check if a number is prime
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is perfect
const isPerfect = (num) => {
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i + (i !== num / i ? num / i : 0);
        }
    }
    return sum === num && num !== 1;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === num;
};

// Function to get fun fact from Numbers API
const getFunFact = async (num) => {
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        let fact = response.data.text;
  
        // Check if the number is an Armstrong number
        if (isArmstrong(num)) {
            // Extract the digits and generate the breakdown
            const digits = num.toString().split("").map(Number);
            const power = digits.length;
            const breakdown = digits.map((d) => `${d}^${power}`).join(" + ");
  
            // Construct the required fun fact format
            fact = `${num} is an Armstrong number because ${breakdown} = ${num}`;
        }
  
        return fact;
    } catch (error) {
        return "No fun fact available.";
    }
};  

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query;
    if (!number || isNaN(number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number, 10);
    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    const digitSum = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);

    // Fetch fun fact asynchronously while other calculations are being done
    const funFactPromise = getFunFact(num);

    res.json({
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties,
        digit_sum: digitSum,
        fun_fact: await funFactPromise,
    });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
