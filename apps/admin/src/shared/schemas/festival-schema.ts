import { type DefaultValues } from 'react-hook-form';
import { z } from 'zod';

// TODO: 스키마 수정 필요
export const festivalSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  subTitle: z.string().min(1, '부제목을 입력해주세요'),
  startDate: z.string().min(1, '시작일을 선택해주세요'),
  endDate: z.string().min(1, '종료일을 선택해주세요'),
  location: z.string().min(1, '장소를 입력해주세요'),
  reservationDate: z.string().min(1, '예매일을 선택해주세요'),
  ageLimit: z.string().min(1, '연령제한을 입력해주세요'),
  festivalTime: z.string().min(1, '공연 시간을 입력해주세요'),
  festivalPrice: z.string().min(1, '가격을 입력해주세요'),
  festivalAddress: z.string().min(1, '주소를 입력해주세요'),
  posterImage: z.instanceof(File).refine((file) => file.size > 0, {
    message: '포스터 이미지를 업로드해주세요',
  }),
  festivalLogo: z.instanceof(File).refine((file) => file.size > 0, {
    message: '로고 이미지를 업로드해주세요',
  }),
  reservationLinks: z.array(
    z.object({
      reservationUrl: z.string().min(1, '예매 URL을 입력해주세요'),
      reservationSiteName: z.string().min(1, '예매 사이트명을 입력해주세요'),
      reservationSiteLogo: z.instanceof(File).refine((file) => file.size > 0, {
        message: '로고 이미지를 업로드해주세요',
      }),
    }),
  ),
  festivalStages: z.array(
    z.object({
      stageTitle: z.string().min(1, '스테이지 이름을 입력해주세요'),
      stageOrder: z.string().min(1, '스테이지 순서를 입력해주세요'),
    }),
  ),
  festivalDates: z.array(
    z.object({
      date: z.string().min(1, '페스티벌 날짜를 입력해주세요'),
      ticketOpenTime: z.string().min(1, '티켓 오픈 시간을 입력해주세요'),
      schedules: z.array(
        z.object({
          stages: z
            .array(
              z.object({
                startTime: z.string().min(1, '공연 시작 시간을 입력해주세요'),
                endTime: z.string().min(1, '공연 종료 시간을 입력해주세요'),
                artistIds: z.array(
                  z.object({
                    value: z.string().min(1, '아티스트 ID를 입력해주세요'),
                  }),
                ),
              }),
            )
            .length(3),
        }),
      ),
    }),
  ),
});

export const festivalDefaultValues: DefaultValues<
  z.infer<typeof festivalSchema>
> = {
  title: '',
  subTitle: '',
  startDate: '',
  endDate: '',
  location: '',
  reservationDate: '',
  ageLimit: '',
  festivalTime: '',
  festivalPrice: '',
  festivalAddress: '',
  posterImage: new File([], ''),
  festivalLogo: new File([], ''),
  festivalStages: [
    {
      stageTitle: '',
      stageOrder: '',
    },
  ],
  reservationLinks: [
    {
      reservationUrl: '',
      reservationSiteName: '',
      reservationSiteLogo: new File([], ''),
    },
  ],
  festivalDates: [
    {
      date: '',
      ticketOpenTime: '',
      schedules: [
        {
          stages: [
            { startTime: '', endTime: '', artistIds: [{ value: '' }] },
            { startTime: '', endTime: '', artistIds: [{ value: '' }] },
            { startTime: '', endTime: '', artistIds: [{ value: '' }] },
          ],
        },
      ],
    },
  ],
};
