import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { SmartBriefing } from '../components/SmartBriefing';
import { Portfolio } from '../components/Portfolio';
import { NeonCarousel } from '../components/ui/NeonCarousel';
import { Globe, Users, Palette, Rocket, Search, Zap } from 'lucide-react';

export const Home: React.FC = () => {
    return (
        <main>
            <Hero />
            <NeonCarousel
                items={[
                    { text: "WEB DESIGN", icon: Globe },
                    { text: "SOCIAL MEDIA", icon: Users },
                    { text: "BRANDING", icon: Palette },
                    { text: "COPRODUÇÃO", icon: Rocket },
                    { text: "TRÁFEGO ORGÂNICO", icon: Search },
                    { text: "CONVERSÃO", icon: Zap }
                ]}
            />
            <Services />
            <SmartBriefing />
            <Portfolio />
        </main>
    );
};
