import React, { useState } from "react";
import { FaPowerOff, FaVolumeUp, FaVolumeDown, FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCircle, FaPlay, FaPause, FaStop, FaYoutube, FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown, FaMicrophone, FaTv, FaTh, FaListUl, FaRegSquare, FaRegDotCircle, FaStepBackward, FaStepForward, FaCircle } from "react-icons/fa";
import { MdMenu, MdSubtitles, MdTextFields, MdSettingsVoice } from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";
import { useTVControl } from '../context/TVControlContext';

const buttonMap = [
  // Верхний ряд
  [
    { label: "Power", icon: <FaPowerOff color="#e53935" />, key: "power", type: "power" },
    { label: "Mute", icon: <FaRegCircle />, key: "mute", type: "round" },
  ],
  // Цветные кнопки
  [
    { label: "ZOOM", color: "#e53935", key: "zoom", type: "colored" },
    { label: "GOTO", color: "#43a047", key: "goto", type: "colored" },
    { label: "PAUSE", color: "#fbc02d", key: "pause", type: "colored" },
    { label: "TV/R", color: "#1e88e5", key: "tv_radio", type: "colored" },
  ],
  // Новые кнопки управления медиа (верхний ряд)
  [
    { label: "Prev", icon: <FaStepBackward size={8} />, key: "prev", type: "media" },
    { label: "Play", icon: <FaPlay size={8} />, key: "play", type: "media" },
    { label: "Next", icon: <FaStepForward size={8} />, key: "next", type: "media" },
    { label: "Stop", icon: <FaStop size={8} />, key: "stop", type: "media" },
  ],
  // Новые кнопки управления медиа (нижний ряд)
  [
    { label: "Back", icon: <FaArrowLeft size={8} />, key: "back", type: "media" },
    { label: "Pause", icon: <FaPause size={8} />, key: "pause_media", type: "media" },
    { label: "Forward", icon: <FaArrowRight size={8} />, key: "forward", type: "media" },
    { label: "Record", icon: <FaCircle size={8} color="#e53935" />, key: "record", type: "media" },
  ],
  // Кнопки управления
  [
    { label: "YouTube", icon: <FaYoutube color="#e53935" />, key: "youtube", type: "app" },
    { label: "IPTV", color: "#1e88e5", key: "iptv", type: "app" },
    { label: "FAV", key: "fav", type: "app" },
    { label: "EPG", key: "epg", type: "app" },
  ],
  // Стрелки и OK
  [
    { label: "Menu", key: "menu", type: "nav" },
    { label: "Up", icon: <FaChevronUp />, key: "up", type: "nav" },
    { label: "Exit", key: "exit", type: "nav" },
  ],
  [
    { label: "Left", icon: <FaChevronLeft />, key: "left", type: "nav" },
    { label: "OK", icon: <FaRegCircle />, key: "ok", big: true, type: "ok" },
    { label: "Right", icon: <FaChevronRight />, key: "right", type: "nav" },
  ],
  [
    { label: "Audio", key: "audio", type: "nav" },
    { label: "Down", icon: <FaChevronDown />, key: "down", type: "nav" },
    { label: "INFO", key: "info", type: "nav" },
  ],
  // Громкость и каналы
  [
    { label: "VOL-", icon: <FaVolumeDown />, key: "vol_down", type: "volume" },
    { label: "SAT", key: "sat", type: "round" },
    { label: "CH-", key: "ch_down", type: "channel" },
  ],
  [
    { label: "VOL+", icon: <FaVolumeUp />, key: "vol_up", type: "volume" },
    { label: "RECALL", key: "recall", type: "round" },
    { label: "CH+", key: "ch_up", type: "channel" },
  ],
  // Цифровой блок
  [
    { label: "1", key: "1", type: "number" },
    { label: "2", key: "2", type: "number" },
    { label: "3", key: "3", type: "number" },
  ],
  [
    { label: "4", key: "4", type: "number" },
    { label: "5", key: "5", type: "number" },
    { label: "6", key: "6", type: "number" },
  ],
  [
    { label: "7", key: "7", type: "number" },
    { label: "8", key: "8", type: "number" },
    { label: "9", key: "9", type: "number" },
  ],
  [
    { label: "SUBTL", icon: <MdSubtitles />, key: "subtl", type: "function" },
    { label: "0", key: "0", type: "number" },
    { label: "TXT", icon: <MdTextFields />, key: "txt", type: "function" },
  ],
];

// Функция для получения стилей кнопки
const getButtonStyles = (btn: any, pressed: boolean) => {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    cursor: "pointer",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    letterSpacing: 0.2,
    transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative" as const,
    border: "none",
    fontWeight: 600,
  };

  const getSize = () => {
    if (btn.big) return { width: 26, height: 26 };
    if (["ZOOM", "GOTO", "PAUSE", "TV/R", "IPTV", "FAV", "EPG", "Prev", "Play", "Next", "Stop", "Back", "Pause", "Forward", "Record"].includes(btn.label)) {
      return { width: 14, height: 13 };
    }
    return { width: 18, height: 18 };
  };

  const getBorderRadius = () => {
    if (["SAT", "RECALL", "INFO", "Audio", "Exit", "Menu"].includes(btn.label)) return "50%";
    if (btn.big) return "13px";
    return "8px";
  };

  const getFontSize = () => {
    if (["Menu", "Audio", "INFO", "SAT", "RECALL", "IPTV", "FAV", "EPG", "ZOOM", "GOTO", "PAUSE", "TV/R", "Prev", "Play", "Next", "Stop", "Back", "Pause", "Forward", "Record"].includes(btn.label)) {
      return 5;
    }
    if (["VOL-", "VOL+", "CH-", "CH+", "SUBTL", "TXT", "Menu", "Exit", "SAT", "IPTV", "YouTube", "FAV", "EPG", "ZOOM"].includes(btn.label)) {
      return 6.5;
    }
    if (btn.big) return 11;
    return 8.5;
  };

  const size = getSize();
  const borderRadius = getBorderRadius();
  const fontSize = getFontSize();

  switch (btn.type) {
    case "power":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed 
          ? "linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)"
          : "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 8px rgba(244, 67, 54, 0.3), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #b71c1c",
      };

    case "colored":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? `linear-gradient(135deg, ${btn.color}dd 0%, ${btn.color}aa 100%)`
          : `linear-gradient(135deg, ${btn.color} 0%, ${btn.color}dd 100%)`,
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : `0 2px 8px ${btn.color}40, 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)`,
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: `1px solid ${btn.color}aa`,
      };

    case "media":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #424242 0%, #303030 100%)"
          : "linear-gradient(135deg, #616161 0%, #424242 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #424242",
      };

    case "app":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
          : "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)",
        color: "#ecf0f1",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #2c3e50",
      };

    case "nav":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #37474f 0%, #263238 100%)"
          : "linear-gradient(135deg, #455a64 0%, #37474f 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #37474f",
      };

    case "ok":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)"
          : "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 3px 12px rgba(33, 150, 243, 0.4), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "2px solid #1976d2",
        fontWeight: 700,
      };

    case "volume":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)"
          : "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 8px rgba(76, 175, 80, 0.3), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #388e3c",
      };

    case "channel":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)"
          : "linear-gradient(135deg, #ffb74d 0%, #ff9800 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 8px rgba(255, 152, 0, 0.3), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #f57c00",
      };

    case "number":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #424242 0%, #303030 100%)"
          : "linear-gradient(135deg, #616161 0%, #424242 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #424242",
        fontWeight: 700,
      };

    case "function":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #5d4037 0%, #4e342e 100%)"
          : "linear-gradient(135deg, #795548 0%, #5d4037 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #5d4037",
      };

    case "round":
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #546e7a 0%, #455a64 100%)"
          : "linear-gradient(135deg, #78909c 0%, #546e7a 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #546e7a",
      };

    default:
      return {
        ...baseStyles,
        ...size,
        borderRadius,
        fontSize,
        background: pressed
          ? "linear-gradient(135deg, #424242 0%, #303030 100%)"
          : "linear-gradient(135deg, #616161 0%, #424242 100%)",
        color: "#fff",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
          : "0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        transform: pressed ? "translateY(1px)" : "translateY(0)",
        border: "1px solid #424242",
      };
  }
};

export default function RemoteControl({ onButtonClick }: { onButtonClick?: (key: string) => void }) {
  const [pressed, setPressed] = useState<string | null>(null);
  const { sendCommand } = useTVControl();

  const handlePress = (key: string) => {
    setPressed(key);
    if (onButtonClick) onButtonClick(key);
    // Управление ТВ с пульта
    switch (key) {
      case 'power':
        sendCommand('power'); break;
      case 'ok':
        sendCommand('ok'); break;
      case 'exit':
        sendCommand('exit'); break;
      case 'up':
        sendCommand('up'); break;
      case 'down':
        sendCommand('down'); break;
      case 'left':
        sendCommand('left'); break;
      case 'right':
        sendCommand('right'); break;
      default:
        break;
    }
    setTimeout(() => setPressed(null), 150);
  };

  return (
    <div
      style={{
        width: 90,
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
        borderRadius: 22,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        border: "2px solid #333",
        position: "relative",
      }}
    >
      {/* Добавляем блик на корпус пульта */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
        borderRadius: "20px 20px 0 0",
        pointerEvents: "none",
      }} />
      
      {buttonMap.map((row, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center", gap: 4 }}>
          {row.map((btn) => (
            <button
              key={btn.key}
              onClick={() => handlePress(btn.key)}
              style={getButtonStyles(btn, pressed === btn.key)}
              title={btn.label}
            >
              {btn.icon || (
                <span
                  style={{
                    fontSize: getButtonStyles(btn, false).fontSize,
                    width: "100%",
                    display: "block",
                    lineHeight: 1.2,
                    fontWeight: 600,
                    letterSpacing: 0.3,
                    padding: "0 1px",
                    boxSizing: "border-box",
                    textAlign: "center",
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                    filter: pressed === btn.key ? "brightness(0.8)" : "brightness(1)",
                  }}
                >
                  {btn.label}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
      
      {/* Улучшенный логотип */}
      <div style={{ 
        marginTop: 8, 
        color: "#f44336", 
        fontWeight: 700, 
        fontSize: 6, 
        letterSpacing: 0.8, 
        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
        textAlign: "center",
        background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)",
        padding: "6px 8px",
        borderRadius: 6,
        border: "1px solid #333",
        display: "inline-block",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}>
        OPENBOX GOLD
      </div>
    </div>
  );
} 