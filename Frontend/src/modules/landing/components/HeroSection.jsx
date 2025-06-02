import { Button } from "@/components/ui/button";
import { ArrowRight, CornerRightDown } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import AUTH_ROUTES from "@/modules/auth/routes/paths";

export function HeroSection() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to={AUTH_ROUTES.HOME} className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-primary">Weft</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link to={AUTH_ROUTES.LOGIN} className="text-sm">
              <Button variant="outline" className="px-4 py-2">
                Sign in
              </Button>
            </Link>
            <Link to={AUTH_ROUTES.REGISTER} className="text-sm">
              <Button className="px-4 py-2">
                Get Started
              </Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-b-xl">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15%)_0,transparent_100%)]" />
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/50 text-sm font-medium shadow-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <p>Launching our new Virtual Card Experience</p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-up [--animation-delay:200ms]">
                <span className="block">Banking Reimagined for the</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Digital Future
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
                Experience banking without boundaries. Weft delivers next-generation financial tools with unparalleled security and ease of use.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [--animation-delay:600ms]">
              <Link to={AUTH_ROUTES.REGISTER}>
                <Button size="lg" className="rounded-full text-base font-medium px-6 py-6 h-auto">
                  Open Your Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base font-medium px-6 py-6 h-auto group"
                >
                  Explore Features
                  <CornerRightDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
