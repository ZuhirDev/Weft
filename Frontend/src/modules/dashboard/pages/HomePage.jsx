import AccountRecentTrans from '@/modules/account/components/AccountRecentTrans';
import { AccountChart } from '../components/AccountChart';
import FinancialTips from '../components/FinancialTips';
import AccountOverview from '../components/AccountOverview';
import { useAuth } from '@/modules/auth/context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="w-[70%] mx-auto p-6 space-y-10">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-200 mb-4">
            Welcome back, {user.name}
        </h1>

        <section className="space-y-6">
            <AccountOverview />
            <AccountChart />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinancialTips />
            <AccountRecentTrans />
        </section>
    </div>
  );
};

export default HomePage;
