import React from 'react';

interface FooterProps {
  onOpenFreshnessGuide?: () => void;
  onOpenHardwareSync?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenFreshnessGuide,
  onOpenHardwareSync,
}) => {
  return (
    <footer className="w-full bg-[#f6f3ee] mt-16 py-10 border-t border-[#c1c9c0]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-6 text-[#414942] text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-['Epilogue'] text-lg font-bold text-[#16452a]">
            SmartFridge AI
          </span>
          <span className="text-[#c1c9c0]">|</span>
          <span className="text-[#414942]">智慧廚房無縫管理，自然美味即刻上桌</span>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <button
            type="button"
            onClick={onOpenFreshnessGuide}
            className="hover:text-[#16452a] transition-colors cursor-pointer"
          >
            食材保鮮須知
          </button>
          <button
            type="button"
            onClick={onOpenHardwareSync}
            className="hover:text-[#16452a] transition-colors cursor-pointer"
          >
            智能硬體串接
          </button>
          <span className="text-[#717971] cursor-default">
            隱私政策
          </span>
        </div>

        <p className="text-[#717971]">
          © 2024 SmartFridge AI. 保留所有權利。
        </p>
      </div>
    </footer>
  );
};
