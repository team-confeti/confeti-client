import { LogShowEvent } from '@shared/analytics/logging';
import RequireLoginSection from '@shared/pages/auth/require-login-section';

const RequireLogin = () => {
  return (
    <div>
      <LogShowEvent name="show_timetable_require_login" />
      <RequireLoginSection />
    </div>
  );
};

export default RequireLogin;
