import { BrowserRouter as Router, Route } from 'react-router-dom'

import './bootstrap.min.css'
import { Container } from 'react-bootstrap'
import CartScreen from './pages/cart.screen'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './pages/home.screen'
import ProductScreen from './pages/product.screen'
import SigninScreen from './pages/signin.screen'
import SignupScreen from './pages/signup.screen'
import ProfileScreen from './pages/profile.screen'
import ShippingScreen from './pages/shipping.screen'
import PaymentScreen from './pages/payment.screen'
import PlaceOrderScreen from './pages/placeorder.screen'
import OrderScreen from './pages/order.screen'
import OrderListScreen from './pages/orderList.screen'
import UserListScreen from './pages/userlist.screen'
import UserEditScreen from './pages/useredit.screen'
import ProductListScreen from './pages/ProductList.screen'
import ProductEditScreen from './pages/productedit.screen'

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
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/search/:keyword" exact component={HomeScreen} />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
