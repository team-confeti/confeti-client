import type { Agency } from '@shared/types';

export const AGENCIES: Agency[] = [
  {
    id: 1,
    name: '인터파크 티켓',
    logoUrl: '',
    baseUrl: 'http://ticket.interpark.com',
  },
  {
    id: 2,
    name: '멜론 티켓',
    logoUrl: '',
    baseUrl: 'http://ticket.melon.com',
  },
  {
    id: 3,
    name: '예스24 티켓',
    logoUrl: '',
    baseUrl: 'http://ticket.yes24.com',
  },
  {
    id: 4,
    name: '위메프',
    logoUrl: '',
    baseUrl: 'https://www.wemakeprice.com',
  },
  {
    id: 5,
    name: '티켓링크',
    logoUrl: '',
    baseUrl: 'https://www.ticketlink.co.kr',
  },
] as const;
