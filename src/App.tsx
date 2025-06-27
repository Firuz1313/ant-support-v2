import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/ANTSupport";
import NotFound from "./pages/NotFound";
import SelectDevicePage from "./pages/SelectDevicePage";
import DeviceRemotePage from "./pages/DeviceRemotePage";
import { TVControlProvider, useTVControl } from './context/TVControlContext';

const queryClient = new QueryClient();

function TVKeyboardHandler({ children }: { children: React.ReactNode }) {
  const { sendCommand } = useTVControl();
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowUp':
          sendCommand('up');
          e.preventDefault();
          break;
        case 'ArrowDown':
          sendCommand('down');
          e.preventDefault();
          break;
        case 'ArrowLeft':
          sendCommand('left');
          e.preventDefault();
          break;
        case 'ArrowRight':
          sendCommand('right');
          e.preventDefault();
          break;
        case 'Enter':
          sendCommand('ok');
          e.preventDefault();
          break;
        case 'Escape':
          sendCommand('exit');
          e.preventDefault();
          break;
        default:
          break;
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sendCommand]);
  return <>{children}</>;
}

const App = () => (
  <TVControlProvider>
    <TVKeyboardHandler>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/select-device" element={<SelectDevicePage />} />
              <Route path="/device/:deviceId" element={<DeviceRemotePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </TVKeyboardHandler>
  </TVControlProvider>
);

export default App;
