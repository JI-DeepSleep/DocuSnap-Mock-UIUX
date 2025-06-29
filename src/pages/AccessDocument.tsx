
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, FileText, FileImage, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const AccessDocument = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock recommended info
  const recommendedInfo = [
    "Invoice INV-2024-0876 due on July 15, 2024 ($1,245.50)",
    "Medical appointment scheduled for June 25, 2024",
    "Contract renewal deadline: August 1, 2024",
    "Tax document filing due March 15, 2025"
  ];

  // Mock recommended images
  const recommendedImages = [
    { id: 1, name: "Receipt - Coffee Shop", date: "2024-06-20" },
    { id: 2, name: "Invoice - OfficeSupply Co.", date: "2024-06-15" },
    { id: 3, name: "Contract - Client Agreement", date: "2024-06-10" },
    { id: 4, name: "Medical Report", date: "2024-06-05" }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
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
            <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
          </div>
          
          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Search documents..."
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

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Recommended Info Section */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Document Information
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/document-info')}
                className="text-blue-600 hover:text-blue-700"
              >
                See All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-2">
              {recommendedInfo.slice(0, 3).map((info, index) => (
                <div key={index} className="p-2 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">{info}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Images Section */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileImage className="h-5 w-5 text-green-600" />
                Document Images
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/document-images')}
                className="text-green-600 hover:text-green-700"
              >
                See All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {recommendedImages.slice(0, 4).map((image) => (
                <button
                  key={image.id}
                  onClick={() => navigate(`/document-display/${image.id}`)}
                  className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden hover:ring-2 hover:ring-green-500 transition-all"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative">
                    <FileImage className="h-6 w-6 text-gray-600" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
                      <p className="text-white text-xs font-medium truncate">{image.name}</p>
                      <p className="text-white/80 text-xs">{image.date}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessDocument;
