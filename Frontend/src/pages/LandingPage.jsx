import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AUTH_ROUTES from "@auth/routes/paths";
import LandingIMG from '@/assets/img/landing.jpg';

const LandingPage = () => {
    const { t } = useTranslation();
    
    return (
        <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2 font-bold text-xl">
                <span className="text-primary">Weft</span>
            </div>
            <nav className="flex items-center gap-4">
                <Link to={AUTH_ROUTES.LOGIN}>
                <Button variant="outline">{t('auth:sign_in')}</Button>
                </Link>
                <Link to={AUTH_ROUTES.REGISTER}>
                <Button>{t('auth:sign_up')}</Button>
                </Link>
            </nav>
            </div>
        </header>

        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Banking for the digital age
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience seamless banking with our modern digital platform. Manage accounts, make transfers, and
                    track your finances with ease.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link to="/register">
                        <Button size="lg">Get Started</Button>
                    </Link>
                    <Link to="/about">
                        <Button size="lg" variant="outline">
                        Learn More
                        </Button>
                    </Link>
                    </div>
                </div>
                <div className="mx-auto lg:ml-auto">
                    <img
                    alt="Banking App"
                    className="rounded-lg object-cover"
                    height={400}
                    src={LandingIMG}
                    width={600}
                    />
                </div>
                </div>
            </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Everything you need to manage your finances in one place
                    </p>
                </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
                <Card>
                    <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p>Create and manage multiple accounts with ease. Track balances and customize account settings.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Instant Transfers</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p>Send money instantly to other accounts, both within our bank and to external accounts.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p>View your complete transaction history with detailed information about each transaction.</p>
                    </CardContent>
                </Card>
                </div>
            </div>
            </section>
        </main>

        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2025 NeoBank. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
                <Link to="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Terms
                </Link>
                <Link to="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                Privacy
                </Link>
            </div>
            </div>
        </footer>
        </div>
    );
};

export default LandingPage;
