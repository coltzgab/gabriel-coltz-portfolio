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
              Sua marca não pode <br/>
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

          <div className="bg-organic-white/5 p-8 border border-organic-white/10">
            <h3 className="font-display text-2xl font-bold mb-6">Iniciar Projeto</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase tracking-wider text-organic-white/50 mb-2">Nome</label>
                <input type="text" className="w-full bg-transparent border-b border-organic-white/20 py-2 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-organic-white/50 mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-organic-white/20 py-2 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-organic-white/50 mb-2">Mensagem</label>
                <textarea rows={3} className="w-full bg-transparent border-b border-organic-white/20 py-2 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors resize-none"></textarea>
              </div>
              <Button type="submit" fullWidth className="mt-4">
                Enviar Solicitação <MessageCircle size={18} className="inline ml-2"/>
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