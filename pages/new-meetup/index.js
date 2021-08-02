// our-domain/new-meetup
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'

function NewMeetupPage() {
  const router = useRouter()

  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData)
    // send request to api
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data)
    router.push('/')
  }

  return (
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  )
}

export default NewMeetupPage
