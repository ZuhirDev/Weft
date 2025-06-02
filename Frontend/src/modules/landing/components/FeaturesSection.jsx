import { useState } from "react";
import { CreditCard, BarChart3, Zap, Lock, Wallet, BanknoteIcon, RefreshCcw, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function FeatureCard({ icon, title, description, isActive, onClick }) {
  return (
    <Card
      onClick={onClick}
      role="button"
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-md rounded-xl",
        isActive
          ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
          : "hover:border-primary/30 hover:bg-primary/[0.025]"
      )}
    >
      <CardHeader className="pb-2">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-primary"
          )}
        >
          {icon}
        </div>
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Virtual Cards",
      description:
        "Generate unlimited virtual cards for secure online payments, with full control and instant alerts.",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile First",
      description:
        "Manage everything from our intuitive mobile app. Fast, secure, and always within reach.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Transfers",
      description:
        "Send and receive money instantly—anywhere, anytime. No delays, no hidden fees.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Smart Analytics",
      description:
        "Track your spending with real-time insights and personalized financial tips powered by AI.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Advanced Security",
      description:
        "Biometric login, live fraud monitoring, and full card controls give you total peace of mind.",
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Savings Goals",
      description:
        "Set goals and automate savings with smart tracking to stay on top of your financial future.",
    },
    {
      icon: <BanknoteIcon className="h-6 w-6" />,
      title: "Cashback Rewards",
      description:
        "Get up to 3% back on purchases, with boosted rewards for streaming, travel, and dining.",
    },
    {
      icon: <RefreshCcw className="h-6 w-6" />,
      title: "Automated Savings",
      description:
        "Automatically round up purchases and move the difference into savings or investment accounts.",
    },
  ];

  return (
    <section
      id="features"
      className="py-50 md:py-22 relative overflow-hidden"
    >
      <div className="absolute -z-10 inset-0 bg-[linear-gradient(to_bottom,transparent_30%,hsl(var(--background)))]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/10%)_0,transparent_70%)]" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm mb-4">
            Why Choose Weft
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Next-Generation Banking Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the power of smart, secure, and seamless banking. Everything you need—reimagined for the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isActive={activeFeature === index}
              onClick={() => setActiveFeature(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
