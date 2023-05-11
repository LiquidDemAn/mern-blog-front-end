import { customeAxios } from 'redux/axios';
import { FollowerType } from 'api/models/FollowerType';

export const followUserApi = async (id: string) => {
  const { data } = await customeAxios.patch<FollowerType>(`/user/follow/${id}`);
  return data;
};

export const unFollowUserApi = async (id: string) => {
  const { data } = await customeAxios.patch<{ status: string }>(
    `/user/unfollow/${id}`
  );
  return data;
};
