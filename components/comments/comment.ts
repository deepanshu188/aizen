// interfaces
export interface iData {
  comment: { path: string; id: number };
}

export interface iUser {
  data: iData;
  user: Object;
  setPersonInfo: Function;
  setUserDetails: Function;
  dataLoading: boolean;
  userLoading: boolean;
}

// helper functions

const getParentId = (cmt: iData) =>
  +cmt.comment.path?.split('.')?.at(-2);

export const getChildComments = (comments: any, c: iData) => {
  return comments?.filter(
    (a: any) => c.comment.id === getParentId(a)
  );
};
