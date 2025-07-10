import { createInstance } from '@confeti/core/http';

import { ENV_CONFIG } from '@shared/constants/config';

import { handleAPIError, handleCheckAndSetToken } from './interceptor';

const { instance, get, post, put, patch, del } = createInstance(
  ENV_CONFIG.BASE_URL,
);

instance.interceptors.request.use(handleCheckAndSetToken);
instance.interceptors.response.use((res) => res, handleAPIError);

export { del, get, instance, patch, post, put };
