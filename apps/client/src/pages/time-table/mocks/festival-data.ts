export const REGISTERDED_FESTIVAL = {
  data: {
    fetivals: [
      {
        festivalId: 1,
        title: '서울 재즈 페스티벌',
        logoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH002NsZaKx9wCpCHWJEurbvvLv2-yTr67uA&s',
        festivalDates: [
          {
            festivalDateId: 1,
            festivalAt: '2025.01.01',
          },
          {
            festivalDateId: 2,
            festivalAt: '2025.01.02',
          },
        ],
      },
    ],
  },
} as const;
