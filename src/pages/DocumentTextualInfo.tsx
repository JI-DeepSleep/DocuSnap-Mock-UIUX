
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const DocumentTextualInfo = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // Mock document info
  const [documentInfo, setDocumentInfo] = useState([
    {
      id: 1,
      document: "Invoice - OfficeSupply Co.",
      content: "Invoice Number: INV-2024-0876, Total: $1,245.50, Due Date: 2024-07-15, Supplier: OfficeSupply Co., Payment Status: Unpaid",
      category: "Financial Document"
    },
    {
      id: 2,
      document: "Receipt - Coffee Shop",
      content: "Amount: $12.50, Date: 2024-06-20, Merchant: Downtown Coffee, Payment Method: Credit Card",
      category: "Receipt"
    },
    {
      id: 3,
      document: "Contract - Client Agreement",
      content: "Contract Type: Service Agreement, Client: ABC Corp, Start Date: 2024-07-01, Duration: 12 months, Value: $50,000",
      category: "Legal Document"
    },
    {
      id: 4,
      document: "Medical Report",
      content: "Patient: John Doe, Date: 2024-06-05, Doctor: Dr. Smith, Diagnosis: Annual checkup - normal results",
      category: "Medical Document"
    }
  ]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditValue(content);
  };

  const handleSave = (id: number) => {
    setDocumentInfo(prev => 
      prev.map(item => 
        item.id === id ? { ...item, content: editValue } : item
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
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
            <h2 className="text-lg font-semibold text-gray-900">Document Information</h2>
          </div>
          
          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Search information..."
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
        <div className="space-y-4">
          {documentInfo.map((item) => (
            <Card key={item.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{item.document}</h3>
                  {editingId === item.id ? (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(item.id)}
                        className="h-8 w-8 text-green-600 hover:text-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCancel}
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item.id, item.content)}
                      className="h-8 w-8 text-gray-600 hover:text-gray-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {editingId === item.id ? (
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full min-h-20 text-sm"
                  />
                ) : (
                  <p className="text-sm text-gray-600 mb-2">{item.content}</p>
                )}
                
                <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-full">
                  {item.category}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentTextualInfo;
