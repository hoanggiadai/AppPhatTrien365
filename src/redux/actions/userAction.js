export const UPDATE_NGUOI_DUNG = 'UPDATE_NGUOI_DUNG';
export const DELETE_NGUOI_DUNG = 'DELETE_NGUOI_DUNG';
export const SET_USER = 'SET_USER';
export const SET_STATUS = 'SET_STATUS';
export const SET_ERROR = 'SET_ERROR';
export const LOGOUT = 'LOGOUT'; // Thêm hành động logout

export const updateNguoiDung = (id, updatedContent) => ({
  type: UPDATE_NGUOI_DUNG,
  payload: { id, updatedContent },
});

export const deleteNguoiDung = (id) => ({
  type: DELETE_NGUOI_DUNG,
  payload: id,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  payload: status,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});