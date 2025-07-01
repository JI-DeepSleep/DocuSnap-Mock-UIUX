import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, FileText, Edit, Save, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { isSensitiveContent, maskSensitiveData, isPinVerified } from "@/utils/security";

const FormDisplay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [pinVerified, setPinVerified] = useState(false);

  // Mock form data based on ID
  const getFormData = (formId: string) => {
    const forms: Record<string, any> = {
      "1": {
        name: "Tax Form 1040",
        type: "Tax Document",
        uploadDate: "2024-06-15",
        status: "Completed",
        content: "Form Type: 1040 Individual Income Tax Return\nTax Year: 2023\nFiler Name: John Doe\nSSN: 123-45-6789\nFiling Status: Single\nAdjusted Gross Income: $75,000\nTotal Tax: $8,250\nRefund Amount: $1,200",
        isSensitive: true
      },
      "2": {
        name: "Insurance Claim Form",
        type: "Insurance",
        uploadDate: "2024-06-10",
        status: "In Progress",
        content: "Claim Number: INS-2024-001\nPolicy Holder: John Doe\nPolicy Number: POL-789456\nDate of Incident: 2024-06-08\nClaim Amount: $2,500\nDescription: Vehicle damage from parking lot incident",
        isSensitive: true
      }
    };
    return forms[formId] || forms["1"];
  };

  const [form, setForm] = useState(() => getFormData(id || "1"));

  useEffect(() => {
    // Check if PIN was verified from navigation state or session
    const navPinVerified = location.state?.pinVerified;
    const sessionPinVerified = isPinVerified();
    
    if (navPinVerified || sessionPinVerified) {
      setPinVerified(true);
    } else if (form.isSensitive || isSensitiveContent(form.content)) {
      // Redirect to PIN verification if form is sensitive and PIN not verified
      navigate('/pin-verification', {
        state: {
          from: '/form-display',
          formId: id
        }
      });
    }
  }, [form, id, navigate, location.state]);

  const handleEdit = () => {
    if ((form.isSensitive || isSensitiveContent(form.content)) && !pinVerified) {
      navigate('/pin-verification', {
        state: {
          from: '/form-display',
          formId: id
        }
      });
      return;
    }
    setIsEditing(true);
    setEditContent(form.content);
  };

  const handleSave = () => {
    setForm(prev => ({ ...prev, content: editContent }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent("");
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

  const displayContent = () => {
    const isFormSensitive = form.isSensitive || isSensitiveContent(form.content);
    if (isFormSensitive && !pinVerified) {
      return maskSensitiveData(form.content);
    }
    return form.content;
  };

  const shouldShowEncryptedImage = () => {
    const isFormSensitive = form.isSensitive || isSensitiveContent(form.content);
    return isFormSensitive && !pinVerified;
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
              <h2 className="text-lg font-semibold text-gray-900 truncate">{form.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{form.uploadDate}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(form.status)}`}>
                  {form.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Form Image */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Form Image</h3>
            <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
              {shouldShowEncryptedImage() ? (
                <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex flex-col items-center justify-center">
                  <Shield className="h-16 w-16 text-red-600 mb-2" />
                  <p className="text-red-700 text-sm font-medium">Encrypted</p>
                  <p className="text-red-600 text-xs">PIN required</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-blue-600" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Form Information */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Form Entries & Document Info</h3>
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
                placeholder="Edit form information..."
              />
            ) : (
              <div className="bg-gray-50 rounded-lg p-3">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {displayContent()}
                </pre>
              </div>
            )}

            <div className="mt-3 flex gap-2">
              <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {form.type}
              </span>
              {(form.isSensitive || isSensitiveContent(form.content)) && (
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  Sensitive
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormDisplay;
