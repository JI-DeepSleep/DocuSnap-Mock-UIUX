import { useNavigate, useLocation } from "react-router-dom";
import { FileText, Home, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: FileText,
      label: "Forms",
      path: "/access-form",
    },
    {
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      icon: FileImage,
      label: "Documents",
      path: "/access-document",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                  active 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;