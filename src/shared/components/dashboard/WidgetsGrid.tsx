'use client';

import { IoCartOutline } from 'react-icons/io5';
import { SimpleWidget } from '..';
import { useAppSelector } from '@/store';

export const WidgetsGrid = () => {
  const cartCount = useAppSelector(({ counter }) => counter.count);

  return (
    <div className="flex justify-center flex-wrap p-2">
      <SimpleWidget
        title={`${cartCount}`}
        subTitle="Productos agregados"
        label="Contador"
        icon={<IoCartOutline size={70} className="text-blue-600" />}
        href="/dashboard/counter"
      />
    </div>
  );
};
