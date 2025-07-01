import React, { useState } from "react";
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

export default function TVScreen({ panelBtnFromRemote }: { panelBtnFromRemote?: number | null }) {
  const { tvState, sendCommand } = useTVControl();
  const [activePanelBtn, setActivePanelBtn] = useState<number | null>(null);
  const [channelsToDelete, setChannelsToDelete] = useState<Set<number>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  React.useEffect(() => {
    if (panelBtnFromRemote && tvState.channelListOpen) {
      setActivePanelBtn(panelBtnFromRemote);
    }
  }, [panelBtnFromRemote, tvState.channelListOpen]);

  // Сброс выбранных каналов при выходе из режима удаления
  React.useEffect(() => {
    if (activePanelBtn !== 1) setChannelsToDelete(new Set());
  }, [activePanelBtn]);

  // Обработчик выбора канала для удаления
  function handleChannelClick(idx: number) {
    if (activePanelBtn === 1) {
      setChannelsToDelete(prev => {
        const next = new Set(prev);
        if (next.has(idx)) next.delete(idx); else next.add(idx);
        return next;
      });
    }
  }

  function handlePanelBtnClick(idx: number) {
    setActivePanelBtn(idx + 1);
  }

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '/');
  const timeStr = now.toTimeString().slice(0, 5);

  // Обработка нажатия Exit с виртуального пульта
  React.useEffect(() => {
    function onVirtualExit() {
      if (showDeleteModal) {
        handleDeleteCancel();
        return;
      }
      if (activePanelBtn === 1 && channelsToDelete.size > 0) {
        setShowDeleteModal(true);
      }
    }
    window.addEventListener('virtual-remote-exit', onVirtualExit);
    return () => window.removeEventListener('virtual-remote-exit', onVirtualExit);
  }, [activePanelBtn, channelsToDelete, showDeleteModal]);

  function handleDeleteConfirm() {
    // Здесь будет логика удаления каналов
    setShowDeleteModal(false);
    setChannelsToDelete(new Set());
    // После удаления — выход на главный экран
    sendCommand('exit'); // Закрыть список каналов
    setTimeout(() => sendCommand('exit'), 100); // Закрыть редактор, если нужно
  }
  function handleDeleteCancel() {
    setShowDeleteModal(false);
    setChannelsToDelete(new Set());
    // После отмены — выход на главный экран
    sendCommand('exit'); // Закрыть список каналов
    setTimeout(() => sendCommand('exit'), 100); // Закрыть редактор, если нужно
  }

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
                <div style={{ flex: 2, minWidth: 240, display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '10px 0 10px 12px', background: 'rgba(0,0,0,0.04)', borderRight: '1.5px solid #174080' }}>
                  {/* Панель 1-5 */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#001a3a',
                    borderRadius: 6,
                    padding: '1.5px 2.5px',
                    justifyContent: 'center',
                    fontSize: 9,
                    color: '#fff',
                    margin: '0 0 5px 0',
                    gap: 3,
                    border: '1px solid #174080',
                    maxWidth: 220,
                    width: '94%',
                    alignSelf: 'flex-start',
                  }}>
                    {[1,2,3,4,5].map((num, idx) => (
                      <button
                        key={num}
                        type="button"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          background: 'none',
                          border: activePanelBtn === num ? '2px solid #ffd600' : 'none',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: 9,
                          padding: '2px 4px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          transition: 'background 0.15s, border 0.15s',
                          boxShadow: activePanelBtn === num ? '0 0 0 2px #ffd60088' : undefined,
                        }}
                        onClick={() => handlePanelBtnClick(idx)}
                      >
                        <span>{num}</span>
                        <span style={{ fontSize: 10 }}>{["🗑️","↔️","⏭️","🔒","★"][idx]}</span>
                        <span style={{ fontSize: 8, fontWeight: 400 }}>{["Del","Move","Skip","Lock","Fav"][idx]}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ color: '#fff', fontSize: 13, marginBottom: 4, fontWeight: 500, marginTop: 2 }}>Все</div>
                  <div style={{
                    background: '#001a3a',
                    borderRadius: 7,
                    padding: 3,
                    minHeight: 80,
                    maxHeight: 120,
                    overflowY: 'auto',
                    border: '1px solid #174080',
                    width: 210,
                    transition: 'width 0.2s',
                    scrollbarWidth: 'thin',
                  }}>
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
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: 180,
                          transition: 'background 0.15s',
                          cursor: activePanelBtn === 1 ? 'pointer' : 'default',
                          position: 'relative',
                        }}
                        onClick={() => handleChannelClick(idx)}
                      >
                        <span style={{ width: 18, display: 'inline-block', textAlign: 'right', marginRight: 6 }}>{idx + 1}</span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 140, display: 'inline-block' }}>{ch.name}</span>
                        {/* Красный глянцевый крестик для выбранных каналов */}
                        {activePanelBtn === 1 && channelsToDelete.has(idx) && (
                          <span style={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 10,
                            height: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <svg width="10" height="10" viewBox="0 0 10 10">
                              <line x1="2" y1="2" x2="8" y2="8" stroke="#ff1744" strokeWidth="3.5" strokeLinecap="round" />
                              <line x1="8" y1="2" x2="2" y2="8" stroke="#ff1744" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                          </span>
                        )}
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
                  <div style={{ color: '#fff', fontSize: 12, background: '#001a3a', borderRadius: 5, padding: '8px 12px', minHeight: 40, width: 155, whiteSpace: 'pre-line', marginTop: 6, border: '1px solid #174080' }}>
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
      {/* Модальное окно подтверждения удаления */}
      {showDeleteModal && (
        <div style={{
          position: 'absolute',
          left: 0, right: 0, top: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100,
          background: 'rgba(10,20,40,0.32)',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #23272e 60%, #181c20 100%)',
            border: '2px solid #fff',
            borderRadius: 14,
            boxShadow: '0 8px 32px #000b, 0 2px 8px #2227',
            minWidth: 320,
            maxWidth: 380,
            padding: '28px 32px 22px 32px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 0.5 }}>Подтверждение</div>
            <div style={{ color: '#fff', fontSize: 15, marginBottom: 18, textAlign: 'center', lineHeight: 1.5 }}>
              Удалить выбранные каналы?<br />Это действие нельзя отменить.
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
              <button onClick={handleDeleteCancel} style={{
                background: 'linear-gradient(135deg, #222 60%, #444 100%)',
                color: '#fff', border: '1.5px solid #888', borderRadius: 7,
                fontWeight: 600, fontSize: 15, padding: '7px 22px', cursor: 'pointer',
                boxShadow: '0 2px 8px #0004',
                transition: 'background 0.15s',
              }}>Отмена</button>
              <button onClick={handleDeleteConfirm} style={{
                background: 'linear-gradient(135deg, #ff1744 60%, #b71c1c 100%)',
                color: '#fff', border: '1.5px solid #ff1744', borderRadius: 7,
                fontWeight: 700, fontSize: 15, padding: '7px 22px', cursor: 'pointer',
                boxShadow: '0 2px 12px #ff174488',
                transition: 'background 0.15s',
              }}>Удалить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 