
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileImage, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const DocumentDisplay = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  // Mock document data based on ID
  const getDocumentData = (docId: string) => {
    const documents: Record<string, any> = {
      "1": {
        name: "Invoice - OfficeSupply Co.",
        category: "Financial Document",
        date: "2024-06-15",
        content: "Invoice Number: INV-2024-0876\nSupplier: OfficeSupply Co.\nTotal Amount: $1,245.50\nDue Date: 2024-07-15\nPayment Status: Unpaid\nItems: Office supplies, Paper, Pens, Printer ink"
      },
      "2": {
        name: "Receipt - Coffee Shop",
        category: "Receipt",
        date: "2024-06-20",
        content: "Merchant: Downtown Coffee\nAmount: $12.50\nDate: 2024-06-20\nPayment Method: Credit Card\nItems: Latte, Croissant\nTax: $1.12"
      }
    };
    return documents[docId] || documents["1"];
  };

  const [document, setDocument] = useState(() => getDocumentData(id || "1"));

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(document.content);
  };

  const handleSave = () => {
    setDocument(prev => ({ ...prev, content: editContent }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent("");
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
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{document.name}</h2>
              <p className="text-sm text-gray-600">{document.date}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Document Image */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Document Image</h3>
            <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <FileImage className="h-12 w-12 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Information */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Extracted Information</h3>
              {isEditing ? (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSave}
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
                  onClick={handleEdit}
                  className="h-8 w-8 text-gray-600 hover:text-gray-700"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>

            {isEditing ? (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full min-h-32 text-sm font-mono"
                placeholder="Edit document information..."
              />
            ) : (
              <div className="bg-gray-50 rounded-lg p-3">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {document.content}
                </pre>
              </div>
            )}

            <div className="mt-3">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {document.category}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentDisplay;
