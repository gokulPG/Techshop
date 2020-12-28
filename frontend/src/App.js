import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const ProductScreen = lazy(() => import("./screens/ProductScreen"));
const CartScreen = lazy(() => import("./screens/CartScreen"));
const AuthScreen = lazy(() => import("./screens/AuthScreen"));
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));
const ShippingScreen = lazy(() => import("./screens/ShippingScreen"));
const PaymentScreen = lazy(() => import("./screens/PaymentScreen"));
const PlaceOrderScreen = lazy(() => import("./screens/PlaceOrderScreen"));
const OrderScreen = lazy(() => import("./screens/OrderScreen"));
const UserListScreen = lazy(() => import("./screens/UserListScreen"));
const UserEditScreen = lazy(() => import("./screens/UserEditScreen"));
const ProductListScreen = lazy(() => import("./screens/ProductListScreen"));
const ProductEditScreen = lazy(() => import("./screens/ProductEditScreen"));

function App() {
  return (
    <div className="main-container">
      <Router>
        <Suspense fallback={<div></div>}>
          <Header />
          <main>
            <Container style={{ marginTop: "5rem" }}>
              <Switch>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/auth" component={AuthScreen} exact />
                <Route path="/profile" component={ProfileScreen} exact />
                <Route path="/shipping" component={ShippingScreen} exact />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/product/:id" component={ProductScreen} exact />
                <Route path="/order/:id" component={OrderScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/admin/userlist" component={UserListScreen} />
                <Route
                  path="/admin/productlist"
                  component={ProductListScreen}
                />
                <Route path="/admin/user/:id/edit" component={UserEditScreen} />
                <Route
                  path="/admin/product/:id/edit"
                  component={ProductEditScreen}
                />
              </Switch>
            </Container>
          </main>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
