
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocalMedia = () => {
  const navigate = useNavigate();

  // Mock local images
  const mockImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Image ${i + 1}`,
  }));

  const handleImageSelect = (imageId: number) => {
    console.log('Selected image:', imageId);
    navigate('/image-processing');
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
            <h2 className="text-lg font-semibold text-gray-900">Select Image</h2>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-2">
          {mockImages.map((image) => (
            <button
              key={image.id}
              onClick={() => handleImageSelect(image.id)}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <FileImage className="h-8 w-8 text-gray-600" />
              </div>
            </button>
          ))}
        </div>

        {mockImages.length === 0 && (
          <div className="text-center py-12">
            <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">Your gallery appears to be empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalMedia;
