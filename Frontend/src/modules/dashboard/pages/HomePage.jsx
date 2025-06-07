import AccountRecentTrans from '@/modules/account/components/AccountRecentTrans';
import { AccountChart } from '../components/AccountChart';
import FinancialTips from '../components/FinancialTips';
import AccountOverview from '../components/AccountOverview';
import { useAuth } from '@/modules/auth/context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-6 space-y-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-200 mb-4">
        Welcome back, {user.name}
      </h1>

      <section className="space-y-6">
        <AccountOverview />
        <AccountChart />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FinancialTips />
        <AccountRecentTrans />
      </section>
    </div>
  );
};

export default HomePage;
