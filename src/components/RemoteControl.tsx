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
        fontWeight: 700,
    fontSize: 11,
    color: '#fff',
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)"
      : "0 2px 8px #0002, 0 1px 2px #0001",
        background: pressed
      ? "linear-gradient(135deg, #23272e 0%, #181c20 100%)"
      : "linear-gradient(135deg, #2d2d2d 0%, #23272e 100%)",
    margin: 0,
    padding: 0,
  };
  let borderRadius = 8;
  let width = 38, height = 22;
  let fontSize = 8;
  let background = baseStyles.background;
  // Круглые кнопки: Menu, Exit, Audio, Info, Sat, Recall
  const roundLabels = ["Menu", "Exit", "Audio", "INFO", "SAT", "RECALL"];
  if (roundLabels.includes(btn.label)) { width = 26; height = 26; borderRadius = 13; fontSize = 7; }
  if (btn.label === 'RECALL') fontSize = 5;
  // OK кнопка — крупная овальная
  if (btn.type === 'ok') { width = 48; height = 28; borderRadius = 14; fontSize = 12; }
  // Цветные кнопки
  if (btn.type === 'colored') {
    background = pressed
      ? `linear-gradient(135deg, ${btn.color}cc 0%, ${btn.color}99 100%)`
      : `linear-gradient(135deg, ${btn.color} 0%, ${btn.color}cc 100%)`;
  } else if (!roundLabels.includes(btn.label) && btn.type !== 'ok') {
    background = pressed
      ? 'linear-gradient(135deg, #23272e 0%, #181c20 100%)'
      : 'linear-gradient(135deg, #23272e 0%, #181c20 100%)';
  }
  // Современный box-shadow и плавный hover/active для всех
  const boxShadow = pressed
    ? '0 1px 4px #0008, 0 0 0 2px #00eaff44 inset'
    : '0 2px 8px #0003, 0 1px 2px #0002, 0 0 0 1.5px #fff1 inset';
  return {
    ...baseStyles,
    borderRadius,
    background,
    width,
    height,
    fontSize,
    boxShadow,
    border: btn.type === 'colored' ? `2px solid ${btn.color}` : '1.5px solid #222',
    _fontSize: fontSize,
  };
};

const REMOTE_WIDTH = 150;
const REMOTE_HEIGHT = 490;
const ICON_SIZE = 10;
const BUTTON_SIZE = 20;

export default function RemoteControl({ onButtonClick, highlight }: { onButtonClick?: (key: string) => void, highlight?: { key?: string } }) {
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
        width: REMOTE_WIDTH,
        minWidth: 160,
        maxWidth: '100vw',
        height: REMOTE_HEIGHT,
        background: '#23272e',
        borderRadius: 28,
        boxShadow: '0 4px 32px #000a',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {buttonMap.map((row, rowIdx) => {
        // Ряды, которым нужен особый горизонтальный gap (1-3, 4-6, 7-9, SUBTL-0-TXT)
        const digitRows = [9, 10, 11, 12];
        const isDigitRow = digitRows.includes(rowIdx);
        // Ряды, которым нужен особый отступ (space-between)
        const spacedRows = [5, 6, 7, 8, 9, 10, 11, 12];
        const isSpaced = spacedRows.includes(rowIdx);
        return (
          <div
            key={rowIdx}
            style={{
              display: 'flex',
              gap: isDigitRow ? 8 : (isSpaced ? 0 : 4),
              marginBottom: 2,
              justifyContent: isSpaced ? 'space-between' : 'center',
              width: '100%',
              padding: isSpaced ? '0 8px' : 0,
            }}
          >
            {row.map((btn, btnIdx) => {
            const isHighlighted = highlight?.key === btn.key;
              const btnStyles = getButtonStyles(btn, pressed === btn.key);
              // Для крайних кнопок в spacedRows добавим margin
              let extraStyle = {};
              if (isSpaced && btnIdx === 0) extraStyle = { marginLeft: 2 };
              if (isSpaced && btnIdx === row.length - 1) extraStyle = { marginRight: 2 };
            return (
            <button
              key={btn.key}
              onClick={() => handlePress(btn.key)}
              style={{
                    ...btnStyles,
                    ...extraStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.18s, box-shadow 0.18s',
              }}
              title={btn.label}
            >
                  {btn.icon ? React.cloneElement(btn.icon, { size: btnStyles._fontSize }) : <span style={{fontSize: btnStyles._fontSize, fontWeight: 700, color: '#fff'}}>{btn.label}</span>}
            </button>
            );
          })}
        </div>
        );
      })}
      
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

// @keyframes remote-blink { 0% { box-shadow: 0 0 0 6px #ff174400, 0 0 16px 4px #ff174400; } 100% { box-shadow: 0 0 0 6px #ff174488, 0 0 16px 4px #ff174488; } } 