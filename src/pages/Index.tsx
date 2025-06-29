
import { Search, Camera, FileImage, FileText, Upload, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">DocuSnap</h1>
          <p className="text-sm text-gray-600 text-center">Your AI-powered Document Assistant</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search documents or information..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} size="icon" className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload Entry */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              Upload Document
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-2 border-dashed border-gray-300 hover:border-blue-400"
                onClick={() => navigate('/camera')}
              >
                <Camera className="h-6 w-6 text-gray-600" />
                <span className="text-sm">Camera</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-2 border-dashed border-gray-300 hover:border-blue-400"
                onClick={() => navigate('/local-media')}
              >
                <FileImage className="h-6 w-6 text-gray-600" />
                <span className="text-sm">Gallery</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Upload Entry */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Upload Form
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-2 border-dashed border-gray-300 hover:border-green-400"
                onClick={() => navigate('/camera')}
              >
                <Camera className="h-6 w-6 text-gray-600" />
                <span className="text-sm">Camera</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 border-2 border-dashed border-gray-300 hover:border-green-400"
                onClick={() => navigate('/local-media')}
              >
                <FileImage className="h-6 w-6 text-gray-600" />
                <span className="text-sm">Gallery</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fill Form Entry */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Fill Form
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/form-selection')}
              >
                <FolderOpen className="h-6 w-6" />
                <span className="text-sm">Uploaded Forms</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 opacity-50 cursor-not-allowed"
                disabled
              >
                <FileText className="h-6 w-6 text-gray-400" />
                <span className="text-sm">New Form</span>
                <span className="text-xs text-gray-400">(Coming Soon)</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Access Uploaded Files Entry */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-orange-600" />
              Access Files
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-20 flex-col gap-2 bg-orange-600 hover:bg-orange-700"
                onClick={() => navigate('/access-document')}
              >
                <FileImage className="h-6 w-6" />
                <span className="text-sm">Documents</span>
              </Button>
              <Button
                className="h-20 flex-col gap-2 bg-orange-600 hover:bg-orange-700"
                onClick={() => navigate('/access-form')}
              >
                <FileText className="h-6 w-6" />
                <span className="text-sm">Forms</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
