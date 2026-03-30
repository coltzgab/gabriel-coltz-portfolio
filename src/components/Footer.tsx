import React from 'react';
import { Instagram, Linkedin, MessageCircle, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-organic-black border-t border-organic-white/10 pt-20 pb-10 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-6">
              <img
                src="/logo.png"
                alt="Organic Logo"
                className="h-12 w-auto"
              />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-organic-white uppercase tracking-tighter">
              Sua marca não pode <br />
              <span className="text-organic-cyan">parar no tempo.</span>
            </h2>
            <p className="text-organic-white/60 text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed font-sans italic">
              Acompanhamos empresas que desejam liderar seus nichos através de uma estética impecável e estratégia sólida.
            </p>

            <div className="flex gap-4 mb-10">
              <a href="https://instagram.com/orgnicmkt" target="_blank" rel="noreferrer" className="p-3 border border-organic-white/20 rounded-full hover:border-organic-purple hover:text-organic-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 border border-organic-white/20 rounded-full hover:border-organic-cyan hover:text-organic-cyan transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contato@organic-mkt.com.br" className="p-3 border border-organic-white/20 rounded-full hover:border-organic-white hover:text-organic-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="p-3 border border-organic-white/20 rounded-full hover:border-green-400 hover:text-green-400 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              {[
                { label: 'Início', to: '/' },
                { label: 'Web Design', to: '/web-design' },
                { label: 'Social Media', to: '/social-media' },
                { label: 'Branding', to: '/branding' },
                { label: 'Coprodução', to: '/coproduction' },
                { label: 'Blog', to: '/blog' },
                { label: 'Contato', to: '/contact' },
              ].map(({ label, to }) => (
                <Link key={to} to={to} className="text-xs text-organic-white/40 hover:text-organic-cyan transition-colors uppercase tracking-widest font-bold font-sans">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="bg-organic-white/5 p-10 border border-organic-white/10 rounded-[60px] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-display text-4xl font-bold mb-8 uppercase tracking-tighter">Iniciar Projeto</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-organic-white/50 mb-2 ml-4 font-bold font-sans">Nome</label>
                <input type="text" placeholder="Seu nome" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-organic-white/50 mb-2 ml-4 font-bold font-sans">Email</label>
                <input type="email" placeholder="seu@email.com" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-organic-white/50 mb-2 ml-4 font-bold font-sans">WhatsApp</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-5 top-1/2 -translate-y-1/2 text-organic-white/30" />
                  <input type="tel" placeholder="(11) 99999-9999" className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-6 py-3 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-organic-white/50 mb-2 ml-4 font-bold font-sans">Mensagem</label>
                <textarea rows={3} placeholder="Como podemos ajudar?" className="w-full bg-white/5 border border-white/10 rounded-[30px] px-6 py-4 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors resize-none"></textarea>
              </div>
              <Button type="submit" fullWidth className="py-4 text-xl">
                Enviar Solicitação <MessageCircle size={20} className="inline ml-2" />
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-8 border-t border-organic-white/5 text-xs text-organic-white/30">
          <p>© {new Date().getFullYear()} Organic Assessoria. Todos os direitos reservados.</p>
          <p className="text-organic-white/20">CNPJ: XX.XXX.XXX/0001-XX</p>
          <p>Design & Code by Organic.</p>
          <a href="/formulario-social-media.html" className="text-organic-white/20 hover:text-organic-cyan transition-colors text-[10px] uppercase tracking-widest">Formulário</a>
        </div>
      </div>
    </footer>
  );
};