import Dashboard from "../component/Dashboard";
import PostBadFeedback from "../component/PostBadFeedback";
import ViewFeedbackList from "../component/ViewFeedbackList";
import WaitingPostGoodFeedback from "../component/WaitingPostGoodFeedback";
import WaitingPostBadFeedback from "../component/WaitingPostBadFeedback";

const QuestionRoutes = [
  {
    key: 'dashboard',
    path: '/question',
    component: Dashboard
  },
  {
    key: 'postBadFeedback',
    path: '/question/post/bad_feedback',
    component: PostBadFeedback
  },
  {
    key: 'viewFeedbackList',
    path: '/question/view/feedback_list',
    component: ViewFeedbackList
  },
  {
    key: 'waitingPostGoodFeedback',
    path: '/question/post/good_feedback/waiting',
    component: WaitingPostGoodFeedback
  },
  {
    key: 'waitingPostBadFeedback',
    path: '/question/post/bad_feedback/waiting',
    component: WaitingPostBadFeedback
  },
];

export default QuestionRoutes;