
// Utility functions for handling sensitive data and PIN verification

export const isSensitiveContent = (content: string): boolean => {
  const sensitivePatterns = [
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN pattern
    /\$[\d,]+\.?\d*/g, // Money values (we'll check amount separately)
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card numbers
    /\b[A-Z]{2}\d{6,8}\b/, // ID numbers
    /\bpassport\b/i,
    /\bsocial security\b/i,
    /\btax id\b/i,
    /\baccount number\b/i,
  ];

  // Check for SSN
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(content)) {
    return true;
  }

  // Check for money values greater than $1000
  const moneyMatches = content.match(/\$[\d,]+\.?\d*/g);
  if (moneyMatches) {
    for (const match of moneyMatches) {
      const amount = parseFloat(match.replace(/[$,]/g, ''));
      if (amount > 1000) {
        return true;
      }
    }
  }

  // Check other sensitive patterns (excluding money which we handled above)
  const otherPatterns = sensitivePatterns.slice(2); // Skip money pattern since we handled it separately
  return otherPatterns.some(pattern => pattern.test(content));
};

export const maskSensitiveData = (content: string): string => {
  let maskedContent = content;
  
  // Mask SSN
  maskedContent = maskedContent.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '***-**-****');
  
  // Mask money values greater than $1000
  maskedContent = maskedContent.replace(/\$[\d,]+\.?\d*/g, (match) => {
    const amount = parseFloat(match.replace(/[$,]/g, ''));
    return amount > 1000 ? '$***.**' : match;
  });
  
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
