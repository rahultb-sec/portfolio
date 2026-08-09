'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setStatus('submitting');
    // Simulate async submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center gap-2 border-b border-light-border dark:border-dark-border pb-4">
        <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
          Send a Message
        </h3>
      </div>

      {status === 'success' ? (
        <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
            Message Sent Successfully!
          </h4>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
            Thank you for reaching out. Your message has been received, and I will get back to you shortly.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-2 text-xs font-semibold text-purple-700 dark:text-purple-400 underline"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-xs text-red-700 dark:text-red-300">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="block text-xs font-semibold text-light-text dark:text-dark-text">
                Your Name <span className="text-purple-600">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                required
                className="w-full px-3.5 py-2 text-sm bg-light-secondary/60 dark:bg-dark-secondary/60 text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="block text-xs font-semibold text-light-text dark:text-dark-text">
                Email Address <span className="text-purple-600">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
                className="w-full px-3.5 py-2 text-sm bg-light-secondary/60 dark:bg-dark-secondary/60 text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-subject" className="block text-xs font-semibold text-light-text dark:text-dark-text">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Penetration Testing Inquiry"
              className="w-full px-3.5 py-2 text-sm bg-light-secondary/60 dark:bg-dark-secondary/60 text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="block text-xs font-semibold text-light-text dark:text-dark-text">
              Message <span className="text-purple-600">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your assessment scope, timeline, or inquiry..."
              required
              className="w-full px-3.5 py-2 text-sm bg-light-secondary/60 dark:bg-dark-secondary/60 text-light-text dark:text-dark-text placeholder-light-muted dark:placeholder-dark-muted rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm bg-purple-700 dark:bg-purple-600 text-white hover:bg-purple-800 dark:hover:bg-purple-500 disabled:opacity-50 shadow-xs transition-all"
            id="contact-submit-btn"
          >
            <Send className="w-4 h-4" />
            <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
