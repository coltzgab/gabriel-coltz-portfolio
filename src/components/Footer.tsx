import React from 'react';
import { Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-organic-black border-t border-organic-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="font-display text-5xl font-bold mb-6 text-organic-white">
              Sua marca não pode <br />
              <span className="text-organic-cyan">parar no tempo.</span>
            </h2>
            <p className="text-organic-white/60 text-lg mb-8 max-w-md">
              Acompanhamos empresas que desejam liderar seus nichos através de uma estética impecável e estratégia sólida.
            </p>

            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 border border-organic-white/20 rounded-full hover:border-organic-purple hover:text-organic-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 border border-organic-white/20 rounded-full hover:border-organic-cyan hover:text-organic-cyan transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contato@organic-mkt.com.br" className="p-3 border border-organic-white/20 rounded-full hover:border-organic-white hover:text-organic-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="bg-organic-white/5 p-10 border border-organic-white/10 rounded-[60px]">
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
                <label className="block text-[10px] uppercase tracking-widest text-organic-white/50 mb-2 ml-4 font-bold font-sans">Mensagem</label>
                <textarea rows={3} placeholder="Como podemos ajudar?" className="w-full bg-white/5 border border-white/10 rounded-[30px] px-6 py-4 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors resize-none"></textarea>
              </div>
              <Button type="submit" fullWidth className="py-4 text-xl">
                Enviar Solicitação <MessageCircle size={20} className="inline ml-2" />
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-organic-white/5 text-xs text-organic-white/30">
          <p>© {new Date().getFullYear()} Organic Assessoria. Todos os direitos reservados.</p>
          <p>Design & Code by Organic.</p>
        </div>
      </div>
    </footer>
  );
};