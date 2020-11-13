export const everything = state => state.comments;

export const current = state => everything(state).current;

export const lastComments = state => everything(state).lastComments;
