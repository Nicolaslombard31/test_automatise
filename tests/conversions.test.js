const { convertLength, convertTemperature, convertWeight, convertVolume } = require('../script');

test('convertLength: meter to foot', () => {
    expect(convertLength(1, 'meter', 'foot')).toBeCloseTo(3.28084);
});

test('convertTemperature: celsius to fahrenheit', () => {
    expect(convertTemperature(0, 'celsius', 'fahrenheit')).toBe(32);
});
