export type LoginSlideType = 'LOTTIE' | 'IMAGE';

export interface BaseLoginSlide {
  type: LoginSlideType;
  title: string;
}

export interface LottieLoginSlide extends BaseLoginSlide {
  type: 'LOTTIE';
  src?: string;
  alt?: string;
}

export interface ImageLoginSlide extends BaseLoginSlide {
  type: 'IMAGE';
  src: string;
  alt: string;
}

export type LoginSlide = LottieLoginSlide | ImageLoginSlide;

export const LOGIN_SLIDES: ReadonlyArray<LoginSlide> = [
  {
    type: 'LOTTIE',
    title: '공연의 설렘부터 감동까지,\n콘페티와 함께해요!',
  },
  {
    type: 'IMAGE',
    title: '콘서트, 페스티벌 등\n나에게 맞는 공연 정보를 확인해요',
    src: '/images/img_login_2.webp',
    alt: '공연 정보를 소개하는 로그인 이미지',
  },
  {
    type: 'IMAGE',
    title: '나만의 공연 관람 계획을 세우고,\n타임테이블을 커스텀해요',
    src: '/images/img_login_3.webp',
    alt: '타임테이블을 커스텀하는 공연 이미지',
  },
];
