import { LogShowEvent } from '@shared/analytics/logging';
import { DetailHeader } from '@shared/components';
import RequireLoginSection from '@shared/pages/auth/require-login-section';

const RequireLogin = () => {
  return (
    <div>
      <LogShowEvent name="show_my_require_login" />
      <DetailHeader title="마이페이지" />
      <RequireLoginSection />
    </div>
  );
};

export default RequireLogin;
