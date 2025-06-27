import React from "react";
import { FaYoutube, FaCog, FaWifi, FaCloud, FaTv, FaAppStore, FaInfoCircle, FaMagic, FaSatelliteDish, FaCogs } from "react-icons/fa";
import { MdSettings, MdApps, MdUpdate, MdInfo, MdNetworkWifi } from "react-icons/md";
import { useTVControl, CHANNEL_EDITOR_ITEMS_LIST } from '../context/TVControlContext';

const IOSSettingsIcon = (
  <span style={{
    display: "inline-block",
    background: "linear-gradient(135deg, #e0e0e0 60%, #b0b0b0 100%)",
    borderRadius: "50%",
    boxShadow: "0 2px 8px #0002",
    padding: 2,
  }}>
    <FaCog color="#666" size={24} style={{ filter: "drop-shadow(0 1px 1px #fff8)" }} />
  </span>
);

const apps = [
  { name: "Редактор каналов", icon: <div style={{display: "flex", alignItems: "center", gap: "2px"}}><FaTv color="#2196f3" size={20} /><FaMagic color="#9c27b0" size={16} /></div> },
  { name: "Настройки", icon: IOSSettingsIcon },
  { name: "Установка", icon: <FaSatelliteDish color="#4caf50" size={28} /> },
  { name: "Media Center", icon: <FaAppStore color="#00bcd4" size={28} /> },
  { name: "YouTube", icon: <FaYoutube color="#e53935" size={28} /> },
  { name: "IPTV", icon: <FaTv color="#2196f3" size={28} /> },
  { name: "Обновление HTTP", icon: <MdUpdate color="#ff9800" size={28} /> },
  { name: "APP", icon: <MdApps color="#9c27b0" size={28} /> },
  { name: "Поиск", icon: <FaInfoCircle color="#fff" size={28} /> },
  { name: "Сеть Wi-Fi", icon: <MdNetworkWifi color="#2196f3" size={28} /> },
  { name: "Оператор", icon: <FaWifi color="#00e676" size={28} /> },
  { name: "Информация", icon: <MdInfo color="#fff" size={28} /> },
];

export default function TVScreen() {
  const { tvState } = useTVControl();

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '/');
  const timeStr = now.toTimeString().slice(0, 5);

  return (
    <div
      style={{
        width: 520,
        height: 340,
        background: "#181c20",
        borderRadius: 18,
        border: "12px solid #23272e",
        boxShadow: "0 12px 48px #000b, 0 2px 16px #222a",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Channel List Modal */}
      {tvState.channelListOpen && (
        <>
          {/* Модалка с отступами и отдельным блоком */}
          <div style={{
            position: 'absolute',
            left: 32,
            top: 32,
            right: 32,
            bottom: 64,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}>
            <div style={{
              background: '#0a1a2a',
              borderRadius: 16,
              border: '2px solid #fff',
              boxShadow: '0 4px 24px #000a',
              width: 480,
              minHeight: 260,
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Верхняя панель */}
              <div style={{ display: 'flex', alignItems: 'center', background: '#174080', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: '5px 14px', justifyContent: 'space-between', minHeight: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginRight: 8 }}>📝</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Редактировать канал</span>
                </div>
                <span style={{ color: '#fff', fontSize: 13 }}>{dateStr} {timeStr}</span>
              </div>
              {/* Основной flex-контейнер модалки */}
              <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: 120, background: '#102040' }}>
                {/* Левая колонка: панель 1-5 и список */}
                <div style={{ flex: 2, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '10px 0 10px 12px', background: 'rgba(0,0,0,0.04)', borderRight: '1.5px solid #174080' }}>
                  {/* Панель 1-5 */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#001a3a',
                    borderRadius: 7,
                    padding: '2px 5px',
                    justifyContent: 'center',
                    fontSize: 11,
                    color: '#fff',
                    margin: '0 0 6px 0',
                    gap: 7,
                    border: '1px solid #174080',
                    maxWidth: 140,
                    minWidth: 0,
                    alignSelf: 'flex-start',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}><span style={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>1</span> <span style={{ fontSize: 11 }}>🗑️</span> <span style={{ fontSize: 10 }}>Del</span></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}><span style={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>2</span> <span style={{ fontSize: 11 }}>↔️</span> <span style={{ fontSize: 10 }}>Move</span></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}><span style={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>3</span> <span style={{ fontSize: 11 }}>⏭️</span> <span style={{ fontSize: 10 }}>Skip</span></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}><span style={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>4</span> <span style={{ fontSize: 11 }}>🔒</span> <span style={{ fontSize: 10 }}>Lock</span></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}><span style={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>5</span> <span style={{ fontSize: 11, color: '#ffd600' }}>★</span> <span style={{ fontSize: 10 }}>Fav</span></span>
                  </div>
                  <div style={{ color: '#fff', fontSize: 13, marginBottom: 4, fontWeight: 500, marginTop: 2 }}>Все</div>
                  <div style={{ background: '#001a3a', borderRadius: 7, padding: 3, minHeight: 80, maxHeight: 120, overflowY: 'auto', border: '1px solid #174080' }}>
                    {tvState.channelList.map((ch, idx) => (
                      <div
                        key={ch.name}
                        style={{
                          background: idx === tvState.selectedChannelIndex ? '#e048b1' : 'transparent',
                          color: idx === tvState.selectedChannelIndex ? '#fff' : '#fff',
                          fontWeight: idx === tvState.selectedChannelIndex ? 700 : 400,
                          fontSize: 12,
                          padding: '3px 8px',
                          borderRadius: 5,
                          margin: '1.5px 0',
                          display: 'flex',
                          alignItems: 'center',
                          letterSpacing: 0.1,
                        }}
                      >
                        <span style={{ width: 18, display: 'inline-block', textAlign: 'right', marginRight: 6 }}>{idx + 1}</span>
                        <span>{ch.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Правая колонка: мини-экран и инфо */}
                <div style={{ flex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 8px 0 8px', background: 'rgba(0,0,0,0.02)' }}>
                  {/* Мини-экран */}
                  <div style={{ width: 160, height: 80, background: '#222', borderRadius: 7, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid #333' }}>
                    {/* Заглушка: фото ведущего */}
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #e048b1 0%, #222 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 28 }}>
                      <span>🎤</span>
                    </div>
                  </div>
                  {/* Инфо о канале */}
                  <div style={{ color: '#fff', fontSize: 12, background: '#001a3a', borderRadius: 5, padding: '8px 12px', minHeight: 40, width: 170, whiteSpace: 'pre-line', marginTop: 6, border: '1px solid #174080' }}>
                    {tvState.channelList[tvState.selectedChannelIndex]?.info || 'Нет информации'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Мини-футер внизу экрана */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 2,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
            padding: '10px 36px',
            pointerEvents: 'none',
            background: '#0a1a2a',
            borderRadius: 12,
            width: 440,
            margin: '0 auto',
            boxSizing: 'border-box',
            boxShadow: '0 2px 16px #0006',
            marginTop: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ color: '#ff3d00', fontSize: 14 }}>●</span><span style={{ color: '#fff', fontSize: 12 }}>Сортировка</span></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ color: '#4caf50', fontSize: 14 }}>●</span><span style={{ color: '#fff', fontSize: 12 }}>Новое имя</span></span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ color: '#ffd600', fontSize: 14 }}>●</span><span style={{ color: '#fff', fontSize: 12 }}>PID</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#fff', background: '#174080', borderRadius: 4, padding: '1.5px 6px', fontWeight: 600, fontSize: 12 }}>1-5</span>
              <span style={{ color: '#fff', fontSize: 12 }}>Режим</span>
            </div>
          </div>
        </>
      )}
      {/* Модалка редактора каналов */}
      {tvState.channelEditorOpen && (
        <div style={{
          position: 'absolute',
          left: 80,
          top: 80,
          zIndex: 10,
          background: 'rgba(10,20,40,0.98)',
          borderRadius: 12,
          border: '2px solid #fff',
          boxShadow: '0 4px 24px #000a',
          minWidth: 160,
          maxWidth: 200,
          width: 170,
          padding: '6px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}>
          {CHANNEL_EDITOR_ITEMS_LIST.map((item, idx) => (
            <div
              key={item}
              style={{
                background: idx === tvState.channelEditorIndex ? '#e048b1' : 'transparent',
                color: idx === tvState.channelEditorIndex ? '#fff' : '#fff',
                fontWeight: idx === tvState.channelEditorIndex ? 700 : 400,
                fontSize: 14,
                padding: '7px 16px',
                borderRadius: 7,
                margin: '2px 7px',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: 0.2,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24,
        padding: 36,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #2b3a67 0%, #1e2a47 100%)",
        borderRadius: 8,
        boxShadow: "0 2px 12px #0004 inset",
      }}>
        {apps.map((app, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
              position: 'relative',
              boxShadow: tvState.selectedIcon === i ? '0 0 0 3px #e048b1, 0 0 16px 2px #e048b1aa' : undefined,
              border: tvState.selectedIcon === i ? '2px solid #fff' : '2px solid transparent',
              borderRadius: 12,
              transition: 'box-shadow 0.2s, border 0.2s',
              zIndex: tvState.selectedIcon === i ? 2 : 1,
              background: tvState.selectedIcon === i ? 'rgba(255,255,255,0.06)' : undefined,
            }}
          >
            {React.cloneElement(app.icon, { size: 36 })}
            <span style={{ fontSize: 13, marginTop: 4, textAlign: "center", textShadow: "0 1px 2px #000a" }}>{app.name}</span>
          </div>
        ))}
      </div>
      {/* Подставка телевизора */}
      <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 140, height: 18, background: "#23272e", borderRadius: 9, boxShadow: "0 4px 16px #0008" }} />
    </div>
  );
} 