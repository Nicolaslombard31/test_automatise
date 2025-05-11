const unitOptions = {
    length: ["meter", "kilometer", "foot", "inch", "yard", "mile"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    weight: ["gram", "kilogram", "pound"],
    volume: ["liter", "gallon"],
    currency: ["EUR", "USD", "GBP", "JPY"]
};

function updateUnits() {
    const category = document.getElementById("category").value;
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    unitOptions[category].forEach(unit => {
        fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    });
}

window.onload = updateUnits;

async function convert() {
    const category = document.getElementById("category").value;
    const fromValue = parseFloat(document.getElementById("fromValue").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    let result;

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
    return (value / conversions[from]) * conversions[to];
}

function convertTemperature(value, from, to) {
    if (from === "celsius") {
        if (to === "fahrenheit") return value * 9/5 + 32;
        if (to === "kelvin") return value + 273.15;
    }
    if (from === "fahrenheit") {
        if (to === "celsius") return (value - 32) * 5/9;
        if (to === "kelvin") return (value - 32) * 5/9 + 273.15;
    }
    if (from === "kelvin") {
        if (to === "celsius") return value - 273.15;
        if (to === "fahrenheit") return (value - 273.15) * 9/5 + 32;
    }
    return value;
}

function convertWeight(value, from, to) {
    const conversions = {
        gram: 1,
        kilogram: 0.001,
        pound: 0.00220462
    };
    return (value / conversions[from]) * conversions[to];
}

function convertVolume(value, from, to) {
    const conversions = {
        liter: 1,
        gallon: 0.264172
    };
    return (value / conversions[from]) * conversions[to];
}

async function convertCurrency(value, from, to) {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`);
    const data = await response.json();
    return value * data.result;
}
