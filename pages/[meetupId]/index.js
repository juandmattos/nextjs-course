import { MongoClient, ObjectId } from 'mongodb'
import { Fragment } from 'react'
import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail'

const MONGO_URL = process.env.MONGO_URL

function MeetupDetails(props) {
  const meetup = props.meetupData

  // Dinamic head
  return (
    <Fragment>
      <Head>
        <title>{meetup.title} description</title>
        <meta name='description' content={meetup.description} />
      </Head>
      <MeetupDetail
        image={meetup.image}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
      />
    </Fragment>
  )
}

// SI la pagina es dinamica (como esta) y usas getStaticProps,
// necesitas getStaticPaths

// we need to pregenerate in build
// we need to assign to wich ids we might get this page, all else is 404
export async function getStaticPaths() {
  const client = await MongoClient.connect(MONGO_URL)
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  
  // first {} is filter criteria, { _id: 1 } is the attributes i need (only id)
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return {
    fallback: false,
    paths: meetups.map(m => ({
      params: {
        meetupId: m._id.toString()
      }
    }))
  }
  /*
  // this should not be hardcoded
  return {
    fallback: false, // false --> I support all (with true the idea is to pregenerate the most popular ones)
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      },      
    ]
  }
  */
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  // I need the meetup id, but cant use useRouter to get it (only in funciton component)
  // ---> I get it from context
  const params = context.params
  const meetupId = params.meetupId
  console.log(meetupId) // this does not show in browser, but in terminal (It is build, not in the client)

  const client = await MongoClient.connect(MONGO_URL)
  const db = client.db()
  const meetupsCollection = db.collection('meetups')
  
  // could use findOne, remove toArray and do this instead of the map in the return:
  // meetupData: { id: meetup._id.toString(), image: meetup.image, ...}
  const meetup = await meetupsCollection.find({ _id: new ObjectId(meetupId) }).toArray()

  client.close()

  return {
    props: {
      meetupData: meetup.map(m => ({
        title: m.title,
        image: m.image,
        address: m.address,
        description: m.description,
      }))[0]
    },
    revalidate: 10
  }
}

export default MeetupDetails
