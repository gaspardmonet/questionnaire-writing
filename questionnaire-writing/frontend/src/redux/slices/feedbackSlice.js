import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

const initialState = {
  tempFeedback: {},
  allFeedbacks: [],
  allPages: 0,
  message: {
    status: 0,
    content: ""
  },
  postResult: {}
}

export const postAFeedback = createAsyncThunk(
  "feedback/post",
  async (payload) => {
    const res = await http.post("feedback/post", payload);
    return res.data;
  }
)
export const getAllFeedbacks = createAsyncThunk(
  "feedbakcs/all",
  async (payload) => {
    const res = await http.get(`feedback/all?page=${payload.page}&unit=${payload.unit}`);
    return res.data;
  }
)
export const updateAFeedback = createAsyncThunk(
  "feeeback/update",
  async (payload) => {
    console.log(payload);
    const res = await http.put(`feedback/response/${payload.id}`, {
      response: payload.response
    });
    return res.data;
  }
)

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    postTempFeedback: (state, action) => {
      console.log(action.payload);
      state.tempFeedback = { ...action.payload };
    },
    resetFeedbackMessage: (state) => {
      state.message = {
        status: 0,
        content: ""
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAFeedback.fulfilled, (state, action) => {
        state.postResult = { ...action.payload.feedback };
        state.message.status = 200;
        state.message.content = action.payload.message;
      })
      .addCase(postAFeedback.rejected, (state, action) => {
        state.message.status = 401;
        state.message.content = action.error.message;
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.allFeedbacks = [...action.payload.result];
        state.allPages = action.payload.allPages;
      })
      .addCase(getAllFeedbacks.rejected, (state, action) => {
        state.message.status = 401;
        state.message.content = action.error?.message;
      })
      .addCase(updateAFeedback.fulfilled, (state, action) => {
        console.log(action.payload);
        const index = state.allFeedbacks.findIndex(item => item.id === action.payload.feedback.id);
        state.allFeedbacks[index] = action.payload.feedback;
        state.message.status = 200;
        state.message.content = action.payload.message;
      })
      .addCase(updateAFeedback.rejected, (state, action) => {
        state.message.status = 401;
        state.message.content = action.error?.message;
      })
  }
});

export const { postTempFeedback, resetFeedbackMessage } = feedbackSlice.actions;
export default feedbackSlice.reducer;