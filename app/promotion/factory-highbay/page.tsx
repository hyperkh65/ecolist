import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FactoryHighbayPromotion from '@/components/FactoryHighbayPromotion';
import ManualSidebar from '@/components/ManualSidebar';

export const metadata = {
  title: 'UFO-AM6-150W 지능형 공장등 프로모션 | YNK',
  description: '18m 감지 고도, 한국형 마이크로웨이브 센서 탑재. 물류창고 및 공장 고천장 조명의 혁신 UFO-AM6-150W를 만나보세요.',
};

export default function FactoryHighbayPage() {
  return (
    <div style={{ background: '#020617', minHeight: '100vh' }}>
      <Navbar />
      <ManualSidebar />
      <main>
        <FactoryHighbayPromotion />
      </main>
      <Footer />
    </div>
  );
}
