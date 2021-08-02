// this will be in our-domain.com/example
import { Fragment } from 'react'
import Link from 'next/link'

// We go to the link in the same page, not fetching a new html
// We get best of both worlds
  // First we get the whole html page (crawlers can see it, etc)
  // Then its a SPA
const Example = () => {
  return (
    <Fragment>
      <h1>SPA PAGE</h1>
      <ul>
        <li><Link href='/example/nextjs'>NextJS</Link></li> 
        <li><Link href='/example/something-else'>Something Else</Link></li>
      </ul>
    </Fragment>
  )
  return <h1>The Example Page</h1>;
};

export default Example;