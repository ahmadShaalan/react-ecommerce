import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { Order } from '../types';

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await httpClient.get<Order[]>('/orders');

  return data;
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
};
