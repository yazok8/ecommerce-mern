import { BrowserRouter as Router, Route } from 'react-router-dom'

import './bootstrap.min.css'
import { Container } from 'react-bootstrap'
import CartScreen from './screens/cart.screen'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/home.screen'
import ProductScreen from './screens/product.screen'
import SigninScreen from './screens/signin.screen'
import SignupScreen from './screens/signup.screen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/shop/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={SigninScreen} />
          <Route path="/register" component={SignupScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
