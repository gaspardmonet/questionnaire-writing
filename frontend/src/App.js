import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-notifications/lib/notifications.css"
import { NotificationContainer, NotificationManager } from "react-notifications";
import { resetFeedbackMessage } from "./redux/slices/feedbackSlice";
import { resetMessage } from "./redux/slices/userSlice";
import Dashboard from "./component/Dashboard";
import axios from "axios";

import QuestionRoutes from "./routes/questionRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {
          QuestionRoutes.map(route => (
            <Route key={route.key} path={`${route.path}`} element={<route.component />} />
          ))
        }
        <Route path="smile/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
