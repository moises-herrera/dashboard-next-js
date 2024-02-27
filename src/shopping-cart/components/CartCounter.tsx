'use client';

import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { addOne, initCounterState, substractOne } from '@/store/counter';

interface CartCounterProps {
  value?: number;
}

export interface CounterResponse {
  method: string;
  count: number;
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const data = await fetch('/api/counter').then((res) => res.json());
  return data;
};

export const CartCounter: FC<CartCounterProps> = ({ value = 0 }) => {
  const count = useAppSelector(({ counter }) => counter.count);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getApiCounter().then(({ count }) => dispatch(initCounterState(count)));
  }, [dispatch]);

  return (
    <>
      <span className="text-9xl">{count}</span>

      <div className="flex">
        <button
          onClick={() => dispatch(addOne())}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
        >
          +1
        </button>
        <button
          onClick={() => dispatch(substractOne())}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
        >
          -1
        </button>
      </div>
    </>
  );
};
