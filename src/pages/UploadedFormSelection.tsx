
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const UploadedFormSelection = () => {
  const navigate = useNavigate();
  const [selectedForm, setSelectedForm] = useState<number | null>(null);

  // Mock uploaded forms
  const uploadedForms = [
    {
      id: 1,
      name: "Tax Form 1040",
      type: "Tax Document",
      uploadDate: "2024-06-15"
    },
    {
      id: 2,
      name: "Insurance Claim Form",
      type: "Insurance",
      uploadDate: "2024-06-10"
    },
    {
      id: 3,
      name: "Job Application",
      type: "Employment",
      uploadDate: "2024-06-05"
    }
  ];

  const handleFillForm = () => {
    if (selectedForm) {
      navigate('/fill-form', { state: { formId: selectedForm } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
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
            <h2 className="text-lg font-semibold text-gray-900">Select Form</h2>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {uploadedForms.map((form) => (
            <Card 
              key={form.id} 
              className={`cursor-pointer transition-all ${
                selectedForm === form.id 
                  ? 'ring-2 ring-blue-500 shadow-md' 
                  : 'shadow-sm hover:shadow-md'
              }`}
              onClick={() => setSelectedForm(form.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-20 bg-gray-200 rounded border overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{form.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{form.type}</p>
                    <p className="text-xs text-gray-500 mt-2">Uploaded: {form.uploadDate}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {selectedForm === form.id && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {uploadedForms.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No forms uploaded</h3>
            <p className="text-gray-600">Upload forms to get started</p>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <Button
            onClick={handleFillForm}
            disabled={!selectedForm}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            Fill This Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadedFormSelection;
