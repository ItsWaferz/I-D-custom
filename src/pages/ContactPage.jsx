import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      value: '+40 733 157 028',
      detail: 'Apasă pentru a suna',
      link: 'tel:+40733157028'
    },
    { icon: Mail, title: 'Email', value: 'contact@idcustom.ro', detail: 'Pentru detalii și cereri de ofertă.' },
    {
      icon: MapPin,
      title: 'Adresă',
      value: 'Strada Palvaidahazi',
      detail: 'Mediaș, Sibiu (Deschide în Maps)',
      link: 'https://maps.app.goo.gl/a3PR3mp5S5UgTSCs6?g_st=ic'
    },
    { icon: Clock, title: 'Program', value: 'Luni - Vineri: 09:00 - 18:00', detail: 'Sâmbătă - Duminică: Închis' },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4">Contact</h1>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto">
            Suntem aici pentru a-ți răspunde la orice întrebare și a planifica următoarea transformare a mașinii tale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Form */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Right Column: Info & Map */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;

                const CardWrapper = info.link ? 'a' : 'div';
                const wrapperProps = info.link
                  ? {
                    href: info.link,
                    className: 'hover:border-[#d4a853] transition-colors cursor-pointer',
                    ...(info.link.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})
                  }
                  : {};

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CardWrapper
                      {...wrapperProps}
                      className={`bg-[#141414] border border-[#262626] rounded-2xl p-6 flex flex-col items-start block h-full ${info.link ? 'hover:border-[#d4a853]/50 hover:bg-[#1a1a1a] transition-all' : ''}`}
                    >
                      <div className="w-10 h-10 bg-[#0a0a0a] border border-[#262626] rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-[#d4a853]" />
                      </div>
                      <h4 className="text-[#a3a3a3] text-sm mb-1">{info.title}</h4>
                      <p className="text-[#f5f5f5] font-semibold mb-1">{info.value}</p>
                      <p className="text-[#a3a3a3] text-xs">{info.detail}</p>
                    </CardWrapper>
                  </motion.div>
                );
              })}
            </div>

            {/* Embedded Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full h-47 md:h-59 rounded-2xl overflow-hidden border border-[#262626]"
            >
              <iframe
                title="Harta I&D Custom"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2765.4748676079143!2d24.374348776310015!3d46.121369971092285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDbCsDA3JzE2LjkiTiAyNMKwMjInMzYuOSJF!5e0!3m2!1sro!2sro!4v1790155433329!5m2!1sro!2sro"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
