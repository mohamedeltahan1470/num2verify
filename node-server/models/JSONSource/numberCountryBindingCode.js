import { MongoClient } from 'mongodb'

async function run() {
    const uri = 'mongodb://127.0.0.1:27017/Num2Verify';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('Num2Verify');
        const numbers = database.collection('numbers');
        const countries = database.collection('countries');

        const cursor = numbers.find();
        const numberArray = await cursor.toArray();
        for (const number of numberArray) {
            const countryDoc = await countries.findOne({ name: number.country });
            if (countryDoc) {
                await numbers.updateOne(
                    { _id: number._id },
                    { $set: { country: countryDoc._id } }
                );
            }
        }

        console.log("Updated numbers collection successfully!");
    } catch (error) {
        console.error("Error updating numbers collection:", error);
    } finally {
        await client.close();
    }
}

run().catch(console.error);
