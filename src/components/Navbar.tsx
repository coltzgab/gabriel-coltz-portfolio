import React from 'react';
import { Home, Laptop, Users, Palette, MessageSquare, Rocket, FileText, Briefcase } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { AnimeNavBar } from './ui/anime-navbar';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Início', url: '/', icon: Home },
    {
      name: 'Serviços',
      url: '#',
      icon: Briefcase,
      children: [
        { name: 'Web Design', url: '/web-design', icon: Laptop },
        { name: 'Social Media', url: '/social-media', icon: Users },
        { name: 'Branding', url: '/branding', icon: Palette },
        { name: 'Coprodução', url: '/coproduction', icon: Rocket },
      ],
    },
    { name: 'Blog', url: '/blog', icon: FileText },
    { name: 'Contato', url: '/contact', icon: MessageSquare },
  ];

  return (
    <AnimeNavBar items={navItems} defaultActive="Início" />
  );
};