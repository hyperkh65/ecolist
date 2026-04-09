'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface SiteSettings {
  company: {
    name: string;
    address: string;
    tel: string;
    fax: string;
    email: string;
    business_id: string;
    about_text: string;
  };
  menus: { label: string; href: string }[];
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_settings').select('*');
      if (data) {
        const company = data.find(d => d.category === 'company')?.config;
        const menus = data.find(d => d.category === 'menu')?.config;
        if (company && menus) {
          setSettings({ company, menus });
        }
      }
    }
    fetchSettings();
  }, []);

  return settings;
}
