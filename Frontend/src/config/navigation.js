import MAIN_ROUTES from "@/routes/path";
import { CreditCardIcon, LayoutDashboardIcon, SendIcon, TrendingUpIcon, WalletIcon } from "lucide-react";

const getNavItems = (t) => [
    {
      key: 'home',
      title: t('navbar:home'),
      url: MAIN_ROUTES.DASHBOARD,
      icon: LayoutDashboardIcon,
    },
    {
      key: 'accounts',
      title: t('navbar:accounts'),
      url: MAIN_ROUTES.ACCOUNT,
      icon: WalletIcon,
    },
    {
      key: 'cards',
      title: t('navbar:cards'),
      url: MAIN_ROUTES.CARD,
      icon: CreditCardIcon,
    },
    {
      key: 'transactions',
      title: t('navbar:transactions'),
      url: MAIN_ROUTES.TRANSACTION,
      icon: SendIcon,
    },
    {
      key: 'investments',
      title: t('navbar:investments'),
      url: MAIN_ROUTES.INVESTMENT,
      icon: TrendingUpIcon,
    },
];

export default getNavItems;