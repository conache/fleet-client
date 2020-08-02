import Immutable from 'seamless-immutable';
import { createAction, handleActions } from 'redux-actions';

export const updateUploadProgress = createAction('uploads/UPDATE_UPLOAD_PROGRESS');

export default handleActions(
    {
        [updateUploadProgress]: (state, action) => ({progress: action.payload}),
    }, 
    Immutable({})
);

export const updateProgress = (progress) => {
    return (dispatch) => {
        dispatch(updateUploadProgress(progress))
    };
}