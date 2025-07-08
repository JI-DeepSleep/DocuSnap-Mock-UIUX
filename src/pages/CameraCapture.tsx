
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Camera, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const CameraCapture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCaptured, setIsCaptured] = useState(false);
  
  // Get source from location state (document vs form)
  const source = location.state?.source || 'document';

  const handleCapture = () => {
    setIsCaptured(true);
    // Simulate capture delay
    setTimeout(() => {
      navigate('/image-processing', { state: { source } });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-white font-medium">Camera</h2>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="max-w-md w-full aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden relative">
          {/* Mock camera preview */}
          <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 flex items-center justify-center">
            {!isCaptured ? (
              <div className="text-center text-white">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm opacity-75">Position document in frame</p>
              </div>
            ) : (
              <div className="text-center text-white">
                <div className="animate-pulse">
                  <p className="text-lg font-medium">Processing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Document frame overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4/5 h-3/5 border-2 border-white/70 border-dashed rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              disabled={isCaptured}
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
            
            <Button
              size="icon"
              className="w-16 h-16 rounded-full bg-white hover:bg-gray-200"
              onClick={handleCapture}
              disabled={isCaptured}
            >
              <div className="w-12 h-12 rounded-full border-2 border-gray-300"></div>
            </Button>
            
            <div className="w-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
