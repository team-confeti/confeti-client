import { type DefaultValues } from 'react-hook-form';
import { z } from 'zod';

// TODO: 스키마 수정 필요
export const festivalSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  subTitle: z.string().min(1, '부제목을 입력해주세요'),
  startAt: z.string().min(1, '시작일을 선택해주세요'),
  endAt: z.string().min(1, '종료일을 선택해주세요'),
  area: z.string().min(1, '장소를 입력해주세요'),
  reserveAt: z.string().min(1, '예매일을 선택해주세요'),
  ageRating: z.string().min(1, '연령제한을 입력해주세요'),
  time: z.string().min(1, '공연 시간을 입력해주세요'),
  price: z.string().min(1, '가격을 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
  posterImg: z.instanceof(File).refine((file) => file.size > 0, {
    message: '포스터 이미지를 업로드해주세요',
  }),
  logoImg: z.instanceof(File).refine((file) => file.size > 0, {
    message: '로고 이미지를 업로드해주세요',
  }),
  reservationUrls: z.array(
    z.object({
      reservationUrl: z.string().min(1, '예매 URL을 입력해주세요'),
      name: z.string().min(1, '예매 사이트명을 입력해주세요'),
      logoImg: z.instanceof(File).refine((file) => file.size > 0, {
        message: '로고 이미지를 업로드해주세요',
      }),
    }),
  ),

  dates: z.array(
    z.object({
      festivalAt: z.string().min(1, '페스티벌 날짜를 입력해주세요'),
      openAt: z.string().min(1, '티켓 오픈 시간을 입력해주세요'),
      stages: z.array(
        z.object({
          name: z.string().min(1, '스테이지 이름을 입력해주세요'),
          order: z.string().min(1, '스테이지 순서를 입력해주세요'),
          times: z.array(
            z.object({
              startAt: z.string().min(1, '공연 시작 시간을 입력해주세요'),
              endAt: z.string().min(1, '공연 종료 시간을 입력해주세요'),
              artists: z.array(
                z.object({
                  artistId: z.string().min(1, '아티스트 ID를 입력해주세요'),
                }),
              ),
            }),
          ),
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
  startAt: '',
  endAt: '',
  area: '',
  reserveAt: '',
  ageRating: '',
  time: '',
  price: '',
  address: '',
  posterImg: new File([], ''),
  logoImg: new File([], ''),
  reservationUrls: [
    {
      reservationUrl: '',
      name: '',
      logoImg: new File([], ''),
    },
  ],
  dates: [
    {
      festivalAt: '',
      openAt: '',
      stages: [
        {
          name: '',
          order: '',
          times: [{ startAt: '', endAt: '', artists: [{ artistId: '' }] }],
        },
      ],
    },
  ],
};
