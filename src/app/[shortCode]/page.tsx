"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

// In a real app, this would come from your database
const MOCK_DB: Record<string, string> = {
  'fbreact': 'https://github.com/facebook/react',
  'tw-install': 'https://tailwindcss.com/docs/installation',
  'v-docs': 'https://vercel.com/docs',
};

export default function ShortCodePage() {
  const router = useRouter();
  const params = useParams();
  const shortCode = params.shortCode as string;

  useEffect(() => {
    if (shortCode && MOCK_DB[shortCode]) {
      const redirectTimer = setTimeout(() => {
        window.location.href = MOCK_DB[shortCode];
      }, 1000); // 1 second delay to show the message

      return () => clearTimeout(redirectTimer);
    } else if (shortCode) {
        const redirectTimer = setTimeout(() => {
            router.push('/dashboard'); // or a 404 page
        }, 2000);

        return () => clearTimeout(redirectTimer);
    }
  }, [shortCode, router]);

  const destinationUrl = shortCode ? MOCK_DB[shortCode] : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="font-headline">
                {destinationUrl ? 'Redirecting...' : 'Link not found'}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {destinationUrl ? (
                <>
                    <svg className="animate-spin h-10 w-10 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-muted-foreground">Please wait, we're sending you to:</p>
                    <p className="mt-2 text-sm font-medium truncate">
                        {destinationUrl}
                    </p>
                </>
            ) : (
                <>
                    <p className="text-muted-foreground">The link you followed may be broken, or the page may have been removed.</p>
                     <Button onClick={() => router.push('/dashboard')} className="mt-4">Go to Dashboard</Button>
                </>
            )}
        </CardContent>
       </Card>
    </main>
  );
}
