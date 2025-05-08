import React from "react";

import { Header } from "./components/Header";
import "./global.css";
import { TasksOverview } from "./components/TasksOverview";

export const App = () => {
  return (
    <div className="bg-base-gray-600 min-h-screen font-primary">
      <Header />
      <TasksOverview />
    </div>
  );
};
