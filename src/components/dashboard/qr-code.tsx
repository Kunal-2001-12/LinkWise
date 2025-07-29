
"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Copy, Download, QrCode as QrCodeIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface QRCodeProps {
  shortUrl: string;
  shortCode: string;
}

export function QRCode({ shortUrl, shortCode }: QRCodeProps) {
  const [copied, setCopied] = useState(false);

  // No need for external QR code URL, use local QR code generation

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <QrCodeIcon className="h-4 w-4" />
                <span className="sr-only">View QR Code</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>View QR Code</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to visit your shortened link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 bg-white rounded-md">
          <QRCodeSVG value={shortUrl} size={200} includeMargin={true} />
        </div>
        <p className="text-center text-sm text-muted-foreground truncate">
          {shortUrl}
        </p>
        <DialogFooter className="sm:justify-center gap-2">
            <Button onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            {/* Download button removed for now, as qrcode.react does not provide direct download. Can be added with canvas-to-image logic if needed. */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
