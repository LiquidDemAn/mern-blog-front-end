import { customeAxios } from '../../redux/axios';

export const getTags = async () => {
  const { data } = await customeAxios.get<string[]>('tags');
  return data;
};
