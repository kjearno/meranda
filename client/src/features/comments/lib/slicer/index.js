export const sliceComments = comments =>
  comments.map(comment => {
    const commentCopy = { ...comment };
    const { text } = commentCopy;
    commentCopy.text = text.slice(0, 32);

    if (text.length > 32) {
      commentCopy.text = `${commentCopy.text}...`;
    }

    return commentCopy;
  });

export const sliceComment = comment => {
  const commentCopy = { ...comment };
  const { text } = commentCopy;
  commentCopy.text = text.slice(0, 32);

  if (text.length > 32) {
    commentCopy.text = `${commentCopy.text}...`;
  }

  return commentCopy;
};
