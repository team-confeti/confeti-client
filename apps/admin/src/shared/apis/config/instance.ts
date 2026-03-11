import { createInstance } from '@confeti/core/http';

import { ENV_CONFIG } from '@shared/constants/config';

export const { get, post, put, patch, del } = createInstance(
  ENV_CONFIG.BASE_URL,
);
