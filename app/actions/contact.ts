'use server';

import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  subject: z.string().max(200, 'Subject must be under 200 characters').optional(),
  message: z.string().min(1, 'Message is required').max(5000, 'Message must be under 5000 characters'),
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ActionResult = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export async function submitContactForm(formData: FormData): Promise<ActionResult> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: (formData.get('subject') as string) || '',
    message: formData.get('message') as string,
    honeypot: (formData.get('honeypot') as string) || '',
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { success: false, errors: fieldErrors, message: 'Please fix the errors in the form.' };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabase.from('contact_messages').insert({
    name: result.data.name,
    email: result.data.email,
    subject: result.data.subject,
    message: result.data.message,
  });

  if (error) {
    return { success: false, message: 'Failed to send message. Please try again.' };
  }

  return { success: true, message: 'Message sent successfully!' };
}
