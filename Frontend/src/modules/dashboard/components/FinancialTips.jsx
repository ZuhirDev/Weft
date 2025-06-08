import React from 'react';
import { Wallet, BadgeDollarSign, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getTips = (t) => [
  {
    id: 'tip-1',
    title: t('tips:tips.emergencyFund.title'),
    description: t('tips:tips.emergencyFund.description'),
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    id: 'tip-2',
    title: t('tips:tips.reviewExpenses.description'),
    description: t('tips:tips.reviewExpenses.description'),
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    id: 'tip-3',
    title: t('tips:tips.planGoals.description'),
    description: t('tips:tips.planGoals.description'),
    color: 'from-emerald-500/20 to-emerald-600/20',
  },
];

const FinancialTips = () => {

  const { t } = useTranslation();
  const tips = getTips(t);

  return (
    <>
        <div className="relative group space-y-6 px-4 lg:px-0">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30 blur transition duration-500 group-hover:opacity-50 group-hover:blur-md pointer-events-none" />

        <div className="relative flex items-center gap-3 z-10">
            <Lightbulb className="h-6 w-6 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              {t('tips:title')}
            </h3>
        </div>

        <div className="relative z-10 space-y-4">
            {tips.map((tip) => (
            <div key={tip.id} className="relative group/tip">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-0 blur transition duration-500 group-hover/tip:opacity-30 group-hover/tip:blur-md" />
                <div className="relative rounded-2xl bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-5 shadow-sm transition-shadow duration-300 group-hover/tip:shadow-lg border border-border/50">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-primary text-primary-foreground shadow-lg">
                    <BadgeDollarSign className="h-5 w-5" />
                    </div>
                    <div>
                    <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>

        <button className="relative z-10 w-full rounded-2xl border-2 border-dashed border-border/60 p-4 text-center transition-colors duration-300 hover:border-primary cursor-pointer group mt-2">
            <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary">
            <Wallet className="h-6 w-6" />
            <span className="text-sm font-medium">{t('tips:seeMore')}</span>
            </div>
        </button>
        </div>
      </>
  );
}


export default FinancialTips;