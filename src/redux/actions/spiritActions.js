export const SET_TINH_THAN = 'SET_TINH_THAN';
export const UPDATE_TINH_THAN = 'UPDATE_TINH_THAN';
export const DELETE_TINH_THAN = 'DELETE_TINH_THAN';

export const setTinhThan = (data) => ({
  type: SET_TINH_THAN,
  payload: data,
});

export const updateTinhThan = (id, updatedContent) => ({
  type: UPDATE_TINH_THAN,
  payload: { id, updatedContent },
});

export const deleteTinhThan = (id) => ({
  type: DELETE_TINH_THAN,
  payload: id,
});