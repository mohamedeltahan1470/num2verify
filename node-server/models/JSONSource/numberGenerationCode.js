import fs from 'fs';

function generatePhoneNumber(countryCode) {
  const length = Math.floor(Math.random() * 4) + 7;
  let number = countryCode;
  for (let i = 0; i < length; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

function generateCountryData(count) {
  const countries = [
    { name: 'United States', code: '1', weight: 15 },
    { name: 'China', code: '86', weight: 15 },
    { name: 'India', code: '91', weight: 15 },
    { name: 'United Kingdom', code: '44', weight: 10 },
    { name: 'Germany', code: '49', weight: 10 },
    { name: 'Japan', code: '81', weight: 10 },
    { name: 'Brazil', code: '55', weight: 8 },
    { name: 'France', code: '33', weight: 8 },
    { name: 'Canada', code: '1', weight: 7 },
    { name: 'Italy', code: '39', weight: 7 },
    { name: 'Russia', code: '7', weight: 7 },
    { name: 'Australia', code: '61', weight: 6 },
    { name: 'Spain', code: '34', weight: 6 },
    { name: 'Mexico', code: '52', weight: 6 },
    { name: 'South Korea', code: '82', weight: 5 },
    { name: 'Indonesia', code: '62', weight: 5 },
    { name: 'Netherlands', code: '31', weight: 4 },
    { name: 'Turkey', code: '90', weight: 4 },
    { name: 'Saudi Arabia', code: '966', weight: 4 },
    { name: 'Switzerland', code: '41', weight: 3 },
    { name: 'Poland', code: '48', weight: 3 },
    { name: 'Sweden', code: '46', weight: 3 },
    { name: 'Belgium', code: '32', weight: 3 },
    { name: 'Argentina', code: '54', weight: 3 },
    { name: 'Norway', code: '47', weight: 2 },
    { name: 'Austria', code: '43', weight: 2 },
    { name: 'United Arab Emirates', code: '971', weight: 2 },
    { name: 'South Africa', code: '27', weight: 2 },
    { name: 'Greece', code: '30', weight: 2 },
    { name: 'Portugal', code: '351', weight: 2 },
    { name: 'Denmark', code: '45', weight: 2 },
    { name: 'Chile', code: '56', weight: 2 },
    { name: 'Finland', code: '358', weight: 1 },
    { name: 'Ireland', code: '353', weight: 1 },
    { name: 'Singapore', code: '65', weight: 1 },
    { name: 'Israel', code: '972', weight: 1 },
    { name: 'Malaysia', code: '60', weight: 1 },
    { name: 'Colombia', code: '57', weight: 1 },
    { name: 'Philippines', code: '63', weight: 1 },
    { name: 'Egypt', code: '20', weight: 1 }
  ];

  const data = [];
  const totalWeight = countries.reduce((sum, country) => sum + country.weight, 0);

  for (let i = 0; i < count; i++) {
    let randomWeight = Math.random() * totalWeight;
    let selectedCountry;

    for (const country of countries) {
      randomWeight -= country.weight;
      if (randomWeight <= 0) {
        selectedCountry = country;
        break;
      }
    }

    data.push({
      country: selectedCountry.name,
      number: generatePhoneNumber(selectedCountry.code)
    });
  }

  return data;
}

const countryData = generateCountryData(1040);
const jsonData = JSON.stringify(countryData, null, 2);

fs.writeFile('generatedNumbers.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing to file', err);
  } else {
    console.log('Data successfully saved to generatedNumbers.json');
  }
});
