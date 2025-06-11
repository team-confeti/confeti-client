import { type DefaultValues } from 'react-hook-form';
import { z } from 'zod';

export const concertSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(50, '제목은 50자 이하로 입력해주세요'),
  subTitle: z
    .string()
    .min(1, '부제목을 입력해주세요')
    .max(80, '부제목은 80자 이하로 입력해주세요'),
  startAt: z.string().date().min(1, '시작일을 선택해주세요'),
  endAt: z.string().date().min(1, '종료일을 선택해주세요'),
  area: z
    .string()
    .min(1, '장소를 입력해주세요')
    .max(100, '장소는 100자 이하로 입력해주세요'),
  reserveAt: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
      'yyyy-MM-ddTHH:mm 형식으로 입력해주세요',
    )
    .min(1, '예매일을 선택해주세요'),
  ageRating: z
    .string()
    .min(1, '연령제한을 입력해주세요')
    .max(30, '연령제한은 30자 이하로 입력해주세요'),
  time: z
    .string()
    .min(1, '공연 시간을 입력해주세요')
    .max(30, '공연 시간은 30자 이하로 입력해주세요'),
  price: z
    .string()
    .min(1, '가격을 입력해주세요')
    .max(200, '가격은 200자 이하로 입력해주세요'),
  address: z
    .string()
    .min(1, '주소를 입력해주세요')
    .max(100, '주소는 100자 이하로 입력해주세요'),
  posterImg: z.instanceof(File).refine((file) => file.size > 0, {
    message: '포스터 이미지를 업로드해주세요',
  }),
  reservationUrls: z.array(
    z.object({
      reservationUrl: z
        .string()
        .url('올바른 URL을 입력해주세요')
        .min(1, '예매 URL을 입력해주세요')
        .max(100, '예매 URL은 100자 이하로 입력해주세요'),
      name: z
        .string()
        .min(1, '예매 사이트명을 입력해주세요')
        .max(50, '예매 사이트명은 50자 이하로 입력해주세요'),
      logoImg: z.instanceof(File).refine((file) => file.size > 0, {
        message: '사이트 로고를 업로드해주세요',
      }),
    }),
  ),
  artistIds: z.array(
    z.object({
      artistId: z
        .string()
        .min(1, '아티스트 ID를 입력해주세요')
        .max(50, '아티스트 ID는 50자 이하로 입력해주세요'),
    }),
  ),
});

export const concertDefaultValues: DefaultValues<
  z.infer<typeof concertSchema>
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
  reservationUrls: [
    {
      reservationUrl: '',
      name: '',
      logoImg: new File([], ''),
    },
  ],
  artistIds: [{ artistId: '' }],
};
