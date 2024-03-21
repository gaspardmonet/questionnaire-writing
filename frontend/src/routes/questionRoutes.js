import Dashboard from "../component/Dashboard";
import PostBadFeedback from "../component/PostBadFeedback";
import ViewFeedbackList from "../component/ViewFeedbackList";
import WaitingPostGoodFeedback from "../component/WaitingPostGoodFeedback";
import WaitingPostBadFeedback from "../component/WaitingPostBadFeedback";

const QuestionRoutes = [
  {
    key: 'dashboard',
    path: '/smile',
    component: Dashboard
  },
  {
    key: 'postBadFeedback',
    path: '/smile/post/bad_feedback',
    component: PostBadFeedback
  },
  {
    key: 'viewFeedbackList',
    path: '/smile/view/feedback_list',
    component: ViewFeedbackList
  },
  {
    key: 'waitingPostGoodFeedback',
    path: '/smile/post/good_feedback/waiting',
    component: WaitingPostGoodFeedback
  },
  {
    key: 'waitingPostBadFeedback',
    path: '/smile/post/bad_feedback/waiting',
    component: WaitingPostBadFeedback
  },
];

export default QuestionRoutes;