
import React from 'react';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { AuthResponse } from '@/services/socialMediaAPI';

interface ErrorStepProps {
  authResult: AuthResponse | null;
  onClose: () => void;
  onTryAgain: () => void;
}

export const ErrorStep: React.FC<ErrorStepProps> = ({ authResult, onClose, onTryAgain }) => (
  <div className="text-center space-y-6 py-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
      <XCircle className="w-8 h-8" />
    </div>
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-red-700">Connection Failed</h3>
      <p className="text-gray-600 text-sm">
        {authResult?.error || 'Unable to connect to your account. Please try again.'}
      </p>
    </div>
    <div className="flex space-x-3">
      <Button variant="outline" onClick={onClose} className="flex-1">
        Close
      </Button>
      <Button onClick={onTryAgain} className="flex-1">
        Try Again
      </Button>
    </div>
  </div>
);
