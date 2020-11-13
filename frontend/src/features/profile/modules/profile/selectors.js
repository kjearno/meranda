export const everything = state => state.profile;

export const user = state => everything(state).user;

export const isAdmin = state => user(state).isAdmin;
