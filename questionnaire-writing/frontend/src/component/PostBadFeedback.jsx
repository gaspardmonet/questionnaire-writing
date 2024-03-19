import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';

import { postAFeedback } from "../redux/slices/feedbackSlice";

const PostBadFeedback = () => {
  const { tempFeedback } = useSelector(state => state.feedback)
  const [rating, setRating] = useState(tempFeedback.rating);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickPostBtn = () => {
    const payload = {
      rating,
      comment
    };
    dispatch(postAFeedback(payload));
    navigate("/question/view/feedback_list");
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="sm:w-[62rem] w-full flex flex-col justify-center items-center border-[2px] border-[#4085c9] rounded-[1rem] overflow-hidden shadow-2xl">
        <h1 className="w-full text-center bg-[#4085c9] text-white text-[3.5rem] py-[1rem] font-semibold">
          評価とレビュー
        </h1>
        <div className="w-full flex flex-col items-center mt-[2rem]">
          <Rating
            name="simple-controlled"
            sx={{ fontSize: '4rem' }}
            value={rating}
            onChange={(event, newValue) => {
              console.log(newValue);
              setRating(newValue);
            }}
          />
          <div className="w-full px-[2rem] mt-[2rem]">
            <textarea name="input-comment" id="input-comment" className="scrollbar-container min-h-[20rem] w-full outline-none text-[1.5rem] leading-loose tracking-wider text-[rgba(0,0,0,0.85)] p-[1rem] border-rgba(0,0,0,0.7) border-[2px] rounded-lg"
            placeholder="星評価を選択したら、コメントやリクエストを聞いてください。" onChange={(e) => setComment(e.target.value)} value={comment}>
            </textarea>
          </div>
        </div>
        <button className={`block w-[50%] rounded-full text-white text-[2rem] py-[1.5rem] my-[1rem] border-[2px] ${comment ? 'border-[#4085c9] bg-[#4085c9] hover:text-[#4085c9] hover:bg-white' : 'border-[rgba(0,0,0,0.03)] bg-[rgba(0,0,0,0.5)] hover:cursor-not-allowed'}`}
          disabled={comment ? false : true}
          onClick={handleClickPostBtn}>
          投稿
        </button>
      </div>
    </div>
  );
}

export default PostBadFeedback;