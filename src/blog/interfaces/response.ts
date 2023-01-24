export interface IBlogArticle {
  _id: 'string';
  title: 'string';
  fullText: 'string';
  description: 'string';
  dateCreated: 'string';
  image: 'string';
  likes: 'string'[];
  postedBy: 'string';
}

export interface IBlogResponse {
  pagination: {
    limit: 'string';
    skip: 'string';
    total: 'string';
  };
  data: IBlogArticle[];
}

export interface IComment {
  _id: 'string';
  commentedBy: 'string';
  followedCommentID: 'string';
  postID: 'string';
  text: 'string';
  dateCreated: 'string';
  likes: 'string'[];
}

export interface IUser {
  _id: 'string';
  email: 'string';
  name: 'string';
  avatar: 'string';
  extra_details: 'string';
  skills: 'string';
  profession: 'string';
  details: 'string';
  dateCreated: 'string';
}
