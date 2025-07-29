"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link as LinkIcon, Copy, Check } from 'lucide-react';
import type { ShortenedUrl } from './url-list';
import { QRCode } from './qr-code';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface UrlShortenerProps {
    onNewUrl: (longUrl: string) => void;
}

export function UrlShortener({ onNewUrl }: UrlShortenerProps) {
    const [longUrl, setLongUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const { toast } = useToast();
    const [lastShortened, setLastShortened] = useState<ShortenedUrl | null>(null);
    const [copied, setCopied] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!longUrl) return;

        try {
            new URL(longUrl);
        } catch (_) {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid URL.",
                variant: "destructive",
            });
            return;
        }

        onNewUrl(longUrl);
        setLastShortened(null); // Optionally clear lastShortened or update as needed
        setLongUrl('');
        setCustomAlias('');
        toast({
            title: "Success!",
            description: "Your shortened URL has been created.",
        });
    };
    
    const getShortUrl = () => {
        if (!lastShortened) return '';
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/${lastShortened.shortCode}`;
        }
        return '';
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(getShortUrl());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    
    const shortUrl = getShortUrl();

    return (
        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold">Create a new short link</CardTitle>
                <CardDescription>Enter your long URL below to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative w-full">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="url"
                            placeholder="https://your-super-long-url.com/goes/here"
                            className="pl-10 text-base"
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                        />
                    </div>
                     <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative flex-grow w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-slate-500 dark:text-slate-400">linkwi.se/</span>
                            </div>
                            <Input 
                                type="text" 
                                id="custom-alias" 
                                placeholder="custom-alias" 
                                value={customAlias}
                                onChange={(e) => setCustomAlias(e.target.value)}
                                className="pl-20 w-full"
                            />
                        </div>
                        <Button type="submit" className="w-full sm:w-auto font-semibold">
                            Shorten!
                        </Button>
                    </div>

                </form>

                {lastShortened && shortUrl && (
                    <div className="mt-6 p-4 bg-muted/70 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-foreground truncate">
                            Your short link: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">{shortUrl}</a>
                        </p>
                        <div className="flex items-center gap-2">
                             <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" onClick={handleCopy}>
                                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            <span className="sr-only">Copy Link</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{copied ? 'Copied!' : 'Copy to clipboard'}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <QRCode shortUrl={shortUrl} shortCode={lastShortened.shortCode}/>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
