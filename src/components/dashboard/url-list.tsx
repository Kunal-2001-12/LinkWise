
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2, Copy, BarChart2, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from 'date-fns';
import { QRCode } from "./qr-code";
import { useToast } from "@/hooks/use-toast";

export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  clicks: number;
}

interface UrlListProps {
  urls: ShortenedUrl[];
  onDeleteUrl: (id: string) => void;
}

function UrlTableRow({ url, onDeleteUrl }: { url: ShortenedUrl; onDeleteUrl: (id: string) => void; }) {
    const { toast } = useToast();
    const [shortUrl, setShortUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShortUrl(`${window.location.origin}/${url.shortCode}`);
        }
    }, [url.shortCode]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard!",
            description: "The short URL has been copied.",
        });
    }

    return (
        <TableRow>
            <TableCell className="font-medium">
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline truncate block max-w-xs">
                    {url.originalUrl}
                </a>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {shortUrl.replace(/^https?:\/\//, '')}
                    </a>
                </div>
            </TableCell>
            <TableCell>
                <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    <BarChart2 className="h-3 w-3" />
                    {url.clicks.toLocaleString()}
                </Badge>
            </TableCell>
            <TableCell>{formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}</TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    {shortUrl && <QRCode shortUrl={shortUrl} shortCode={url.shortCode} />}
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(shortUrl)}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem disabled>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <BarChart2 className="mr-2 h-4 w-4" />
                                <span>Analytics</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => onDeleteUrl(url.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </TableCell>
        </TableRow>
    );
}


export function UrlList({ urls, onDeleteUrl }: UrlListProps) {
  
  return (
        <div className="overflow-x-auto">
          <Table>
            {!urls.length && <TableCaption>No links yet. Create one above!</TableCaption>}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%] font-headline">Original URL</TableHead>
                <TableHead className="font-headline">Short Link</TableHead>
                <TableHead className="font-headline">Clicks</TableHead>
                <TableHead className="font-headline">Created</TableHead>
                <TableHead className="text-right font-headline">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No links yet. Create one above!
                  </TableCell>
                </TableRow>
              ) : (
                urls.map((url) => (
                    <UrlTableRow key={url.id} url={url} onDeleteUrl={onDeleteUrl} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
  )
}
