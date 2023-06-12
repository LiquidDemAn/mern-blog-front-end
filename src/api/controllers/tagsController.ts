import { customeAxios } from 'redux/axios';

export const getTagsApi = async () => {
  const { data } = await customeAxios.get<string[]>('/tags');
  return data;
};
