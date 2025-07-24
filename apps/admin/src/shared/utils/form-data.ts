import { FestivalCreateDTO, FestivalUpdateDTO } from '@shared/types/api';

import { Concert, toConcertCreateDTO } from '../models/concert';

export const createConcertFormData = (concert: Concert): FormData => {
  const formData = new FormData();
  const dto = toConcertCreateDTO(concert);

  formData.append('posterImg', dto.posterImg);
  dto.reservationUrls.forEach((url, index) => {
    formData.append(`reservationUrls[${index}].logoImg`, url.logoImg);
  });

  const jsonData = {
    ...dto,
    posterImg: undefined,
    reservationUrls: dto.reservationUrls.map((url) => ({
      ...url,
      logoImg: undefined,
    })),
  };
  formData.append('data', JSON.stringify(jsonData));

  return formData;
};

export const createFestivalFormData = (
  festival: FestivalCreateDTO | FestivalUpdateDTO,
): FormData => {
  const formData = new FormData();

  if (festival.posterImg) {
    formData.append('posterImg', festival.posterImg);
  }
  if (festival.logoImg) {
    formData.append('logoImg', festival.logoImg);
  }
  if (festival.reservationUrls) {
    festival.reservationUrls.forEach((url, index) => {
      if (url.logoImg) {
        formData.append(`reservationUrls[${index}].logoImg`, url.logoImg);
      }
    });
  }

  const jsonData = {
    ...festival,
    posterImg: undefined,
    logoImg: undefined,
    reservationUrls: festival.reservationUrls?.map((url) => ({
      ...url,
      logoImg: undefined,
    })),
  };
  formData.append('data', JSON.stringify(jsonData));

  return formData;
};
