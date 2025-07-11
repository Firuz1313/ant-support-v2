import { useParams, Routes, Route } from "react-router-dom";
import RemoteControl from "../components/RemoteControl";
import TVScreen from "../components/TVScreen";
import NotFound from "./NotFound";
import React, { useState } from 'react';
import ErrorSelectionPage from './ErrorSelectionPage';
import ErrorDetailPage from './ErrorDetailPage';
import { useIsMobile } from '../hooks/use-mobile';

const devices = [
  {
    id: "openbox",
    name: "OpenBox",
    description: "Professional-grade receiver with advanced features",
  },
  {
    id: "openbox-gold",
    name: "OpenBox Gold",
    description: "Premium model with enhanced performance",
  },
  {
    id: "uclan",
    name: "Uclan",
    description: "Reliable and efficient digital receiver",
  },
  {
    id: "hdbox",
    name: "HDBox",
    description: "Feature-rich PVR with recording capabilities",
  },
];

export default function DeviceRemotePage({ panelBtnFromRemote, onRemoteButton }: { panelBtnFromRemote?: number | null, onRemoteButton?: (key: string) => void }) {
  const { deviceId } = useParams();
  const selectedDevice = devices.find((d) => d.id === deviceId);
  const [localPanelBtn, setLocalPanelBtn] = useState<number | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<number>>(new Set());
  const isMobile = useIsMobile();
  // Адаптивные размеры ТВ
  let tvWidth = 900;
  let tvHeight = 480;
  if (typeof window !== 'undefined') {
    if (isMobile) {
      tvWidth = Math.min(window.innerWidth * 0.98, 420);
      tvHeight = tvWidth * (480 / 900);
    } else {
      tvWidth = Math.min(900, window.innerWidth * 0.7);
      tvHeight = tvWidth * (480 / 900);
    }
  }

  React.useEffect(() => {
    if (panelBtnFromRemote) setLocalPanelBtn(panelBtnFromRemote);
  }, [panelBtnFromRemote]);

  // Слушаем кастомное событие OK с виртуального пульта
  React.useEffect(() => {
    function onOk() {
      // Здесь можно пробросить событие дальше, если нужно
      // Например, window.dispatchEvent(new CustomEvent('device-remote-ok'));
    }
    window.addEventListener('virtual-remote-ok', onOk);
    return () => window.removeEventListener('virtual-remote-ok', onOk);
  }, []);

  function handleRemoteButton(key: string) {
    if (onRemoteButton) onRemoteButton(key);
  }

  if (!selectedDevice) return <NotFound />;

  return (
    <div style={{ background: "#2563eb", minHeight: "100vh", padding: 0 }}>
      {/* Верхнее меню */}
      <div style={{ background: "#0a1a4f", padding: "16px 0 8px 0", borderBottom: "2px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 32 }}>
          <img src="/favicon.ico" alt="АНТ" style={{ width: 36, height: 36, borderRadius: 8, marginRight: 12 }} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 22, letterSpacing: 1 }}>АНТ</span>
          <nav style={{ display: "flex", gap: 18, marginLeft: 32 }}>
            <a href="/" style={{ color: "#fff", opacity: 0.9, fontWeight: 500, textDecoration: "none" }}>Главная</a>
            <a href="/devices" style={{ color: "#fff", opacity: 0.9, fontWeight: 500, textDecoration: "none" }}>Приставки</a>
            <a href="/support" style={{ color: "#fff", opacity: 0.9, fontWeight: 500, textDecoration: "none" }}>Поддержка</a>
          </nav>
        </div>
        <div style={{ display: "flex", gap: 10, marginRight: 32 }}>
          <button style={{ background: "#2563eb", color: "#fff", border: 0, borderRadius: 16, padding: "6px 18px", fontWeight: 600, marginLeft: 4 }}>OpenBOX</button>
          <button style={{ background: "#2563eb", color: "#fff", border: 0, borderRadius: 16, padding: "6px 18px", fontWeight: 600, marginLeft: 4 }}>OpenBOX GOLD</button>
          <button style={{ background: "#2563eb", color: "#fff", border: 0, borderRadius: 16, padding: "6px 18px", fontWeight: 600, marginLeft: 4 }}>Uclan</button>
          <button style={{ background: "#2563eb", color: "#fff", border: 0, borderRadius: 16, padding: "6px 18px", fontWeight: 600, marginLeft: 4 }}>HDBox</button>
        </div>
      </div>
        {/* Карточка приставки */}
      <div style={{ background: "#2563eb", border: "2px solid #fff3", borderRadius: 16, padding: 24, minWidth: 220, color: "#fff", boxShadow: "0 4px 24px #0002", margin: '32px auto 0', maxWidth: 400 }}>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{selectedDevice?.name}</div>
          <div style={{ fontSize: 15, opacity: 0.8, marginBottom: 12 }}>{selectedDevice?.description}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 10, height: 10, background: "#22c55e", borderRadius: 5, display: "inline-block" }} />
            <span style={{ fontSize: 14, color: "#a7f3d0" }}>Подключено</span>
          </div>
        </div>
      {/* Один комплект ТВ и пульта в основном контенте */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: isMobile ? 'center' : 'flex-start', gap: isMobile ? 24 : 48, marginTop: isMobile ? 24 : 48, paddingBottom: isMobile ? 24 : 48, width: '100%' }}>
        <TVScreen panelBtnFromRemote={localPanelBtn} width={tvWidth} height={tvHeight} />
        {!isMobile && <RemoteControl onButtonClick={handleRemoteButton} />}
      </div>
      <Routes>
        <Route path="/error-select" element={<ErrorSelectionPage />} />
        <Route path="/error/:errorKey/:subKey?" element={<ErrorDetailPage />} />
      </Routes>
    </div>
  );
} 