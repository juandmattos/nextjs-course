// root file (our-domain.com/)
// Not needed import React from 'react' (behind the scenes)
// not needed ==> import { useState, useEffect } from 'react'
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb'
const MONGO_URL = process.env.MONGO_URL

const DUMMY = [{
  id: 'm1',
  title: 'A First Meetup',
  image: 'https://www.marketingregistrado.com/img/noticias/campeon-del-siglo.jpg',
  address: 'Camino Mangangá, 11600 Montevideo',
  description: 'El mejor estadio del Uruguay'
},{
  id: 'm2',
  title: 'Otro Meetup',
  image: 'https://www.marketingregistrado.com/img/noticias/campeon-del-siglo.jpg',
  address: 'Camino Mangangá, 11600 Montevideo',
  description: 'El mejor estadio del Uruguay'
}];

const HomePage = (props) => {
  // not needed ==> we dont need this anymore: const [loadedMeetups, setLoadedMeetups] = useState([])
  // not needed ==> useEffect(() => {
  //   // after the component function is executed
  //   // first is an empty array, then its an array of meetups
  //   // Our users might see a loading state for example
  //   // but mor important, if i see the html, the meetups are missing 
  //   // because they are rendered in the second render, not when the server sends the html
  //   // nextjs does not wait for the second or more render

  //   // WE NEED A SOLUTION!
  //   // PRE RENDERING
  //   // TWO WAYS
  //     // STATIC GENERATION
  //     // SERVER-SIDE RENDERING
  //   setLoadedMeetups(DUMMY)
  // }, [])

  return (
    // Instead of meetups={props.loadedMeetups}
    // Now in the page source we have the array of meetups!!
    <MeetupList meetups={props.meetups} />
  );
};

// Alternative less used
// Does not run on build, it runs on server side

/*
export function getServerSideProps(context) {
  // fetch from API (always in the backend, the server. Will Never in the front)
  // no need for revalidate (it runs in the server)

  // context --> request, response
  const req = context.req
  const res = context.res

  // return obj like getStaticProps
  return {
    props: {
      meetups: DUMMY
    }
  }
}
*/


// STATIC GENERATION
// ONLY WORKS IN PAGE COMPONENTS 
export async function getStaticProps() {
  // job is to prepare props for the component
  // this is called before the component function
  // we can load data before the component is rendered!
  // It does not executed on the client side, it executes in build
  // You can fetch data from API, read data from a file, etc
  // always return an object with a key called props


  // normally, fetch is only for client side, but next allows it
  // fetch('/api/meetups')
  // but it does not make sense, we are sending a fetch to our own api, we can
  // run the code to fetch directly (since its server side)

  const client = await MongoClient.connect(MONGO_URL)
  const db = client.db()
  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10 // the page will be generated in the build and this seconds later if request are comming there
  }
}

// Wich one to use? 
// getStaticProps --> If data does not change multiple times in a second or you dont need the context objects

export default HomePage;
