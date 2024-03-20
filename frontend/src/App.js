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
  const dispatch = useDispatch();
  const { message: message } = useSelector(state => state.user);
  const { message: feedbackMessage } = useSelector(state => state.feedback);
  useEffect(() => {
    if (message.status === 200) {
      NotificationManager.success(message.content, "", 3000);
    } else if (message.status === 401) {
      NotificationManager.error(message.content, "", 3000);
    } else {
      return;
    }
    dispatch(resetMessage());
  }, [message]);
  useEffect(() => {
    if (feedbackMessage.status === 200) {
      NotificationManager.success(feedbackMessage.content, "", 3000);
    } else if (feedbackMessage.status === 401) {
      NotificationManager.error(feedbackMessage.content, "", 3000);
    } else {
      return;
    }
    dispatch(resetFeedbackMessage());
  }, [feedbackMessage]);
  return (
    <Router>
      <div className="text-[2rem]">
        <NotificationContainer />
      </div>

      <Routes>
        {
          QuestionRoutes.map(route => (
            <Route key={route.key} path={`${route.path}`} element={<route.component />} />
          ))
        }
        <Route path="question/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
