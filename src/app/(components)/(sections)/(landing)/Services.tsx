'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { constants } from '@/core/utils/constants';

import { parseHtml } from '@/core/utils/helper';
import serviceApi from '@/modules/servicess/servicessApi';
import { ServiceType } from '@/modules/servicess/servicessType';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Services() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(serviceApi.endpoints.getAllService.initiate(1));
  }, [dispatch]);

  const serviceData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getAllService(1)']
        ?.data as PaginatedResponseType<ServiceType>
  );

  return (
    <section className="services">
      <h2>WHAT WE DO</h2>
      <div className="flex justify-center gap-5 flex-wrap">
        {serviceData?.results?.map((service, index) => (
          <button
            className="card flex flex-col gap-4 cursor-pointer "
            key={index}
          >
            <Image
              src={constants.baseUrl + service.blog.coverImage}
              alt={service.title ?? ''}
              width={100}
              height={100}
              className="rounded-md"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = '/images/errors/placeholder.webp';
              }}
            />
            <h3 className="font-bold text-lg m-0">{service.title}</h3>
            <p className="text-left">
              {parseHtml(
                service.blog.description.length > 100
                  ? service.blog.description.slice(0, 100) + '...'
                  : service.blog.description
              )}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
