import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SolarManualRemotion from '@/components/SolarManualRemotion';
import { ShieldCheck, Zap, Sun, Award } from 'lucide-react';

export default function SolarEducationalPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 font-sans selection:bg-sky-500/30">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100 via-transparent to-transparent dark:from-sky-900/20 dark:via-[#020617] dark:to-[#020617] opacity-60"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-semibold text-sm mb-6 border border-sky-200 dark:border-sky-800">
            <Sun className="w-4 h-4" />
            <span>최첨단 태양광 솔루션 교육 자료</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
            태양광 LED 가로등 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
              작동 원리와 관리 매뉴얼
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            초기 설치부터 유지보수까지 완벽한 이해를 위해 기획된 인터랙티브 가이드입니다. 각 핵심 부품의 역할과 에너지 플로우를 직관적으로 확인하세요.
          </p>
        </div>
      </section>

      {/* Interactive Remotion Section */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">인터랙티브 컴포넌트 시뮬레이션</h2>
          <p className="text-slate-600 dark:text-slate-400">영상 내의 진행 바를 컨트롤하거나 자동으로 시청하시며 구조를 파악하실 수 있습니다.</p>
        </div>
        
        {/* Remotion Component Wrapper */}
        <div className="w-full">
            <SolarManualRemotion />
        </div>
      </section>

      {/* Detail Modules Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">주요 유지보수 체크포인트</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">설치 후 정기적인 관리를 통해 태양광 가로등의 수명을 극대화할 수 있습니다. 다음 항목들을 정기적으로 점검해주세요.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                <Sun className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">패널 관리 (Solar Panel)</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                태양광 패널에 먼지나 이물질(낙엽, 조류 분변 등)이 쌓이면 효율이 급감합니다. 분기별 1회 부드러운 천이나 물로 표면을 닦아주세요.
              </p>
              <ul className="text-sm font-medium text-slate-500 dark:text-slate-400 space-y-2">
                <li>• 그늘짐 여부 확인 (주변 나뭇가지 등)</li>
                <li>• 표면 스크래치 점검</li>
                <li>• 고정 브라켓 체결 상태 확인</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">MPPT 제어기 (Controller)</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                전체 전력을 분배하는 컨트롤러는 습기와 고열에 주의해야 합니다. LED 인디케이터를 통해 에러 상태가 아닌지 확인하세요.
              </p>
              <ul className="text-sm font-medium text-slate-500 dark:text-slate-400 space-y-2">
                <li>• LED 점등 상태 확인 (충전/방전 정상)</li>
                <li>• 배선 단자대 스파크/느슨함 점검</li>
                <li>• 케이싱 내부 침수 흔적 확인</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">배터리 및 조명 (Battery & LED)</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                리튬 인산철 배터리는 수명이 길지만 극한의 온도에서는 효율성이 떨어질 수 있습니다. LED는 방열판 관리가 중요합니다.
              </p>
              <ul className="text-sm font-medium text-slate-500 dark:text-slate-400 space-y-2">
                <li>• 배터리 외함 팽창 현상 점검</li>
                <li>• LED 칩셋 점등 불량 (Dead spots) 확인</li>
                <li>• 모션 센서 정상 작동 반경 테스트</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
