import '../styles/globals.css'
import Layout from '../components/layout/Layout'

// I put the Layout here instead of each file
function MyApp({ Component, pageProps }) {
  return (
    <Layout> 
      <Component {...pageProps} />
    </Layout>
    
  )
}

export default MyApp
