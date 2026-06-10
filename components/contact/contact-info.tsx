import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <h3 className="font-display text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Email</p>
                <a href="mailto:archive@bmanipuri.org" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  archive@bmanipuri.org
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Community</p>
                <p className="text-sm text-muted-foreground">Communities across Manipur, Assam, Tripura, and Bangladesh</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Response Time</p>
                <p className="text-sm text-muted-foreground">We typically respond within 2-3 days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
