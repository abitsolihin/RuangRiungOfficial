import { cn } from '../../utils/cn';
import { steps } from '../../constants/topup.constants';

interface ProgressStepsProps {
  darkMode: boolean;
  currentStep: number;
}

export function ProgressSteps({ darkMode, currentStep }: ProgressStepsProps) {
  return (
    <div className={cn(
      "p-4 rounded-2xl mb-8 backdrop-blur-xl border",
      darkMode ? "bg-gray-800/30 border-emerald-500/20" : "bg-white/50 border-emerald-200"
    )}>
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                  currentStep >= step.number
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                    : darkMode ? "bg-gray-700 text-gray-500" : "bg-gray-200 text-gray-400"
                )}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <span className={cn(
                "text-xs mt-2 hidden sm:block",
                currentStep >= step.number 
                  ? (darkMode ? "text-emerald-400" : "text-emerald-600")
                  : (darkMode ? "text-gray-500" : "text-gray-400")
              )}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "w-12 sm:w-20 h-1 mx-2 rounded",
                currentStep > step.number 
                  ? "bg-emerald-500" 
                  : (darkMode ? "bg-gray-700" : "bg-gray-200")
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
