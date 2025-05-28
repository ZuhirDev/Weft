import React from 'react';
import { useVisibility } from '@/context/VisibilityContext';
import { Eye, EyeClosed } from 'lucide-react';

const VisibilityWrapper = ({ children, showButton = false }) => {
  const { isBlurred, toggleBlur } = useVisibility();

  return (
    <div className="flex items-center gap-2">
      {showButton && (
        <button onClick={toggleBlur} aria-label="Toggle blur">
          {isBlurred ? <EyeClosed size={24} /> : <Eye size={24} />}
        </button>
      )}
      <div className={`transition-all duration-300 ${isBlurred ? 'blur-sm' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default VisibilityWrapper;
