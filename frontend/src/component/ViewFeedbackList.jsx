import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from "@mui/material";
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { getAllFeedbacks, updateAFeedback, deleteAFeedback } from "../redux/slices/feedbackSlice";
import { loginAdmin, updatePassword, resetUserStore, loginWithToken, resetMessage } from "../redux/slices/userSlice";

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            // Modify the styles for the pagination item
            // For example, change the font size and padding
            fontSize: '2rem',
            padding: '1rem',
          },
        },
      },
    },
  },
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '1px solid #4085c9',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  width: '45rem'
};

const ViewFeedbackList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const settingRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginErrorMessage: loginError } = useSelector(state => state.user);
  const { updatePasswrodErrorMessage: passwordError } = useSelector(state => state.user);
  const { allFeedbacks } = useSelector(state => state.feedback);
  const { allPages } = useSelector(state => state.feedback);
  const { token: token } = useSelector(state => state.user);
  const [page, setPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSettingList, setShowSettingList] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showPostResponseModal, setShowPostResponseModal] = useState(false);
  const [postingFeedback, setPostingFeedback] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("smiledentist@gmail.com");
  const [adminResponse, setAdminResponse] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmErrorMessage, setConfirmErrorMessage] = useState("");
  const [visible_1, setVisible_1] = useState(false);
  const [visible_2, setVisible_2] = useState(false);
  const [visible_3, setVisible_3] = useState(false);
  const [visible_4, setVisible_4] = useState(false);

  const handleOutsideClick = (event) => {
    if (settingRef.current && !settingRef.current.contains(event.target)) {
      setShowSettingList(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    if (!token) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [token]);
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------
  useEffect(() => {
    dispatch(getAllFeedbacks({
      page,
      unit: 10
    }));
  }, [searchParams]);
  useEffect(() => {
    if (!searchParams.get("page") || typeof (searchParams.get('page')) !== 'Number') {
      setPage(1);
    } else {
      if (searchParams.get('page') > allPages) {
        setPage(1);
      } else {
        setPage(searchParams.get('page'));
      }
    }
  }, []);
  useEffect(() => {
    setSearchParams({ page: page });
  }, [page]);
  //----------------------------------------------------------
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    }
  }, []);
  //-------------------------------------------------------------
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loginWithToken());
    }
  }, []);
  //-------------------------------------------------------------
  const handleClickLogoutBtn = () => {
    setShowSettingList(false);
    const alert = "本当に脱退しますか？";
    if (window.confirm(alert)) {
      dispatch(resetUserStore());
    }
  }
  //------------------------------------------------------------------
  const handleClickPostResponseBtn = (index) => {
    setPostingFeedback(allFeedbacks[index]);
    setAdminResponse(allFeedbacks[index].response);
    setShowPostResponseModal(true);
  }
  const handleClickDeleteBtn = (feedbakcId) => {
    const alertMessage = "本当に削除しますか？";
    if (window.confirm(alertMessage)) {
      dispatch(deleteAFeedback({
        id: feedbakcId,
        page: page,
        unit: 10,
      }));
    }
  }
  //-------------------------------------------------------------------
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const changeDateFormat = (dateInfo) => {
    const date = new Date(dateInfo);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = date.getDate();
    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour;
    let minute = date.getMinutes();
    if (minute < 10) minute = '0' + minute;
    let second = date.getSeconds();
    if (second < 10) second = '0' + second;
    return `${year}.${month}.${d} ${hour}:${minute}:${second}`;
  }
  //--------------------------------------------------------------------
  useEffect(() => {
    console.log(loginError);
    if (!loginError) {
      return;
    }
    const timer = setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
    return () => {
      clearTimeout(timer);
    }
  }, [loginError]);
  useEffect(() => {
    console.log(passwordError);
    if (!passwordError) {
      return;
    }
    const timer = setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
    return () => {
      clearTimeout(timer);
    }
  }, [passwordError]);
  const handleCloseLoginModal = () => {
    setAdminPassword("");
    setShowLoginModal(false);
  }
  const handleClickLoginPostBtn = () => {
    const payload = {
      email: adminEmail,
      password: adminPassword
    };
    dispatch(loginAdmin(payload))
      .then(res => {
        if (res.payload) {
          handleCloseLoginModal();
        }
      })
      .catch(err => {
        console.error(err)
      });
  }
  //-------------------------------------------------------------------------
  const handleClosePostResponseModal = () => {
    setPostingFeedback(null);
    setAdminResponse("");
    setShowPostResponseModal(false);
  }
  const handleClickResponsePostBtn = (feedbakcId) => {
    const payload = {
      id: feedbakcId,
      response: adminResponse
    };
    dispatch(updateAFeedback(payload));
    setShowPostResponseModal(false);
  }
  //----------------------------------------------------------
  const handleCloseChangePasswordModal = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setConfirmErrorMessage("");
    setShowChangePasswordModal(false);
  }
  const handleChangeConfirmPassword = (e) => {
    const confirmValue = e.target.value;
    setConfirmPassword(confirmValue);
    if (newPassword !== confirmValue) {
      setConfirmErrorMessage("確認のためのパスワードが正しくありません。");
    } else {
      setConfirmErrorMessage("");
    }
  }
  const handleChangePasswordPostBtn = () => {
    if (confirmErrorMessage) {
      return;
    }
    dispatch(updatePassword({
      currentPassword: oldPassword,
      newPassword: newPassword
    }))
      .then(res => {
        if (res.payload) {
          handleCloseChangePasswordModal();
        }
      })
      .catch(err => {
        console.error(err);
      })
  }
  return (
    <div className="w-full">
      <div className="md:w-[80rem] w-full mx-auto">
        <div className="w-full border-b-[2px] border-[rgb(64,133,201)] py-[1rem] flex justify-end items-center">
          {
            !isAdmin ? (
              <button className="py-[0.5rem] px-[2rem] text-[1.2rem] mx-[1rem] text-center rounded-full bg-[rgb(64,133,201)] border-[rgb(64,133,201)] border-[1px] text-white hover:text-[rgb(64,133,201)] hover:bg-white"
                onClick={() => setShowLoginModal(true)}>
                管理者として
              </button>
            ) : (
              <div className="relative mx-[1rem]" ref={settingRef}>
                <IconButton onClick={() => setShowSettingList(!showSettingList)}>
                  <Avatar sx={{ bgcolor: deepPurple[500], fontSize: '1rem' }}>ADMIN</Avatar>
                </IconButton>
                <div className={`absolute top-[5rem] right-0 z-10 w-[15rem] p-[1rem] shadow-md bg-white border-[1px] border-[#4085c9] ${showSettingList ? 'block' : 'hidden'} rounded-md`}>
                  <button className="py-[1rem] w-full text-center text-[1.2rem] text-[rgba(0,0,0,0.7)] hover:bg-[rgba(0,0,0,0.03)]"
                    onClick={() => setShowChangePasswordModal(true)}>
                    パスワード変更
                  </button>
                  <button className="py-[1rem] w-full text-center text-[1.2rem] text-[rgba(0,0,0,0.7)] hover:bg-[rgba(0,0,0,0.03)] border-t-[1px] border-[#4085c9]"
                    onClick={handleClickLogoutBtn}>
                    お客様の方法で
                  </button>
                </div>
              </div>
            )
          }
        </div>
        <div className="w-full mt-[4rem]">
          <div className="w-full">
            <table className="w-full text-center text-[1.6rem] table-border">
              <thead>
                <tr className="leading-relaxed tracking-wide table-border">
                  <th className="w-[5%] py-[1.5rem] table-border">番号</th>
                  <th className="w-[15%] py-[1.5rem] table-border">日付</th>
                  <th className="w-[30%] py-[1.5rem] table-border">評価数</th>
                  <th className="py-[1.5rem] table-border">評価内容</th>
                </tr>
              </thead>
              <tbody>
                {
                  allFeedbacks.map((feedback, index) => (
                    <React.Fragment key={index}>
                      <tr className="leading-relaxed tracking-wide table-border">
                        <td className="w-[5%] py-[1.5rem] table-border">{(page - 1) * 10 + index + 1}</td>
                        <td className="w-[15%] table-border">
                          {changeDateFormat(feedback.createdDate)}
                          {/* {feedback.date} */}
                        </td>
                        <td className="w-[30%] py-[1.5rem] table-border">
                          <Rating sx={{ fontSize: '3rem' }} value={feedback.rating} readOnly />
                        </td>
                        <td className="py-[1.5rem] table-border">{feedback.comment}</td>
                      </tr>
                      <tr className="table-border">
                        <td className="w-[5%] table-border"></td>
                        <td className="w-[15%] table-border"></td>
                        <td className="w-[30%] table-border"></td>
                        <td className="w-[50%] table-border p-[1rem]">
                          <div className="min-h-[10rem] scrollbar-container text-left sm:w-[40rem] w-[30rem]">{feedback.response}</div>
                          <div className={`w-full flex justify-end items-center ${isAdmin ? 'block' : 'hidden'}`}>
                            <Button variant="contained" endIcon={<SendIcon />} sx={{ fontSize: '1.2rem', marginRight: '1rem', paddingX: '1rem', paddingY: '0.5rem' }}
                              onClick={() => handleClickPostResponseBtn(index)}>
                              投稿
                            </Button>
                            <Button variant="outlined" color="error" endIcon={<DeleteIcon />} sx={{ fontSize: '1.2rem', marginRight: '1rem', paddingX: '1rem', paddingY: '0.5rem', backgroundColor: 'white' }}
                              onClick={() => handleClickDeleteBtn(feedback.id)}>
                              削除
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="w-full px-[3rem] mt-[2rem] flex justify-center items-center">
            <ThemeProvider theme={theme}>
              <Pagination count={allPages} page={page} boundaryCount={2} color="primary" onChange={handleChangePage} size="large" showFirstButton showLastButton />
            </ThemeProvider>
          </div>
        </div>
      </div>
      <Modal
        open={showLoginModal}
        onClose={handleCloseLoginModal}>
        <Box sx={style}>
          <div className="w-full">
            <p className="text-red-500 text-[1.2rem] tracking-wider text-center py-[1rem]">{loginError}</p>
            <div className="w-full">
              <label htmlFor="input-adminId" className="text-[1.4rem] pr-[2rem]">メール番号</label>
              <input type="text" id="input-adminId" name="input-adminId" defaultValue={adminEmail} className="px-[1rem] py-[1rem] text-[1.4rem] rounded-md border-[1px] border-[rgb(64,133,201)] outline-none shadow-md " readOnly />
            </div>
            <div className="w-full flex justfiy-between items-center mt-[2rem]">
              <label htmlFor="input-adminpassword" className="text-[1.4rem] pr-[2rem]">パスワード</label>
              <div className="w-[65%] flex justify-between items-center px-[1rem] py-[0.5rem] text-[1.4rem] rounded-md border-[1px] border-[rgb(64,133,201)] shadow-md">
                <input type={`${visible_1 ? 'text' : 'password'}`} id="input-adminpassword" name="input-adminpassword" placeholder="パスワードを入力してください。" className="flex-grow p-0 border-none outline-none focus:caret-blue-500"
                  value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                <IconButton onClick={() => setVisible_1(!visible_1)}>
                  {
                    visible_1 ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )
                  }
                </IconButton>
              </div>
            </div>
            <div className="w-full flex justify-end items-center mt-[3rem]">
              <button className="text-[1.4rem] w-[10rem] py-[0.5rem] text-white rounded-full bg-[#4085c9] mr-[1rem] border-[1px] border-[#4085c9] hover:bg-white hover:text-[#4085c9]"
                onClick={handleClickLoginPostBtn}>
                参加
              </button>
              <button className="text-[1.4rem] w-[10rem] py-[0.5rem] text-[#4085c9] rounded-full bg-white border-[1px] border-[#4085c9] hover:bg-[#4085c9] hover:text-white"
                onClick={handleCloseLoginModal}>
                キャンセル
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={showPostResponseModal}
        onClose={handleClosePostResponseModal}>
        <Box sx={style}>
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
              <label className="w-[20%] text-[1.4rem] pr-[2rem]">評価数</label>
              <Rating sx={{ fontSize: '3rem' }} value={postingFeedback?.rating} readOnly />
            </div>
            <div className="w-full mt-[2rem]">
              <label className="text-[1.4rem] py-[1rem]">評価内容</label>
              <p className="w-full border-[1px] border-[#4085c9] rounded-md shadow-md bg-white text-[1.4rem] p-[1rem] leading-relaxed tracking-wide">
                {postingFeedback?.comment}
              </p>
            </div>
            <div className="w-full mt-[2rem]">
              <textarea name="input-comment" id="input-comment" className="scrollbar-container min-h-[20rem] w-full outline-none text-[1.5rem] leading-loose tracking-wider text-[rgba(0,0,0,0.85)] p-[1rem] border-rgba(0,0,0,0.7) border-[2px] rounded-lg"
                placeholder="投稿内容を入力してください。" onChange={(e) => setAdminResponse(e.target.value)} value={adminResponse}>
              </textarea>
            </div>
            <div className="w-full flex justify-end items-center mt-[3rem]">
              <button className="text-[1.4rem] w-[10rem] py-[0.5rem] text-white rounded-full bg-[#4085c9] mr-[1rem] border-[1px] border-[#4085c9] hover:bg-white hover:text-[#4085c9]"
                onClick={() => handleClickResponsePostBtn(postingFeedback.id)}>
                投稿
              </button>
              <button className="text-[1.4rem] w-[10rem] py-[0.5rem] text-[#4085c9] rounded-full bg-white border-[1px] border-[#4085c9] hover:bg-[#4085c9] hover:text-white"
                onClick={handleClosePostResponseModal}>
                キャンセル
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={showChangePasswordModal}
        onClose={handleCloseChangePasswordModal}>
        <Box sx={style}>
          <div className="w-full flex flex-col items-center">
            <p className="text-red-500 text-[1.2rem] tracking-wider text-center py-[1rem]">{passwordError}</p>
            <div className="w-full flex justify-between items-center">
              <label htmlFor="input-admin-old-password" className="text-[1.4rem] pr-[2rem]">以前のパスワード</label>
              <div className="w-[65%] flex justify-between items-center px-[1rem] py-[0.5rem] text-[1.4rem] rounded-md border-[1px] border-[rgb(64,133,201)] shadow-md">
                <input type={`${visible_2 ? 'text' : 'password'}`} id="input-admin-old-password" name="input-admin-old-password"
                  value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="flex-grow outline-none focus:caret-blue-500 " />
                <IconButton onClick={() => setVisible_2(!visible_2)}>
                  {
                    visible_2 ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )
                  }
                </IconButton>
              </div>
            </div>
            <div className="w-full mt-[2rem] flex justify-between items-center">
              <label htmlFor="input-admin-new-password" className="text-[1.4rem] pr-[2rem]">新しいパスワード</label>
              <div className="w-[65%] flex justify-between items-center px-[1rem] py-[0.5rem] text-[1.4rem] rounded-md border-[1px] border-[rgb(64,133,201)] shadow-md">
                <input type={`${visible_3 ? 'text' : 'password'}`} id="input-admin-new-password" name="input-admin-new-password"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="flex-grow outline-none focus:caret-blue-500" />
                <IconButton onClick={() => setVisible_3(!visible_3)}>
                  {
                    visible_3 ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )
                  }
                </IconButton>
              </div>
            </div>
            <div className="w-full mt-[2rem] flex justify-between items-center">
              <label htmlFor="input-admin-confirm-password" className="text-[1.4rem] pr-[2rem]">パスワード確認</label>
              <div className="w-[65%] flex justify-between items-center px-[1rem] py-[0.5rem] text-[1.4rem] rounded-md border-[1px] border-[rgb(64,133,201)] shadow-md">
                <input type={`${visible_4 ? 'text' : 'password'}`} id="input-admin-confirm-password" name="input-admin-confirm-password"
                  value={confirmPassword} onChange={handleChangeConfirmPassword} className="flex-grow outline-none focus:caret-blue-500" />
                <IconButton onClick={() => setVisible_4(!visible_4)}>
                  {
                    visible_4 ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )
                  }
                </IconButton>
              </div>
            </div>
            {
              confirmErrorMessage && (
                <p className="text-[1.2rem] text-red-600 py-[0.5rem]">{confirmErrorMessage}</p>
              )
            }
            <div className="w-full flex justify-end items-center mt-[3rem]">
              <button className="text-[1.4rem] w-[10rem] py-[0.5rem] text-white rounded-full bg-[#4085c9] mr-[1rem] border-[1px] border-[#4085c9] hover:bg-white hover:text-[#4085c9]"
                onClick={handleChangePasswordPostBtn}>
                投稿
              </button>
              <button className="text-[1.4rem] w-[10rem] py-[0.5rem] text-[#4085c9] rounded-full bg-white border-[1px] border-[#4085c9] hover:bg-[#4085c9] hover:text-white"
                onClick={handleCloseChangePasswordModal}>
                キャンセル
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewFeedbackList;