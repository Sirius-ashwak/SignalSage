
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AIChat } from '@/components/app/ai-chat';
import { Header } from '@/components/app/header';
import { SignalPredictor } from '@/components/app/signal-predictor';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Wifi } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JioIcon, AirtelIcon, ViIcon, BsnlIcon } from '@/components/app/icons';


function PlansSection() {
  const plans = [
    { name: 'Jio', price: '299', data: '2GB/Day', validity: '28 Days', logo: JioIcon, href: '/operator/jio' },
    { name: 'Airtel', price: '359', data: '2.5GB/Day', validity: '1 Month', logo: AirtelIcon, href: '/operator/airtel' },
    { name: 'Vi', price: '319', data: '2GB/Day', validity: '1 Month', logo: ViIcon, href: '/operator/vi' },
    { name: 'BSNL', price: '239', data: '1.5GB/Day', validity: '45 Days', logo: BsnlIcon, href: '/operator/bsnl' },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-100 dark:bg-slate-800/50 rounded-lg mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Popular Subscription Plans</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Find the perfect plan that fits your needs from India's leading network providers.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
              <CardHeader className="items-center text-center">
                <plan.logo className="h-16 w-16 mb-4" />
                <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-primary">Rs.{plan.price}</p>
                <div className="mt-4 space-y-1 text-muted-foreground">
                    <p>{plan.data}</p>
                    <p>{plan.validity} Validity</p>
                </div>
                <Button asChild className="mt-6 w-full font-bold">
                  <Link href={plan.href}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function IntroSection() {
  const { t } = useLanguage();
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-primary">
              {t.SignalSage}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
              Never settle for a bad connection again. Find the strongest, fastest mobile network in your area with AI-powered predictions.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 text-center">
              <div className="p-8 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Wifi className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold font-headline">Signal Prediction</h3>
                <p className="mt-2 text-muted-foreground">
                  Use your location to instantly see which network operator offers the best signal strength and data speeds.
                </p>
              </div>
              <div className="p-8 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Bot className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold font-headline">AI Assistant</h3>
                <p className="mt-2 text-muted-foreground">
                  Have questions about plans, pricing, or telecom concepts? Our AI Nanban is here to help you in your language.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Plans Section for non-logged in users */}
        <div className="container mx-auto px-4">
          <PlansSection />
        </div>
      </main>
    </>
  );
}

export default function Home() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
        <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto p-8">
            <div className="grid gap-8 lg:grid-cols-5 xl:grid-cols-3">
                <div className="lg:col-span-2 xl:col-span-1">
                    <Skeleton className="h-[500px] w-full" />
                </div>
                <div className="lg:col-span-3 xl:col-span-2">
                    <Skeleton className="h-[500px] w-full" />
                </div>
            </div>
        </main>
        </div>
    );
  }

  if (!user) {
    return <IntroSection />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-5 xl:grid-cols-3">
          <div className="lg:col-span-2 xl:col-span-1">
            <SignalPredictor />
          </div>
          <div className="lg:col-span-3 xl:col-span-2">
            <AIChat />
          </div>
        </div>
        <PlansSection />
      </main>
    </div>
  );
}
