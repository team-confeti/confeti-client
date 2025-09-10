import type { Concert } from '@shared/types/concert-response';
import type { Festival } from '@shared/types/festival-response';

type EventType = 'concert' | 'festival';

interface BuildJsonLdParams {
  type: EventType;
  data: Concert | Festival;
  artists: { name: string }[];
  canonicalUrl: string;
}

export const buildEventJsonLd = ({
  type,
  data,
  artists,
  canonicalUrl,
}: BuildJsonLdParams) => {
  const price = extractFirstPrice(data.price);
  const performer = artists.map((artist) => ({
    '@type': 'MusicGroup',
    name: artist.name,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': type === 'concert' ? 'MusicEvent' : 'Festival',
    name: data.title,
    description: data.subtitle,
    startDate: data.startAt,
    endDate: data.endAt,
    location: {
      '@type': 'Place',
      name: data.area,
      address: data.address,
    },
    image: data.posterUrl ? [data.posterUrl] : undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: canonicalUrl,
    offers: data.reservations?.map((r) => ({
      '@type': 'Offer',
      price: price,
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
      url: r.url,
      seller: r.name
        ? {
            '@type': 'Organization',
            name: r.name,
          }
        : undefined,
    })),
    performer,
    audience: data.ageRating
      ? { '@type': 'Audience', audienceType: data.ageRating }
      : undefined,
  };
};

// 숫자 정규화 유틸
const extractFirstPrice = (priceString?: string) => {
  if (!priceString) return undefined;
  const match = priceString.match(/\d[\d,]*/g);
  return match ? Number(match[0].replace(/,/g, '')) : undefined;
};
