import React, { createContext, useContext, useState } from 'react';
import { channelEditorDeleteTutorial } from '../tutorials';

const autoActions: Record<string, () => void> = {
  selectChannelEditor: () => {
    document.querySelector('.channel-editor-icon')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  },
  navigateToDeleteAll: () => {
    // Эмулируем два нажатия вниз
    const down = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    document.dispatchEvent(down);
    document.dispatchEvent(down);
  },
  confirmDeleteAll: () => {
    // Эмулируем нажатие Enter (OK)
    const ok = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    document.dispatchEvent(ok);
  },
};

interface TutorialContextType {
  steps: typeof channelEditorDeleteTutorial;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps] = useState(channelEditorDeleteTutorial);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    const step = steps[currentStep];
    if (step?.autoAction && autoActions[step.autoAction]) {
      autoActions[step.autoAction]();
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => setCurrentStep(0);

  return (
    <TutorialContext.Provider value={{ steps, currentStep, nextStep, prevStep, reset }}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const ctx = useContext(TutorialContext);
  if (!ctx) throw new Error('useTutorial must be used within TutorialProvider');
  return ctx;
}; 