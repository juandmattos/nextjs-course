// this will be in our-domain.com/example/notSPA
// Important for nested paths!
import { Fragment } from 'react'

// This is not SinglePageApplication
// We want this behaviour in the start, but when we arrive to the site, we want a SPA (like react)
// We will loose state in every link
// the link brings a new page

// Commented out for type checking (not use <a>, use <Link>)
const NotSPA = () => {
  return (
    <Fragment>
      <h1>Not SPA PAGE</h1>
      <ul>
        {/*<li><a href='/example/nextjs'>NextJS</a></li> 
        <li><a href='/example/something-else'>Something Else</a></li>*/}
      </ul>
    </Fragment>
  )
};

export default NotSPA;
