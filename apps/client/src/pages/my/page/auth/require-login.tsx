import { Header } from '@confeti/design-system';
import RequireLoginSection from '@shared/pages/auth/require-login-section';

const RequireLogin = () => {
  return (
    <div>
      <Header variant="detail" title="마이페이지" />
      <RequireLoginSection />
    </div>
  );
};

export default RequireLogin;
