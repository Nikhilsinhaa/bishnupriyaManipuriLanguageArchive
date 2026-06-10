'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  subject: z.string().max(200, 'Subject must be under 200 characters').optional(),
  message: z.string().min(1, 'Message is required').max(5000, 'Message must be under 5000 characters'),
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: (formData.get('subject') as string) || '',
      message: formData.get('message') as string,
      honeypot: formData.get('honeypot') as string,
    };

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form.');
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from('contact_messages').insert({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      message: result.data.message,
    });

    if (error) {
      toast.error('Failed to send message. Please try again.');
      setIsSubmitting(false);
      return;
    }

    toast.success('Message sent successfully!');
    setIsSubmitted(true);
    setIsSubmitting(false);
    e.currentTarget.reset();
  };

  if (isSubmitted) {
    return (
      <Card className="h-full flex items-center justify-center border-border/50">
        <CardContent className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-forest mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. We will get back to you as soon as possible.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-md border-border/50">
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
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" placeholder="Your name" required />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="What is this about?" />
            {errors.subject && (
              <p className="text-xs text-destructive">{errors.subject}</p>
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
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting} className="gap-2 w-full sm:w-auto rounded-md">
            <Send className="h-4 w-4" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
