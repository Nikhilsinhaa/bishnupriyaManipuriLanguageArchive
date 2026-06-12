'use client';

import { useState, useTransition } from 'react';
import { submitContactForm, type ActionResult } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionResult>({ success: false });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await submitContactForm(formData);
      setState(result);
      if (result.success) {
        e.currentTarget.reset();
      }
    });
  };

  if (state.success) {
    return (
      <Card className="h-full flex items-center justify-center border-border/50">
        <CardContent className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-forest mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. We will get back to you as soon as possible.
          </p>
          <Button onClick={() => { setState({ success: false }); }} variant="outline" className="rounded-md border-border/50">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <h2 className="font-display text-2xl font-bold">Send a Message</h2>
        <p className="text-sm text-muted-foreground">
          Fill out the form below and we will respond promptly.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field hidden from real users */}
          <div className="hidden">
            <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
          </div>
          {state.message && !state.success && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" placeholder="Your name" required />
              {state.errors?.name && (
                <p className="text-xs text-destructive">{state.errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required />
              {state.errors?.email && (
                <p className="text-xs text-destructive">{state.errors.email}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="What is this about?" />
            {state.errors?.subject && (
              <p className="text-xs text-destructive">{state.errors.subject}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us more..."
              rows={6}
              required
            />
            {state.errors?.message && (
              <p className="text-xs text-destructive">{state.errors.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isPending} className="gap-2 w-full sm:w-auto rounded-md">
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
