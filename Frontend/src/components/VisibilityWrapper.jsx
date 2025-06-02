import React from 'react';
import { useVisibility } from '@/context/VisibilityContext';
import { Eye, EyeClosed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const VisibilityWrapper = ({ children, showButton = false }) => {
  const { isBlurred, toggleBlur } = useVisibility();

  const tooltipText = isBlurred ? 'Mostrar' : 'Ocultar';

  return (
    <div className="flex items-center ">
      {showButton && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBlur}
              className="rounded-full"
              aria-label="Toggle blur"
            >
              {isBlurred ? (
                <EyeClosed className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Eye className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      )}
      <div className={`transition-all duration-300 ${isBlurred ? 'blur-sm' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default VisibilityWrapper;
