import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="bg-primary p-2 rounded-md">
        <LinkIcon className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground font-headline">
        LinkWise
      </span>
    </Link>
  );
}
