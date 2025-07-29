import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BarChart, ShieldCheck, Users } from 'lucide-react';
import { UrlShortener } from '@/components/dashboard/url-shortener';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                        <span className="block font-headline">Shorten, Share and Track</span>
                        <span className="block text-primary font-headline">Your URLs with Ease</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Create short, memorable links and get detailed analytics on your traffic. Perfect for businesses, marketers, and developers.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <div className="rounded-md shadow">
                            <Button asChild size="lg" className="w-full">
                                <Link href="/register">
                                    Get started for free
                                </Link>
                            </Button>
                        </div>
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                             <Button asChild variant="outline" size="lg" className="w-full">
                                <Link href="#features">
                                    Learn more
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

         {/* Features Section */}
        <section id="features" className="py-16 bg-muted/40 dark:bg-muted/20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl font-headline">
                        Powerful Features for Your Links
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Everything you need to create, manage, and track your short links effectively
                    </p>
                </div>
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="pt-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <CardContent className="flow-root rounded-lg px-6 pb-8">
                                <div className="-mt-12">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                                            <BarChart className="text-white text-xl"/>
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium text-foreground tracking-tight font-headline">Detailed Analytics</h3>
                                    <p className="mt-2 text-base text-muted-foreground">
                                        Track clicks, locations, and devices to understand your audience better and optimize your campaigns.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                         <Card className="pt-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <CardContent className="flow-root rounded-lg px-6 pb-8">
                                <div className="-mt-12">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                                            <ShieldCheck className="text-white text-xl"/>
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium text-foreground tracking-tight font-headline">Secure Links</h3>
                                    <p className="mt-2 text-base text-muted-foreground">
                                        Protect your links with passwords, expirations, and custom domains for enhanced security and control.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                         <Card className="pt-6 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <CardContent className="flow-root rounded-lg px-6 pb-8">
                                <div className="-mt-12">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                                            <Users className="text-white text-xl"/>
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium text-foreground tracking-tight font-headline">Team Management</h3>
                                    <p className="mt-2 text-base text-muted-foreground">
                                        Collaborate with your team, assign roles, and manage links together for seamless workflows.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
