import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { postTempFeedback, postAFeedback } from "../redux/slices/feedbackSlice";

const ServiceLevelList = ['非常に満足', '満足', 'どちらでもない', '不満', '非常に不満'];

const Dashboard = () => {
  const [serviceLevel, setServiceLevel] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    navigate("/smile");
  }, []);
  const handleClickLevelBtn = (index) => {
    if (index === serviceLevel) {
      setServiceLevel(-1);
    } else {
      setServiceLevel(index);
    }
  }
  const handleClickNextPageBtn = async () => {
    const feedback = {
      rating: 5 - serviceLevel
    };
    if (serviceLevel >= 0 && serviceLevel <= 1) {
      dispatch(postAFeedback(feedback));
      navigate('/smile/post/good_feedback/waiting');
    } else {
      dispatch(postTempFeedback(feedback));
      navigate('/smile/post/bad_feedback/waiting');
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="sm:w-[62rem] w-full">
        <div className="w-full text-center">
          <h1 className="w-full bg-[#4085c9] text-white text-[3.5rem] py-[1rem] font-semibold">
            スマイル歯科アンケート
          </h1>
          <p className="w-full text-[2.5rem] mt-[2rem] font-normal">総合評価アンケート</p>
          <p className="w-full text-[2rem] text-[rgba(0,0,0,0.6)] mt-[1.5rem] flex justify-center items-center">
            <AccessAlarmsIcon sx={{ fontSize: '2rem' }} />
            <span>(所要時間1分)</span>
          </p>
        </div>
        <div className="w-full mt-[3rem]">
          <div className="w-full text-center text-[2.5rem] font-semibold">Q.当院のサービス、対応は総合的にいかがでしょうか</div>
          <div className="w-full mt-[4rem]">
            {
              ServiceLevelList.map((level, index) => (
                <button key={index} className="w-full block font-normal flex justify-start items-center text-[2rem] rounded-full border-[1px] border-[#4085c9] px-[1rem] py-[1.2rem] my-[2rem] bg-white hover:bg-[rgba(64,133,201,0.3)]"
                  onClick={() => handleClickLevelBtn(index)}>
                  {
                    index === serviceLevel ? (
                      <CheckCircleIcon sx={{ color: '#4085c9', fontSize: '3rem' }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ color: '#4085c9', fontSize: '3rem' }} />
                    )
                  }
                  <span className="flex-grow text-center ml-[1rem]">{level}</span>
                </button>
              ))
            }
          </div>
        </div>
        <button className={`w-[50%] text-[2rem] block mx-auto text-white tracking-wider font-semibold border-[#4085c9] border-[2px] bg-[#4085c9] rounded-full py-[1.5rem] mt-[3rem] ${serviceLevel === -1 ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer hover:text-[#4085c9] hover:bg-white'}`}
          disabled={serviceLevel === -1 ? true : false} onClick={handleClickNextPageBtn}>
          次へ
        </button>
      </div>
    </div>
  );
}

export default Dashboard;