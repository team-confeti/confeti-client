import RequireLoginSection from '@shared/pages/auth/require-login-section';
import { routePath } from '@shared/constants/path';

const RequireLogin = () => {
  return (
    <div>
      <RequireLoginSection redirectPath={routePath.TIME_TABLE_OUTLET} />
    </div>
  );
};

export default RequireLogin;
