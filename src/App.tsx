import React, { useEffect, useState } from 'react';
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
import TVScreen from './components/TVScreen';
import RemoteControl from './components/RemoteControl';
import ErrorSelectionPage from './pages/ErrorSelectionPage';
import ErrorDetailPage from './pages/ErrorDetailPage';

const queryClient = new QueryClient();

export default function App() {
  const [panelBtnFromRemote, setPanelBtnFromRemote] = useState<number | null>(null);

  // Обработчик для виртуального пульта
  function handleRemoteButton(key: string) {
    if (["1","2","3","4","5"].includes(key)) {
      setPanelBtnFromRemote(Number(key));
    }
    // Пробрасываем OK
    if (key === "ok") {
      setPanelBtnFromRemote((prev) => prev); // триггерим rerender
      window.dispatchEvent(new CustomEvent("virtual-remote-ok"));
    }
  }

  return (
  <TVControlProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/select-device" element={<SelectDevicePage />} />
          <Route path="/device/:deviceId" element={<DeviceRemotePage panelBtnFromRemote={panelBtnFromRemote} onRemoteButton={handleRemoteButton} />} />
          <Route path="/error-select" element={<ErrorSelectionPage />} />
          <Route path="/error/:errorKey/:subKey?" element={<ErrorDetailPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </TVControlProvider>
);
}
