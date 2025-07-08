
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileImage, Crop, Palette, Move3D, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState(false);
  
  // Get source from location state (document vs form)
  const source = location.state?.source || 'document';

  const handleAutoProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessedImage(true);
    }, 2000);
  };

  const handleDoneEditing = () => {
    // Navigate based on source
    if (source === 'form') {
      navigate('/access-form');
    } else {
      navigate('/document-images');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <div className="bg-black/50 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleAutoProcess}
              disabled={isProcessing}
              className="text-white hover:bg-white/20"
            >
              {isProcessing ? "Processing..." : "Auto Processing"}
            </Button>
            <Button
              variant="ghost"
              onClick={handleDoneEditing}
              className="text-white hover:bg-white/20"
            >
              Done Editing
            </Button>
          </div>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full aspect-[3/4] bg-white rounded-lg overflow-hidden relative shadow-2xl">
          {isProcessing ? (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-blue-800 font-medium">Processing Document...</p>
              </div>
            </div>
          ) : (
            <div className={`w-full h-full flex items-center justify-center transition-colors duration-1000 ${
              processedImage 
                ? 'bg-gradient-to-br from-gray-50 to-gray-100' 
                : 'bg-gradient-to-br from-gray-200 to-gray-300'
            }`}>
              <div className="text-center">
                <FileImage className={`h-16 w-16 mx-auto mb-4 transition-colors duration-1000 ${
                  processedImage ? 'text-gray-700' : 'text-gray-500'
                }`} />
                <p className={`font-medium transition-colors duration-1000 ${
                  processedImage ? 'text-gray-800' : 'text-gray-600'
                }`}>
                  {processedImage ? 'Document Enhanced' : 'Original Document'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-black/50 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex items-center gap-2"
            >
              <Crop className="h-4 w-4" />
              Crop
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex items-center gap-2"
            >
              <Palette className="h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 col-span-2 flex items-center gap-2"
            >
              <Move3D className="h-4 w-4" />
              Perspective
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 col-span-2 flex items-center gap-2"
            >
              <Contrast className="h-4 w-4" />
              Enhance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageProcessing;
