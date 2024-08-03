import { UPDATE_NGUOI_DUNG, DELETE_NGUOI_DUNG, SET_USER, SET_STATUS, SET_ERROR, LOGOUT } from '../actions/userAction';

const initialState = {
  nguoiDung: null, // Thay đổi từ mảng thành đối tượng
  status: 'idle',
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NGUOI_DUNG:
      // Cập nhật thông tin người dùng hiện tại
      return {
        ...state,
        nguoiDung: state.nguoiDung && state.nguoiDung.id === action.payload.id
          ? { ...state.nguoiDung, ...action.payload.updatedContent }
          : state.nguoiDung
      };
    case DELETE_NGUOI_DUNG:
      // Không cần xử lý vì chỉ lưu thông tin người dùng hiện tại
      return state;
    case SET_USER:
      // Cập nhật thông tin người dùng hiện tại
      return {
        ...state,
        nguoiDung: action.payload,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        nguoiDung: null, // Xóa thông tin người dùng khi đăng xuất
      };
    default:
      return state;
  }
};

export default userReducer;