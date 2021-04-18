import { Store } from 'ax-react-lib'
import '../styles/globals.css'
import '../styles/variables.css'

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  )
}

export default MyApp
