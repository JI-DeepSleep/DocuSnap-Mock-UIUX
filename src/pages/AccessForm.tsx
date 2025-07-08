
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isSensitiveContent } from "@/utils/security";
import BottomNavBar from "@/components/BottomNavBar";

const AccessForm = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock uploaded forms with content for sensitivity detection
  const uploadedForms = [
    {
      id: 1,
      name: "Tax Form 1040",
      type: "Tax Document",
      uploadDate: "2024-06-15",
      status: "Completed",
      content: "Form Type: 1040 Individual Income Tax Return, SSN: 123-45-6789, Adjusted Gross Income: $75,000"
    },
    {
      id: 2,
      name: "Insurance Claim Form",
      type: "Insurance",
      uploadDate: "2024-06-10",
      status: "In Progress",
      content: "Claim Number: INS-2024-001, Claim Amount: $2,500, Date of Incident: 2024-06-08"
    },
    {
      id: 3,
      name: "Job Application",
      type: "Employment",
      uploadDate: "2024-06-05",
      status: "Pending",
      content: "Position: Software Engineer, Expected Salary: $85,000, Experience: 5 years"
    },
    {
      id: 4,
      name: "Medical History Form",
      type: "Medical",
      uploadDate: "2024-06-01",
      status: "Completed",
      content: "Patient Name: John Doe, Date of Birth: 1990-05-15, Medical Record Number: MR123456"
    },
    {
      id: 5,
      name: "Loan Application",
      type: "Financial",
      uploadDate: "2024-05-25",
      status: "Under Review",
      content: "Loan Amount: $25,000, Annual Income: $95,000, Credit Score: 750"
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleFormClick = (formId: number) => {
    navigate(`/form-display/${formId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-900">Forms</h2>
          </div>
          
          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} size="icon" className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {uploadedForms.map((form) => (
            <button
              key={form.id}
              onClick={() => handleFormClick(form.id)}
              className="aspect-[3/4] bg-white rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all shadow-sm border"
            >
              <div className="w-full h-full flex flex-col">
                {/* Form Preview */}
                <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                
                {/* Form Info */}
                <div className="p-3 bg-white">
                  <h3 className="font-medium text-sm text-gray-900 truncate mb-1">
                    {form.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">{form.type}</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(form.status)}`}>
                        {form.status}
                      </span>
                      {isSensitiveContent(form.content) && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Sensitive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{form.uploadDate}</p>
                  </div>
                </div>
              </div>
            </button>
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
      
      <div className="pb-16">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default AccessForm;
