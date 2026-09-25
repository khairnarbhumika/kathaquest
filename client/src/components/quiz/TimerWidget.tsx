import React, { useEffect, useState } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerWidgetProps {
  secondsPerQuestion?: number;
  onTimeUp?: () => void;
  isActive: boolean;
  questionKey: string;
}

export const TimerWidget: React.FC<TimerWidgetProps> = ({ secondsPerQuestion = 15, onTimeUp, isActive, questionKey }) => {
  const [timeLeft, setTimeLeft] = useState<number>(secondsPerQuestion);

  useEffect(() => {
    setTimeLeft(secondsPerQuestion);
  }, [questionKey, secondsPerQuestion]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  const percent = Math.max(0, (timeLeft / secondsPerQuestion) * 100);
  const isDanger = timeLeft <= 5;

  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${isDanger ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
        <TimerIcon className="w-4 h-4" />
        <span>{timeLeft}s</span>
      </div>
      <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className={`h-full transition-all duration-1000 ${isDanger ? 'bg-rose-500' : 'bg-amber-400'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
