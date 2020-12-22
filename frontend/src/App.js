import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const ProductScreen = lazy(() => import("./screens/ProductScreen"));
const CartScreen = lazy(() => import("./screens/CartScreen"))
const AuthScreen = lazy(() => import("./screens/AuthScreen"))
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"))

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
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
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
