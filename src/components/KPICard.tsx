import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
}

export default function KPICard({ title, value, subtitle, icon: Icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100/50 p-5">
      <div className="w-10 h-10 bg-[#F9F6F0] rounded-lg flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-[#57288F]" />
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-[#57288F] mb-1">{value}</div>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}
