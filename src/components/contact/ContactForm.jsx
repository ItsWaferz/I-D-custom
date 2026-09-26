import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { carSizes } from '../calculator/calculatorData';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const prefilledMessage = searchParams.get('msg') || '';
  const prefilledCarSize = searchParams.get('carSize') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carSize: prefilledCarSize,
    message: prefilledMessage
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // If the URL changes and brings a new message/carSize, update it
  useEffect(() => {
    setFormData((prev) => ({ 
      ...prev, 
      message: prefilledMessage || prev.message,
      carSize: prefilledCarSize || prev.carSize 
    }));
  }, [prefilledMessage, prefilledCarSize]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message && formData.carSize) {
      setIsSubmitting(true);
      setSubmitError('');

      // Găsim numele complet al mașinii pentru email
      const sizeName = carSizes.find(s => s.id === formData.carSize)?.name || formData.carSize;

      emailjs.send(
        'service_88uizl5',
        'template_0ehpe9o',
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone || '-',
          car_size: sizeName,
          message: formData.message
        },
        'YH7jfYed1H-1Hti82'
      ).then(
        () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: '', phone: '', email: '', carSize: '', message: '' });
          setTimeout(() => setIsSubmitted(false), 5000);
        },
        (error) => {
          console.error('Eroare EmailJS:', error);
          setIsSubmitting(false);
          setSubmitError('A apărut o problemă. Te rugăm să încerci din nou sau să ne suni.');
        }
      );
    } else if (!formData.carSize) {
      setSubmitError('Te rugăm să alegi tipul de caroserie.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#141414] border border-[#262626] rounded-2xl p-8 lg:p-10"
    >
      <h3 className="text-2xl font-bold text-[#f5f5f5] mb-6">Trimite-ne un mesaj</h3>
      
      {isSubmitted && (
        <div className="bg-[#d4a853]/10 border border-[#d4a853]/30 text-[#d4a853] p-4 rounded-xl mb-6">
          Mesajul a fost trimis cu succes! Te vom contacta în cel mai scurt timp.
        </div>
      )}

      {submitError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#a3a3a3] mb-2">Nume complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-xl px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d4a853] focus:border-[#d4a853] transition-colors"
              placeholder="Ion Popescu"
            />
          </div>
          <div>
            <label htmlFor="carSize" className="block text-sm font-medium text-[#a3a3a3] mb-2">Mărime mașină *</label>
            <select
              id="carSize"
              name="carSize"
              required
              value={formData.carSize}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-xl px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d4a853] focus:border-[#d4a853] transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a3a3a3' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: `right 0.5rem center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `1.5em 1.5em`
              }}
            >
              <option value="" disabled>Alege caroseria</option>
              {carSizes.map(size => (
                <option key={size.id} value={size.id}>
                  {size.name} {size.extra > 0 ? `(+${size.extra} RON)` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#a3a3a3] mb-2">Telefon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-xl px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d4a853] focus:border-[#d4a853] transition-colors"
              placeholder="07XX XXX XXX"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#a3a3a3] mb-2">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-xl px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d4a853] focus:border-[#d4a853] transition-colors"
              placeholder="email@exemplu.ro"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#a3a3a3] mb-2">Mesajul tău *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={7}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-[#262626] rounded-xl px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-1 focus:ring-[#d4a853] focus:border-[#d4a853] transition-colors resize-none"
            placeholder="Cu ce te putem ajuta?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#d4a853] hover:bg-[#e8c97a] text-[#0a0a0a] font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <span>Se trimite...</span>
              <Loader2 className="w-5 h-5 animate-spin" />
            </>
          ) : (
            <>
              <span>Trimite Mesaj</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
