import { DivideIcon as LucideIcon } from 'lucide-react';

interface MobileAccountCardProps {
  title: string;
  icon: LucideIcon;
  items: Array<{
    label: string;
    value: string;
  }>;
}

export const MobileAccountCard = ({ title, icon: Icon, items }: MobileAccountCardProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
        <Icon className="h-4 w-4 mr-2" />
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-medium text-gray-900 text-right max-w-[60%] truncate">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};