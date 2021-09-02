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
import ProfileScreen from './screens/profile.screen'
import ShippingScreen from './screens/shipping.screen'
import PaymentScreen from './screens/payment.screen'
import PlaceOrderScreen from './screens/placeorder.screen'
import OrderScreen from './screens/order.screen'
import UserListScreen from './screens/userlist.screen'
import UserEditScreen from './screens/useredit.screen'
import ProductListScreen from './screens/ProductList.screen'
import ProductEditScreen from './screens/productedit.screen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container style={{ marginTop: '120px' }}>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={SigninScreen} />
          <Route path="/register" component={SignupScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/productList" component={ProductListScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
