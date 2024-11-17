const express = require('express');
const axios = require('axios');

const app = express();

function DirectionVent(deg) {
    if (deg >= 0 && deg <= 22.5) return "Nord(N)";
    else if (deg > 22.5 && deg <= 67.5) return "Nord-Est(NE)";
    else if (deg > 67.5 && deg <= 112.5) return "Est-Nord-Est(ENE)";
    else if (deg > 112.5 && deg <= 157.5) return "Est(E)";
    else if (deg > 157.5 && deg <= 202.5) return "Sud-Est(SE)";
    else if (deg > 202.5 && deg <= 247.5) return "Sud-Sud-Est(SSE)";
    else if (deg > 247.5 && deg <= 292.5) return "Sud(S)";
    else if (deg > 292.5 && deg <= 337.5) return "Sud-Ouest(SW)";
    else if ((deg > 337.5 && deg < 360) || deg === 0) return "Ouest-Sud-Ouest(WSW)";
}


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=126c7e03b76f870a01b812c6e518b3f0&units=metric&lang=fr`;

    try {
        const response = await axios.get(apiUrl);
        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            ressentie: response.data.main.feels_like,
            conditions: response.data.weather[0].description,
            humidité : response.data.main.humidity,
            vitesseV : response.data.wind.speed,
            DirectionV : response.data.wind.deg,
            visibility : response.data.visibility,
            lever : response.data.sys.sunrise,
            coucher : response.data.sys.sunset,

        });
        const weatherData = {
            "city": response.data.name,
            "temperature": response.data.main.temp,
            "ressentie": response.data.main.feels_like,
            "conditions": response.data.weather[0].description,
            "humidité": response.data.main.humidity,
            "vitesseV": response.data.wind.speed,
            "DirectionV": response.data.wind.deg,
            "visibility": response.data.visibility,
            "lever": (response.data.sys.sunrise ),
            "coucher": (response.data.sys.sunset ),
        };
        const leverDate = new Date(weatherData.lever * 1000).toLocaleString();
        const coucherDate = new Date(weatherData.coucher * 1000).toLocaleString();


        console.log(`\x1b[31mMétéo de ${weatherData.city}:\x1b[0m`);
        console.log(`\x1b[1mTempérature: \x1b[0m${weatherData.temperature}°C`);
        console.log(`\x1b[1mTempérature ressentie: \x1b[0m${weatherData.ressentie}°C`);
        console.log(`\x1b[1mConditions: \x1b[0m${weatherData.conditions}`);
        console.log(`\x1b[1mHumidité: \x1b[0m${weatherData.humidité}%`);
        console.log(`\x1b[1mVitesse du vent: \x1b[0m${weatherData.vitesseV} m/s`);
        console.log("\x1b[1mDirection du vent: \x1b[0m" +DirectionVent(weatherData.DirectionV));
        console.log(`\x1b[1mVisibilité: \x1b[0m${weatherData.visibility / 1000} km`);
        console.log(`\x1b[1mLever du soleil: \x1b[0m${leverDate}`);
        console.log(`\x1b[1mCoucher du soleil: \x1b[0m ${coucherDate}`);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data', details: error.message });
    }
});


