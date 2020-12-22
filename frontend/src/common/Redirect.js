export const REDIRECT = "REDIRECT";

// action creators
export const redirect = (link) => {
  return { type: REDIRECT, payload: link };
};