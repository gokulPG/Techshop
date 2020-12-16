import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <div className="main-container">
      <Header />
      <main>
        <Container style={{marginTop: "5rem"}}>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
