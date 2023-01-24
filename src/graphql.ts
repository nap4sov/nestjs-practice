
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface NewArticle {
    title: string;
    fullText: string;
    description: string;
}

export interface User {
    _id: string;
    email: string;
    name: string;
    avatar?: Nullable<string>;
    extra_details?: Nullable<string>;
    skills?: Nullable<string>;
    profession?: Nullable<string>;
    details?: Nullable<string>;
    dateCreated: string;
}

export interface Article {
    _id: string;
    title: string;
    fullText: string;
    description?: Nullable<string>;
    dateCreated: string;
    image?: Nullable<string>;
    likes: Nullable<string>[];
    postedBy?: Nullable<User>;
    comments: Nullable<Comment>[];
}

export interface Comment {
    _id: string;
    commentedBy?: Nullable<User>;
    followedCommentID?: Nullable<string>;
    postID: string;
    text: string;
    dateCreated: string;
    likes?: Nullable<Nullable<string>[]>;
}

export interface Pagination {
    limit?: Nullable<string>;
    skip?: Nullable<string>;
    total?: Nullable<string>;
}

export interface IQuery {
    allArticles(): Nullable<Nullable<Article>[]> | Promise<Nullable<Nullable<Article>[]>>;
    article(id: string): Nullable<Article> | Promise<Nullable<Article>>;
    articleAuthor(id: string): Nullable<User> | Promise<Nullable<User>>;
    comments(id: string): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;
    comment(id: string): Nullable<Comment> | Promise<Nullable<Comment>>;
    commentAuthor(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    addArticle(article: NewArticle): Nullable<Article> | Promise<Nullable<Article>>;
}

type Nullable<T> = T | null;
