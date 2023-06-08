import { customeAxios } from 'redux/axios';
import { PostType } from 'api/models/PostsType';

const baseUrl = 'posts/';

export const getAllPosts = async () => {
  const { data } = await customeAxios.get<PostType[]>(`${baseUrl}`);
  return data;
};

export const getPopularPosts = async () => {
  const { data } = await customeAxios.get<PostType[]>(`${baseUrl}popular`);
  return data;
};
