const Feedback = require('../model/FeedbackModel');

exports.createAFeedback = async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.status(200).json({
      feedback: newFeedback,
      message: 'このレビューは正常に投稿されました。'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

exports.getAllFeedbacks = async (req, res) => {
  const { page, unit } = req.query;
  try {
    const allFeedbacks = await Feedback.findAll({
      order: [['createdDate', 'DESC']]
    });
    const allPages = Math.ceil(allFeedbacks.length / unit);
    const resultFeedbacks = allFeedbacks.slice(unit * (page - 1), unit * page);
    res.status(200).json({
      result: resultFeedbacks,
      allPages,
      message: 'Getting Feedbacks successfully.'
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

exports.updateAResponse = async (req, res) => {
  console.log(req.body);
  const { id: feedbackId } = req.params;
  const { response } = req.body;

  try {
    const feedback = await Feedback.findOne({ where: { id: feedbackId } });
    if (feedback) {
      feedback.response = response;
      await feedback.save();
      res.status(200).json({
        feedback,
        message: "このレビューは正常に更新されました。"
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

exports.deleteAResponse = async (req, res) => {
  const { page, unit } = req.query;
  const { id: feedbackId } = req.params;
  console.log(req.query);

  try {
    const deletedRows = await Feedback.destroy({where: { id: feedbackId }});
    if (deletedRows > 0) {
      const allFeedbacks = await Feedback.findAll({
        order: [['createdDate', 'DESC']]
      });
      const allPages = Math.ceil(allFeedbacks.length / unit);
      const resultFeedbacks = allFeedbacks.slice(unit * (page - 1), unit * page);
      res.status(200).json({
        result: resultFeedbacks,
        allPages,
        message: 'このレビューは正常に削除されました。',
      })
    } else {
      return res.status(401).json({
        message: '削除に失敗しました。',
      })
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}