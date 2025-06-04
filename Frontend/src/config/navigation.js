import MAIN_ROUTES from "@/routes/path";
import { CreditCardIcon, LayoutDashboardIcon, SendIcon, TrendingUpIcon, WalletIcon } from "lucide-react";

const NavItems = [
    {
      title: "Home",
      url: MAIN_ROUTES.DASHBOARD,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Accounts",
      url: MAIN_ROUTES.ACCOUNT,
      icon: WalletIcon,
    },
    {
      title: "Cards",
      url: MAIN_ROUTES.CARD,
      icon: CreditCardIcon,
    },
    {
      title: "Transactions",
      url: MAIN_ROUTES.TRANSACTION,
      icon: SendIcon,
    },
    {
      title: "Investments",
      url: MAIN_ROUTES.INVESTMENT,
      icon: TrendingUpIcon,
    },
];

export default NavItems;