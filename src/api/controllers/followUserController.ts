import { customeAxios } from 'redux/axios';
import { FollowerType } from 'api/models/FollowerType';

const baseUrl = 'user/';

export const followUserApi = async (id: string) => {
  const { data } = await customeAxios.patch<FollowerType>(
    `${baseUrl}follow/${id}`
  );
  return data;
};

export const unFollowUserApi = async (id: string) => {
  const { data } = await customeAxios.patch<{ status: string }>(
    `${baseUrl}unfollow/${id}`
  );
  return data;
};
