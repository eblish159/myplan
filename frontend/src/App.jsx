import { useState } from "react";

import Sidebar from "./components/layout/Sidebar.jsx";
import HomePage from "./pages/HomePage.jsx";
import PlanListPage from "./pages/PlanListPage.jsx";
import CreatePlanPage from "./pages/CreatePlanPage.jsx";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [editPlan, setEditPlan] = useState(null);

  const goCreatePage = () => {
    setEditPlan(null);
    setActivePage("create");
  };

  const goEditPage = (plan) => {
    setEditPlan(plan);
    setActivePage("create");
  };

  const renderPage = () => {
    if (activePage === "home") {
      return (
        <HomePage
          setActivePage={setActivePage}
          goCreatePage={goCreatePage}
        />
      );
    }

    if (activePage === "create") {
      return (
        <CreatePlanPage
          setActivePage={setActivePage}
          editPlan={editPlan}
          setEditPlan={setEditPlan}
        />
      );
    }

    if (activePage === "list") {
      return (
        <PlanListPage
          goEditPage={goEditPage}
        />
      );
    }

    return (
      <HomePage
        setActivePage={setActivePage}
        goCreatePage={goCreatePage}
      />
    );
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        goCreatePage={goCreatePage}
      />

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;