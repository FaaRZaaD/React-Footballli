import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../../containers/Layout/Layout-container.tsx";
import Competitions from "../../pages/Competitions-page.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Competitions />} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
