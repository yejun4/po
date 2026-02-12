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
    <nav className="fixed top-0 left-0 w-full h-8 bg-white/60 backdrop-blur-xl border-b border-gray-200/50 px-4 flex justify-between items-center z-50 text-[13px] font-medium text-gray-700 select-none">
      {/* 왼쪽: 시스템 메뉴 */}
      <div className="flex gap-4 items-center">
        <div className="hover:bg-black/5 p-1 rounded transition-colors cursor-default">
          <img src={logoImg} alt="System Logo" className="w-4 h-4 object-contain" />
        </div>
        <span className="font-bold hover:bg-black/5 px-2 py-0.5 rounded cursor-default transition-colors">Yejun OS</span>
        <span className="hidden sm:block hover:bg-black/5 px-2 py-0.5 rounded cursor-default transition-colors">File</span>
        <span className="hidden sm:block hover:bg-black/5 px-2 py-0.5 rounded cursor-default transition-colors">Edit</span>
        <span className="hidden sm:block hover:bg-black/5 px-2 py-0.5 rounded cursor-default transition-colors">View</span>
      </div>
      
      {/* 오른쪽: 상태 정보 */}
      <div className="flex gap-4 items-center">
        {/* 보안 상태 표시 (예준님의 강점 반영) */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 hover:bg-black/5 rounded cursor-default transition-colors">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-tighter">System Protected</span>
        </div>
        
        {/* 날짜와 시간 */}
        <div className="flex gap-2 text-gray-500">
          <span>
            {currentTime.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' })}
          </span>
          <span className="font-semibold text-gray-700">
            {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;