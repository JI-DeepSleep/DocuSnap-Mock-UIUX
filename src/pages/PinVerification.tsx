
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardContent } from "@/components/ui/card";

const PinVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the original destination from navigation state
  const { from, documentId, formId } = location.state || {};
  
  // Mock PIN (in real app, this would be securely stored/verified)
  const CORRECT_PIN = "1234";

  const handlePinComplete = async (value: string) => {
    setPin(value);
    if (value.length === 4) {
      setIsLoading(true);
      setError("");
      
      // Simulate verification delay
      setTimeout(() => {
        if (value === CORRECT_PIN) {
          // Store PIN verification in sessionStorage
          sessionStorage.setItem('pinVerified', 'true');
          sessionStorage.setItem('pinVerifiedAt', Date.now().toString());
          
          // Navigate to original destination
          if (from && documentId) {
            navigate(`${from}/${documentId}`, { state: { pinVerified: true } });
          } else if (from && formId) {
            navigate(`${from}/${formId}`, { state: { pinVerified: true } });
          } else if (from) {
            navigate(from, { state: { pinVerified: true } });
          } else {
            navigate(-1);
          }
        } else {
          setError("Incorrect PIN. Please try again.");
          setPin("");
        }
        setIsLoading(false);
      }, 500);
    }
  };

  const handleCancel = () => {
    navigate(-1);
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
              onClick={handleCancel}
              className="text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-900">PIN Verification</h2>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sensitive Document</h3>
              <p className="text-gray-600">
                This document contains sensitive information. Please enter your PIN to continue.
              </p>
            </div>

            <div className="mb-6">
              <InputOTP
                maxLength={4}
                value={pin}
                onChange={setPin}
                onComplete={handlePinComplete}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm mb-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {isLoading && (
              <div className="text-blue-600 text-sm">
                Verifying PIN...
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4">
              Demo PIN: 1234
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PinVerification;
