// interfaces
export interface iData {
  comment: { path: string; id: number };
}

export function buildCommentTree(comments: any[]) {
  if (!comments) return [];

  const commentMap: Record<string, any> = {};
  comments.forEach((item) => {
    item.comment.children = [];
    commentMap[item.comment.id] = item;
  });

  const tree: any[] = [];

  comments.forEach((item) => {
    const pathParts = item.comment.path.split(".");
    if (pathParts.length === 2) {
      tree.push(item);
    } else {
      const parentId = pathParts[pathParts.length - 2];
      const parentComment = commentMap[parentId];
      if (parentComment) {
        parentComment.comment.children.push(item);
      }
    }
  });

  return tree;
}
