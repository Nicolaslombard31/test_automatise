const unitOptions = {
    length: ["meter", "kilometer", "foot", "inch", "yard", "mile"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    weight: ["gram", "kilogram", "pound"],
    volume: ["liter", "gallon"],
    currency: ["eur", "usd", "gbp", "jpy", "btc", "eth", "sol"]
};

function updateUnits() {
    const category = document.getElementById("category").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    unitOptions[category].forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit.toUpperCase()}</option>`;
        toUnit.innerHTML += `<option value="${unit}">${unit.toUpperCase()}</option>`;
    });
}

window.onload = updateUnits;

async function convert() {
    const category = document.getElementById("category").value;
    const fromValue = parseFloat(document.getElementById("fromValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    let result;

    if (isNaN(fromValue)) {
        alert("Veuillez entrer une valeur valide.");
        return;
    }

    switch (category) {
        case "length":
            result = convertLength(fromValue, fromUnit, toUnit);
            break;
        case "temperature":
            result = convertTemperature(fromValue, fromUnit, toUnit);
            break;
        case "weight":
            result = convertWeight(fromValue, fromUnit, toUnit);
            break;
        case "volume":
            result = convertVolume(fromValue, fromUnit, toUnit);
            break;
        case "currency":
            result = await convertCurrency(fromValue, fromUnit, toUnit);
            break;
    }

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = result;
    resultDiv.classList.remove("d-none");
}

function convertLength(value, from, to) {
    const conversions = {
        meter: 1,
        kilometer: 0.001,
        foot: 3.28084,
        inch: 39.3701,
        yard: 1.09361,
        mile: 0.000621371
    };
    return ((value / conversions[from]) * conversions[to]).toFixed(2);
}

function convertTemperature(value, from, to) {
    if (from === "celsius") {
        if (to === "fahrenheit") return (value * 9/5 + 32).toFixed(2);
        if (to === "kelvin") return (value + 273.15).toFixed(2);
    }
    if (from === "fahrenheit") {
        if (to === "celsius") return ((value - 32) * 5/9).toFixed(2);
        if (to === "kelvin") return (((value - 32) * 5/9) + 273.15).toFixed(2);
    }
    if (from === "kelvin") {
        if (to === "celsius") return (value - 273.15).toFixed(2);
        if (to === "fahrenheit") return ((value - 273.15) * 9/5 + 32).toFixed(2);
    }
    return value.toFixed(2);
}

function convertWeight(value, from, to) {
    const conversions = {
        gram: 1,
        kilogram: 0.001,
        pound: 0.00220462
    };
    return ((value / conversions[from]) * conversions[to]).toFixed(2);
}

function convertVolume(value, from, to) {
    const conversions = {
        liter: 1,
        gallon: 0.264172
    };
    return ((value / conversions[from]) * conversions[to]).toFixed(2);
}

async function convertCurrency(value, from, to) {
    try {
        const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`;
        const response = await fetch(url);
        const data = await response.json();

        console.log("Réponse API :", data);

        if (!data[to]) {
            throw new Error("Taux de conversion non trouvé.");
        }

        return (value * data[to]).toFixed(2);
    } catch (error) {
        console.error("Erreur de conversion :", error);
        return "Conversion impossible";
    }
}
