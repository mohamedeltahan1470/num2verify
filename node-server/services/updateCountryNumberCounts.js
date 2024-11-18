import Country from "../models/CountryModel.js";
import Number from "../models/NumberModel.js";
import UserNumber from "../models/UserNumberModel.js";

export async function updateCountryNumberCounts() {
    const countries = await Country.find();
    const claimedNumbers = await UserNumber.find().select('number').lean();
    const claimedNumberIds = claimedNumbers.map(number => number.number);

    const numberCounts = await Number.aggregate([
        {
            $match: {
                _id: { $nin: claimedNumberIds },
                country: { $in: countries.map(country => country._id) }
            }
        },
        {
            $group: {
                _id: "$country",
                count: { $sum: 1 }
            }
        }
    ]);

    const countMap = {};
    numberCounts.forEach(({ _id, count }) => {
        countMap[_id] = count;
    });

    const updatePromises = countries.map(country => {
        const count = countMap[country._id] || 0;
        country.amount = count;
        return country.save();
    });

    await Promise.all(updatePromises);

    console.log("Country number counts updated successfully.");
}
