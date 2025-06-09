import { type DefaultValues } from 'react-hook-form';
import { z } from 'zod';

// TODO: 명세서 바탕으로 추후 수정 필요
export const concertSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  subTitle: z.string().min(1, '부제목을 입력해주세요'),
  startDate: z.string().min(1, '시작일을 선택해주세요'),
  endDate: z.string().min(1, '종료일을 선택해주세요'),
  location: z.string().min(1, '장소를 입력해주세요'),
  reservationDate: z.string().min(1, '예매일을 선택해주세요'),
  ageLimit: z.string().min(1, '연령제한을 입력해주세요'),
  concertTime: z.string().min(1, '공연 시간을 입력해주세요'),
  concertPrice: z.string().min(1, '가격을 입력해주세요'),
  concertAddress: z.string().min(1, '주소를 입력해주세요'),
  posterImage: z.instanceof(File).refine((file) => file.size > 0, {
    message: '포스터 이미지를 업로드해주세요',
  }),
  reservationLinks: z.array(
    z.object({
      reservationUrl: z.string().min(1, '예매 URL을 입력해주세요'),
      reservationSiteName: z.string().min(1, '예매 사이트명을 입력해주세요'),
      reservationSiteLogo: z.instanceof(File).refine((file) => file.size > 0, {
        message: '사이트 로고를 업로드해주세요',
      }),
    }),
  ),
  artistIds: z.array(
    z.object({
      value: z.string().min(1, '아티스트 ID를 입력해주세요'),
    }),
  ),
});

export const concertDefaultValues: DefaultValues<
  z.infer<typeof concertSchema>
> = {
  title: '',
  subTitle: '',
  startDate: '',
  endDate: '',
  location: '',
  reservationDate: '',
  ageLimit: '',
  concertTime: '',
  concertPrice: '',
  concertAddress: '',
  posterImage: new File([], ''),
  reservationLinks: [
    {
      reservationUrl: '',
      reservationSiteName: '',
      reservationSiteLogo: new File([], ''),
    },
  ],
  artistIds: [{ value: '' }],
};
