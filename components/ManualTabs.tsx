'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  Zap, 
  Battery, 
  Settings, 
  Cpu, 
  Network, 
  Microscope, 
  Package 
} from 'lucide-react';

const MANUAL_TABS = [
  { id: 'solar1', label: '실무 매뉴얼', path: '/solar1', icon: BookOpen },
  { id: 'smartsmps1', label: 'SMPS & 디밍', path: '/smartsmps1', icon: Zap },
  { id: 'solar3', label: '배터리 산출', path: '/solar3', icon: Battery },
  { id: 'controller1', label: '지능형 컨트롤', path: '/controller1', icon: Settings },
  { id: 'mold1', label: '금형 & 사출', path: '/mold1', icon: Package },
  { id: 'led-circuit1', label: '회로 & 매칭', path: '/led-circuit1', icon: Network },
  { id: 'led-chip1', label: '칩 사양 분석', path: '/led-chip1', icon: Microscope },
  { id: 'material1', label: '소재 가이드', path: '/material1', icon: Cpu },
];

export default function ManualTabs() {
  const pathname = usePathname();

  return (
    <div style={{
      width: '100%',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: '72px', // Below Navbar
      zIndex: 900,
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'center',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      scrollbarWidth: 'none',
    }}>
      <div style={{
        display: 'flex',
        gap: '4px',
        maxWidth: '1200px',
        width: '100%',
        padding: '12px 0'
      }}>
        {MANUAL_TABS.map((tab) => {
          const isActive = pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <Link 
              key={tab.id} 
              href={tab.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                textDecoration: 'none',
                borderRadius: '50px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isActive ? '#0f172a' : 'transparent',
                color: isActive ? '#fff' : '#64748b',
                fontWeight: 700,
                fontSize: '13px',
                border: '1px solid',
                borderColor: isActive ? '#0f172a' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#0f172a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#64748b';
                }
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
      
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
