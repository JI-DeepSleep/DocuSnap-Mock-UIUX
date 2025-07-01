
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isSensitiveContent } from "@/utils/security";

const DocumentImage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock document images with content for sensitivity detection
  const documentImages = [
    { 
      id: 1, 
      name: "Invoice - OfficeSupply Co.", 
      date: "2024-06-15", 
      category: "Financial",
      content: "Invoice Number: INV-2024-0876, Total: $1,245.50, Due Date: 2024-07-15"
    },
    { 
      id: 2, 
      name: "Receipt - Coffee Shop", 
      date: "2024-06-20", 
      category: "Receipt",
      content: "Amount: $12.50, Date: 2024-06-20, Merchant: Downtown Coffee"
    },
    { 
      id: 3, 
      name: "Contract - Client Agreement", 
      date: "2024-06-10", 
      category: "Legal",
      content: "Contract Type: Service Agreement, Client: ABC Corp, Value: $50,000"
    },
    { 
      id: 4, 
      name: "Medical Report", 
      date: "2024-06-05", 
      category: "Medical",
      content: "Patient: John Doe, SSN: 123-45-6789, Diagnosis: Annual checkup"
    },
    { 
      id: 5, 
      name: "Insurance Policy", 
      date: "2024-06-01", 
      category: "Insurance",
      content: "Policy Number: POL-789456, Premium: $2,400 annually"
    },
    { 
      id: 6, 
      name: "Bank Statement", 
      date: "2024-05-30", 
      category: "Financial",
      content: "Account Balance: $15,750.00, Statement Period: May 2024"
    },
    { 
      id: 7, 
      name: "Utility Bill", 
      date: "2024-05-25", 
      category: "Bill",
      content: "Electric Bill: $125.50, Due Date: 2024-06-15"
    },
    { 
      id: 8, 
      name: "Travel Receipt", 
      date: "2024-05-20", 
      category: "Receipt",
      content: "Hotel Stay: $340.00, Conference Trip Expense"
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleImageClick = (imageId: number) => {
    navigate(`/document-display/${imageId}`);
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
            <h2 className="text-lg font-semibold text-gray-900">Document Images</h2>
          </div>
          
          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Search images..."
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
          {documentImages.map((image) => (
            <button
              key={image.id}
              onClick={() => handleImageClick(image.id)}
              className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all shadow-sm"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative">
                <FileImage className="h-6 w-6 text-gray-600" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2">
                  <p className="text-white text-xs font-medium truncate">{image.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-white/80 text-xs">{image.date}</p>
                    <div className="flex gap-1">
                      <span className="px-1 py-0.5 bg-white/20 text-white text-xs rounded">
                        {image.category}
                      </span>
                      {isSensitiveContent(image.content) && (
                        <span className="px-1 py-0.5 bg-red-500/80 text-white text-xs rounded">
                          Sensitive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {documentImages.length === 0 && (
          <div className="text-center py-12">
            <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">Upload documents to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentImage;
