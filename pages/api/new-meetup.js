// this needs to be in page/api
// funcitons with server side code
// triggered when a request is send to /api/new-meetup
import { MongoClient } from 'mongodb'
const MONGO_URL = process.env.MONGO_URL

async function handler(req, res) {
  // will only handle POST requests
  if (req.method === 'POST') {
    const data = req.body
    // const { title, image, address, description } = data

    const client = await MongoClient.connect(MONGO_URL)
    const db = client.db()

    const meetupsCollection = db.collection('meetups') // can be the same name as db

    const result = await meetupsCollection.insertOne(data)

    console.log(result)

    client.close()

    res.status(201).json({ message: 'Meetup Inserted' })
  }
}

export default handler
