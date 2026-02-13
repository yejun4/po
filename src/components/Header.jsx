import React, { useState, useEffect } from 'react';
import logoImg from '../assets/apple.png';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 시간을 1분마다 업데이트합니다.
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-8 bg-white/60 backdrop-blur-xl border-b border-gray-200/50 px-2 sm:px-4 flex justify-between items-center z-50 text-[11px] sm:text-[13px] font-medium text-gray-700 select-none">
      
      {/* 왼쪽: 시스템 메뉴 */}
      <div className="flex gap-1 sm:gap-4 items-center shrink-0">
        <div className="hover:bg-black/5 p-1 rounded transition-colors cursor-default">
          <img src={logoImg} alt="System Logo" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
        </div>
        
        {/* 모바일에서는 이름이 너무 길면 잘리도록 설정 */}
        <span className="font-bold hover:bg-black/5 px-2 py-0.5 rounded cursor-default transition-colors text-gray-900">
          Yejun OS
        </span>
        
        {/* 메뉴 항목들은 태블릿 이상 크기(md)에서만 보이도록 숨김 처리 */}
        <div className="hidden md:flex gap-2">
          <span className="hover:bg-black/5 px-2 py-0.5 rounded cursor-default transition-colors">File</span>
          <span className="hover:bg-black/5 px-2 py-0.5 rounded cursor-default transition-colors">Edit</span>
          <span className="hover:bg-black/5 px-2 py-0.5 rounded cursor-default transition-colors">View</span>
        </div>
      </div>
      
      {/* 오른쪽: 상태 정보 */}
      <div className="flex gap-2 sm:gap-4 items-center shrink-0">
        {/* 보안 상태: 모바일에서는 'System' 텍스트를 숨겨서 공간 확보 */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 hover:bg-black/5 rounded cursor-default transition-colors">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-[9px] sm:text-[11px] text-emerald-600 font-bold uppercase tracking-tighter">
            <span className="hidden xs:inline">System </span>Protected
          </span>
        </div>
        
        {/* 날짜와 시간: 모바일에서는 날짜를 숨기고 시간만 표시 (공간 부족 방지) */}
        <div className="flex gap-1.5 sm:gap-2 text-gray-500 items-center">
          <span className="hidden sm:block">
            {currentTime.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' })}
          </span>
          <span className="font-semibold text-gray-700 text-[10px] sm:text-[13px]">
            {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;