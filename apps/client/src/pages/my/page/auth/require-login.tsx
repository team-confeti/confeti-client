import { DetailHeader } from '@shared/components';
import RequireLoginSection from '@shared/pages/auth/require-login-section';

const RequireLogin = () => {
  return (
    <div>
      <DetailHeader title="마이페이지" />
      <RequireLoginSection />
    </div>
  );
};

export default RequireLogin;
