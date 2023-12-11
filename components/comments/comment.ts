const getParentId = (cmt) => +cmt.comment.path?.split('.')?.at(-2)

export const getChildComments = (comments, c) => {
  return comments?.filter((a) => c.comment.id === getParentId(a))
}
