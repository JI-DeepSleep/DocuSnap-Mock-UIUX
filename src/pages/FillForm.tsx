
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, FileText, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const FillForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  // Mock form data
  const formData = [
    { field: "Full Name", value: "John Doe", canRetrieve: true },
    { field: "Social Security Number", value: "123-45-6789", canRetrieve: true },
    { field: "Date of Birth", value: "01/15/1990", canRetrieve: true },
    { field: "Address", value: "123 Main St, Anytown, ST 12345", canRetrieve: true },
    { field: "Phone Number", value: "", canRetrieve: false },
    { field: "Email Address", value: "john.doe@email.com", canRetrieve: true },
    { field: "Occupation", value: "", canRetrieve: false },
    { field: "Annual Income", value: "$75,000", canRetrieve: true }
  ];

  const handleAutoFill = () => {
    setIsAutoFilled(true);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-900">Fill Form</h2>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Form Display */}
        <div className="flex-1 bg-gray-100 p-4">
          <div 
            className="bg-white rounded shadow-lg overflow-hidden mx-auto"
            style={{ 
              width: `${zoomLevel}%`, 
              maxWidth: '100%',
              aspectRatio: '8.5/11'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
              <FileText className="h-16 w-16 text-blue-600 opacity-30" />
              {isAutoFilled && (
                <div className="absolute inset-0 bg-green-50/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-800 font-medium">Form Auto-Filled!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Extracted Information */}
        <Card className="mx-4 mb-4 shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Extracted Information</h3>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {formData.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg border ${
                      !item.canRetrieve 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-medium text-sm text-gray-700">{item.field}:</span>
                      <span className={`text-sm ${
                        !item.canRetrieve 
                          ? 'text-yellow-600 italic' 
                          : 'text-gray-900'
                      }`}>
                        {item.value || 'Not available'}
                      </span>
                    </div>
                    {!item.canRetrieve && (
                      <p className="text-xs text-yellow-600 mt-1">Cannot retrieve from database</p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Button */}
      <div className="bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <Button
            onClick={handleAutoFill}
            disabled={isAutoFilled}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            {isAutoFilled ? 'Form Auto-Filled' : 'Auto Fill This Form'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FillForm;
