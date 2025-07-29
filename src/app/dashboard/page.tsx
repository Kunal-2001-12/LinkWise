"use client";


import { useEffect, useState } from 'react';
import { UrlShortener } from '@/components/dashboard/url-shortener';
import { UrlList, type ShortenedUrl } from '@/components/dashboard/url-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Link as LinkIcon, Users, MousePointer, Plus } from 'lucide-react';

export default function DashboardPage() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/urls')
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Failed to fetch URLs');
        }
        return res.json();
      })
      .then((data) => {
        // Remove MongoDB _id field if present
        const cleaned = data.map((url: any) => {
          const { _id, ...rest } = url;
          return rest;
        });
        setUrls(cleaned);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError('Failed to load URLs. Please check your server and database connection.');
        setLoading(false);
        console.error('API /api/urls error:', err);
      });
  }, []);

  const addUrl = (longUrl: string) => {
    const newUrl: ShortenedUrl = {
      id: Math.random().toString(36).substring(2, 8),
      originalUrl: longUrl,
      shortCode: Math.random().toString(36).substring(2, 8),
      createdAt: new Date().toISOString(),
      clicks: 0,
    };
    (async () => {
      try {
        const res = await fetch('/api/urls', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUrl),
        });
        if (res.ok) {
          setUrls(prev => [newUrl, ...prev]);
        } else {
          setError('Failed to add URL.');
        }
      } catch (err: unknown) {
        setError('Failed to add URL.');
        console.error('API /api/urls POST error:', err);
      }
    })();
  };

  const deleteUrl = async (id: string) => {
    try {
      const res = await fetch('/api/urls', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setUrls(prev => prev.filter(url => url.id !== id));
      } else {
        setError('Failed to delete URL.');
      }
    } catch (err: unknown) {
      setError('Failed to delete URL.');
      console.error('API /api/urls DELETE error:', err);
    }
  };

  const totalClicks = urls.reduce((acc, url) => acc + url.clicks, 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="space-y-8">
      <UrlShortener onNewUrl={addUrl} />
      {/* Stats Section */}
            <div>
                <h3 className="text-lg font-medium text-foreground mb-4 font-headline">Link Analytics</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                            <MousePointer className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Links</CardTitle>
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{urls.length}</div>
                            <p className="text-xs text-muted-foreground">+14.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">18,452</div>
                            <p className="text-xs text-muted-foreground">-1.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Click Rate</CardTitle>
                            <MousePointer className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">57%</div>
                            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex-1">
                         <CardTitle className="font-headline text-2xl font-bold">Your Links</CardTitle>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="text" placeholder="Search links..." className="pl-10" />
                        </div>
                        <Button className="w-full sm:w-auto">
                           <Plus className="mr-2 h-4 w-4" /> New Link
                        </Button>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                 <UrlList urls={urls} onDeleteUrl={deleteUrl} />
              </CardContent>
            </Card>
        </div>
    );
}
