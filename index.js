const express = require('express');
const axios = require('axios');

const app = express();

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=126c7e03b76f870a01b812c6e518b3f0&units=metric&lang=ar`;

    try {
        const response = await axios.get(apiUrl);
        res.json({
            data : response.data,
            city: response.data.name,
            temperature: response.data.main.temp,
            ressentie: response.data.main.feels_like,
            conditions: response.data.weather[0].description,
            humidité : response.data.main.humidity,
            vitesseV : 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data', details: error.message });
    }
});


