import React, { useState } from 'react';
import Header from './components/Header';
import folderIcon from './assets/folder.webp';

function App() {
  // 각 창의 열림/닫힘 상태를 관리합니다.
  const [activeWindow, setActiveWindow] = useState(null);
  // 잠금 상태 관리 (초기값: false)
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [slideValue, setSlideValue] = useState(0);

  // 창을 닫는 함수
  const closeWindow = (e) => {
    e.stopPropagation();
    setActiveWindow(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCFD] w-full overflow-x-hidden relative">
      
      {/* 1. 잠금 화면 (Unlock Screen) */}
      {!isUnlocked && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-2xl transition-all duration-700">
         <div className="text-center animate-bounce mb-8">
            <span className="text-5xl">🔒</span>
         </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Yejun OS</h1>
          <p className="text-sm text-gray-400 mb-10">오른쪽으로 밀어서 잠금해제</p>

          {/* 슬라이더 바 컨테이너 */}
          <div className="relative w-72 h-20 bg-gray-100 rounded-full border border-gray-200 p-1 flex items-center shadow-inner overflow-hidden">

            {/* 실제 드래그를 감지하는 투명 input */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={slideValue}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setSlideValue(val);
                if (val === 100) {
                  setIsUnlocked(true);
                }
              }}
              // 마우스를 떼었을 때 끝까지 안 갔으면 다시 0으로 복귀
              onMouseUp={() => slideValue < 100 && setSlideValue(0)}
              onTouchEnd={() => slideValue < 100 && setSlideValue(0)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 touch-none"
              style={{ appearance: 'none', WebkitAppearance: 'none' }}
            />

            {/* 2. 움직이는 슬라이더 핸들 */}
            <div 
              className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-pink-300 font-bold transition-transform duration-75 z-10"
              style={{ 
                transform: `translateX(${slideValue * 2.05}px)` // 슬라이더 너비에 맞춰 이동 거리 조절
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              
            </div>

            {/* 안내 문구 (핸들이 지나가면 서서히 투명해짐) */}
            <span 
              className="absolute w-full text-center text-sm font-bold text-gray-400 select-none pointer-events-none transition-opacity"
              style={{ opacity: 1 - slideValue / 70 }}
            >
              밀어서 잠금해제
            </span>
         </div>
        </div>
      )}

      {/* 2. 메인 화면 - 잠금 해제 전에는 흐릿하게 처리 */}
      <div className={`flex flex-col min-h-screen w-full transition-all duration-1000 ${!isUnlocked ? 'blur-xl scale-95 pointer-events-none' : 'blur-0 scale-100'}`}>
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-6 relative pt-24 pb-12">
          
          {/* 바탕화면 (OS 창 컨테이너) */}
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden relative z-10">
            
            {/* 상단 바 (모바일에서 경로가 아래로 내려가는 버전) */}
            <div className="bg-[#F6F6F6] px-5 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center border-b border-gray-200 relative">
  
              {/* 상단: 버튼과 모바일용 제목 */}
              <div className="flex items-center justify-between w-full sm:w-auto">
                {/* 왼쪽 신호등 버튼 */}
                <div className="flex gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
    
                {/* 모바일에서만 보이는 오른쪽 정렬된 작은 제목 (선택 사항) */}
                <span className="text-[10px] font-bold text-gray-300 sm:hidden">Main Folder</span>
              </div>

              {/* 중앙/하단 경로 표시: 모바일에서는 버튼 아래에, PC에서는 중앙에 위치 */}
              <div className="mt-2 sm:mt-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 text-[9px] sm:text-xs text-gray-400 font-mono tracking-tight sm:tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide">
                C:/Users/<span className="text-pink-400 font-bold">yejun</span>/portfolio/main
              </div>
            </div>

            {/* 아이콘 그리드 영역 */}
            <div className="p-12 md:p-20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-12">
                
                {/* 1. About_Me */}
                <div className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveWindow('about')}>
                  <div className="w-20 h-20 mb-3 flex items-center justify-center transition-transform group-hover:scale-110">
                    <img src={folderIcon} alt="Folder" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 px-3 py-1 rounded-md group-hover:bg-blue-100/50">About_Me</span>
                </div>

                {/* 2. My_Projects */}
                <div className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveWindow('projects')}>
                  <div className="w-20 h-20 mb-3 flex items-center justify-center transition-transform group-hover:scale-110">
                    <img src={folderIcon} alt="Folder" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 px-3 py-1 rounded-md group-hover:bg-pink-100/50">My_Projects</span>
                </div>

                {/* 3. Security_Lab */}
                <div className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveWindow('security')}>
                  <div className="w-20 h-20 mb-3 flex items-center justify-center transition-transform group-hover:scale-110">
                    <img src={folderIcon} alt="Folder" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 px-3 py-1 rounded-md group-hover:bg-purple-100/50">Security_Lab</span>
                </div>

                {/* 4. Contact.txt */}
                <div className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveWindow('contact')}>
                  <div className="w-20 h-20 mb-3 flex items-center justify-center transition-transform group-hover:scale-110">
                    <img src={folderIcon} alt="Folder" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 px-3 py-1 rounded-md group-hover:bg-emerald-100/50">Contact.txt</span>
                </div>

              </div>

              <div className="mt-20 pt-10 border-t border-gray-50 text-center text-gray-400 font-mono text-sm italic">
                "Finding the balance between security and usability."
              </div>
            </div>
          </div>

          {/* --- 상세 창 레이아웃 섹션 --- */}
          {activeWindow && (
            <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/10 backdrop-blur-[2px]" onClick={() => setActiveWindow(null)}>
              <div className="w-[90%] max-w-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                
                {/* 창 상단 바 */}
                <div className="bg-[#F6F6F6] px-4 py-2 flex items-center justify-between border-b border-gray-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] cursor-pointer" onClick={closeWindow}></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{activeWindow}_detail</span>
                  <div className="w-10"></div>
                </div>

                {/* 창 내부 컨텐츠 */}
                <div className="p-8 max-h-[500px] overflow-y-auto">
                  
                  {/* 1. About_Me 내용 */}
                  {activeWindow === 'about' && (
                    <div className="space-y-6">
                      <section>
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-l-4 border-blue-400 pl-2">Education</h2>
                        <p className="font-semibold text-gray-800 text-base">상명대학교 (Sangmyung University)</p>
                        <p className="text-sm text-gray-600">빅데이터융합 전공</p>
                        <p className="text-xs text-gray-400">Student ID: 202310806</p>
                      </section>
                      <section>
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-l-4 border-pink-400 pl-2">Status</h2>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                          <li>정보보안 실무 역량 강화 중</li>
                          <li>포트폴리오 고도화 작업 진행 중</li>
                        </ul>
                      </section>
                      <section>
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-l-4 border-purple-400 pl-2">Certifications</h2>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                          <li>TOEIC 예정 .. </li>
                          <li>자격증 등 등 예정 ..</li>
                        </ul>
                      </section>
                    </div>
                  )}

                  {/* 2. My_Projects 내용 */}
                  {activeWindow === 'projects' && (
                    <div className="space-y-4">
                      <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                        <h3 className="font-bold text-gray-800">QR-Guardian</h3>
                        <p className="text-xs text-gray-500 mb-2">Security-themed Software Project</p>
                        <p className="text-sm text-gray-600">악성 QR 코드를 분석하고 안전한 연결을 보장하는 보안 프로젝트입니다.</p>
                      </div>
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-gray-800">Personal Portfolio</h3>
                        <p className="text-xs text-gray-500 mb-2">React & Tailwind CSS</p>
                        <p className="text-sm text-gray-600">현재 보고 계신 OS 컨셉의 포트폴리오 사이트입니다.</p>
                      </div>
                    </div>
                  )}

                  {/* 3. Security_Lab 내용 */}
                  {activeWindow === 'security' && (
                    <div className="space-y-4">
                      <section>
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-l-4 border-purple-400 pl-2">Contest</h2>
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <p className="text-sm font-bold text-gray-700">DB손해보험 금융공모전 참여</p>
                          <p className="text-xs text-gray-500">금융 IT와 보안 기술을 결합한 서비스 기획</p>
                        </div>
                      </section>
                      <section>
                        <h2 className="text-base font-bold text-gray-800 mb-2 border-l-4 border-indigo-400 pl-2">Research</h2>
                        <p className="text-sm text-gray-600">보안 뉴스 분석 및 최신 클라우드 보안 트렌드 연구</p>
                      </section>
                    </div>
                  )}

                  {/* 4. Contact.txt 내용 */}
                  {activeWindow === 'contact' && (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 mb-2">Let's Connect!</h2>
                      <p className="text-sm text-gray-500 mb-6">보안과 개발에 대한 이야기는 언제나 환영입니다.</p>
                      <div className="space-y-3 inline-block text-left bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-4">
                        <p className="text-sm text-gray-600 font-mono">📞 Phone: 010-0000-0000</p>
                        <p className="text-sm text-gray-600 font-mono">📧 Email: yejuni04@naver.com</p>
                        <p className="text-sm text-gray-600 font-mono">🔗 GitHub: github.com/yejun4</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;