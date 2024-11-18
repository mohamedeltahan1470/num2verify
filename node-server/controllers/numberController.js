import NumberModel from '../models/NumberModel.js';
import Country from '../models/CountryModel.js';
import UserNumber from '../models/UserNumberModel.js';
import { updateCountryNumberCounts } from '../services/updateCountryNumberCounts.js';


export const getCountriesOrNumbers = async (req, res) => {
  try {
    const { country_id, start, end } = req.query;

    if (country_id) {

      if (!country_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: "country_id does not exist" });
    }

      const countryObject = await Country.findById(country_id.toString())
      if (!countryObject) {
        return res.status(400).json({ success: false, message: "country_id does not exist" });
      }

      let numberObjects = await NumberModel.find({country : country_id})

      const claimedNumbers = (await UserNumber.find()).map((userNumber) => userNumber.number.toString());

      numberObjects = numberObjects.filter((number) => !claimedNumbers.includes(number._id.toString()));


      if (start !== undefined) {
        const parsedStart = parseInt(String(start).replace('-', ''));
        if (isNaN(parsedStart)) {
          return res.status(400).json({ success: false, message: "start must be an integer" });
        }

        if (!end) {
          return res.status(400).json({ success: false, message: "end is required if you provide start" });
        }

        const parsedEnd = parseInt(String(end).replace('-', ''));
        if (isNaN(parsedEnd)) {
          return res.status(400).json({ success: false, message: "end must be an integer" });
        }

        numberObjects = numberObjects.slice(parsedStart, parsedEnd);
      }

      return res.status(200).json({ success: true, numbers_list: numberObjects });
    } else {
      await updateCountryNumberCounts()
      const countriesObject = await Country.find({});
      const sortedCountries = countriesObject.sort((a, b) => b.amount - a.amount);
      console.log(countriesObject)
      return res.status(200).json({ success: true, countries_list: sortedCountries });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

