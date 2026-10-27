import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  duration?: number;
}

interface NotificationProps {
  notifications: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({
  notifications,
  onDismiss,
}) => {
  useEffect(() => {
    notifications.forEach((item) => {
      const timer = setTimeout(() => {
        onDismiss(item.id);
      }, item.duration || 4000);
      return () => clearTimeout(timer);
    });
  }, [notifications, onDismiss]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`pointer-events-auto p-3.5 rounded-2xl shadow-lg border text-xs font-medium flex items-start justify-between gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200 ${
            n.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100"
              : n.type === "error"
              ? "bg-rose-50 dark:bg-rose-950/90 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100"
              : "bg-blue-50 dark:bg-blue-950/90 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100"
          }`}
        >
          <div className="flex items-start gap-2.5">
            {n.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : n.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            )}
            <p className="leading-snug">{n.message}</p>
          </div>

          <button
            onClick={() => onDismiss(n.id)}
            aria-label="Dismiss toast"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
