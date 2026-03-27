"use client";

import { Bell, Sparkles, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-bg-card border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Date/Time & Title */}
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[12px] text-text-muted">
              {currentDate}
            </span>
            <span className="text-[12px] text-text-muted tabular-nums">{currentTime}</span>
          </div>
          <h2 className="text-[24px] font-bold text-text-primary tracking-tight">
            {title}
          </h2>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-10 h-10 bg-bg-card hover:bg-bg-page border border-border rounded-md text-text-muted transition-all group">
            <Bell size={18} className="group-hover:text-primary" />
          </button>
          
          <button className="flex items-center gap-2 px-4 h-10 bg-primary hover:bg-primary-dark text-white text-[14px] font-semibold rounded-md transition-all active:scale-[0.98]">
            <Sparkles size={16} />
            History
          </button>
        </div>
      </div>
    </header>
  );
}
