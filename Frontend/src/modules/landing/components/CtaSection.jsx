import { Button } from "@/components/ui/button";
import AUTH_ROUTES from "@/modules/auth/routes/paths";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/15%)_0,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to Experience the Future of Banking?
          </h2>

          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who have already made the switch to Weft Banking. Open your account in minutes and start enjoying all the benefits.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-xl">
            {[
              "No credit check",
              "No minimum balance",
              "No hidden fees",
              "FDIC insured",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>

          <Link to={AUTH_ROUTES.REGISTER} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="group w-full sm:w-auto text-base font-medium px-8 py-6 h-auto rounded-full"
            >
              Open Your Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to={AUTH_ROUTES.LOGIN}
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
