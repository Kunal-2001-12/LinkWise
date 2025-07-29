import Link from 'next/link';
import { Logo } from '../logo';

export function Footer() {
    return (
         <footer className="bg-background border-t">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Logo />
                        <p className="text-sm text-muted-foreground mt-4">
                            The easiest way to shorten your links and track their performance across the web.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-foreground mb-4 font-headline">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link></li>
                            <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Documentation</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-foreground mb-4 font-headline">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-medium text-foreground mb-4 font-headline">Socials</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Twitter / X</a></li>
                            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">GitHub</a></li>
                             <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LinkWise. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
