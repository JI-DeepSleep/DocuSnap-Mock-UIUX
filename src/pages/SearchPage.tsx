
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, FileText, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Mock search results
  const searchResults = [
    {
      id: 1,
      type: 'text',
      title: 'Invoice - OfficeSupply Co.',
      content: 'Invoice Number: INV-2024-0876, Total: $1,245.50, Due Date: 2024-07-15',
      category: 'Financial Document'
    },
    {
      id: 2,
      type: 'image',
      title: 'Receipt - Coffee Shop',
      preview: '/api/placeholder/200/150',
      content: 'Amount: $12.50, Date: 2024-06-20',
      category: 'Receipt'
    },
    {
      id: 3,
      type: 'form',
      title: 'Tax Form 1040',
      content: 'Form fields: Name, SSN, Income, Deductions',
      category: 'Tax Document'
    }
  ];

  const handleSearch = () => {
    // Mock search functionality
    console.log('Searching for:', searchQuery);
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
            <div className="flex-1 flex gap-2">
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
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Search Results for "{searchQuery}"
        </h2>

        <div className="space-y-4">
          {searchResults.map((result) => (
            <Card key={result.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {result.type === 'text' && (
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    {result.type === 'image' && (
                      <div className="w-16 h-12 bg-gray-200 rounded border overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <FileImage className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                    )}
                    {result.type === 'form' && (
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{result.content}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full mt-2">
                      {result.category}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
