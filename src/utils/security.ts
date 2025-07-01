
// Utility functions for handling sensitive data and PIN verification

export const isSensitiveContent = (content: string): boolean => {
  const sensitivePatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN pattern
    /\$[\d,]+\.?\d*/g, // Money values
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card numbers
    /\b[A-Z]{2}\d{6,8}\b/, // ID numbers
    /\bpassport\b/i,
    /\bsocial security\b/i,
    /\btax id\b/i,
    /\baccount number\b/i,
  ];

  return sensitivePatterns.some(pattern => pattern.test(content));
};

export const maskSensitiveData = (content: string): string => {
  let maskedContent = content;
  
  // Mask SSN
  maskedContent = maskedContent.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '***-**-****');
  
  // Mask money values
  maskedContent = maskedContent.replace(/\$[\d,]+\.?\d*/g, '$***.**');
  
  // Mask credit card numbers
  maskedContent = maskedContent.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '****-****-****-****');
  
  // Mask ID numbers
  maskedContent = maskedContent.replace(/\b[A-Z]{2}\d{6,8}\b/g, '**######');
  
  return maskedContent;
};

export const isPinVerified = (): boolean => {
  const verified = sessionStorage.getItem('pinVerified');
  const verifiedAt = sessionStorage.getItem('pinVerifiedAt');
  
  if (!verified || !verifiedAt) return false;
  
  // PIN verification expires after 30 minutes
  const thirtyMinutes = 30 * 60 * 1000;
  const now = Date.now();
  const verificationTime = parseInt(verifiedAt);
  
  return (now - verificationTime) < thirtyMinutes;
};

export const clearPinVerification = (): void => {
  sessionStorage.removeItem('pinVerified');
  sessionStorage.removeItem('pinVerifiedAt');
};
