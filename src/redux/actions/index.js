export const SAVE_USER = (payload) => {
  return {
    type: 'SAVE_USER',
    payload: payload,
  };
};
export const SAVE_POST = (payload) => {
  return {
    type: 'SAVE_POST',
    payload: payload,
  };
};
export const Followers = (payload) => {
  return {
    type: 'Followers',
    payload: payload,
  };
};
export const LOGOUT_USER = () => {
return {
  type: 'LOGOUT',
};
};
