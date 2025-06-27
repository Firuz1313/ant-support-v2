import React, { createContext, useContext, useState } from 'react';

// Типы команд
export type TVCommand =
  | 'power'
  | 'exit'
  | 'ok'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'open_channel_editor';

// Количество иконок в сетке главного экрана (3 ряда по 4 иконки)
const ICONS_GRID_ROWS = 3;
const ICONS_GRID_COLS = 4;
const ICONS_TOTAL = 12;

// Состояние телевизора (минимальное для логики)
interface TVState {
  power: boolean;
  channelEditorOpen: boolean;
  channelEditorIndex: number; // выбранный пункт
  selectedIcon: number; // индекс выбранной иконки на главном экране
  channelListOpen: boolean;
  selectedChannelIndex: number;
  channelList: { name: string; info: string }[];
}

interface TVControlContextType {
  tvState: TVState;
  sendCommand: (cmd: TVCommand) => void;
}

const TVControlContext = createContext<TVControlContextType | undefined>(undefined);

const CHANNEL_EDITOR_ITEMS = [
  'Телеканал',
  'Радиоканал',
  'Удалить все',
];

const DEFAULT_CHANNEL_LIST = [
  { name: '.RED HD', info: 'Express 80\n12049 / H / 31999\n.RED HD\nPID V:60 A:61 PCR:60' },
  { name: '.SCI-FI', info: '' },
  { name: '5 КАНАЛ', info: '' },
  { name: '7 СИТОРА HD', info: '' },
  { name: 'ANI', info: '' },
  { name: 'Animal Planet HD', info: '' },
  { name: 'ANIME', info: '' },
  { name: 'BOLAJON', info: '' },
  { name: 'BOLLYWOOD', info: '' },
  { name: 'CINEMA', info: '' },
  { name: 'CTC KIDS', info: '' },
  { name: 'DA VINCI KIDS', info: '' },
  { name: 'DISCOVERY CHANNEL', info: '' },
  { name: 'DISCOVERY ID', info: '' },
  { name: 'Disney', info: '' },
  { name: 'DIZI', info: '' },
  { name: 'English Club', info: '' },
  { name: 'EURONEWS', info: '' },
  { name: 'EUROPA-PLUS TV', info: '' },
  { name: 'EUROSPORT 1', info: '' },
  { name: 'EUROSPORT 2', info: '' },
  { name: 'Extreme Sports', info: '' },
  { name: 'FIGHTBOX', info: '' },
  { name: 'GAME - TV HD', info: '' },
  { name: 'GEM-BOLLYWOOD', info: '' },
  { name: 'GEM-FOOD', info: '' },
  { name: 'ВОСТОК ТВ', info: '' },
  { name: 'GEM-RIVER', info: '' },
  { name: 'KHL', info: '' },
  { name: 'KHL PRIME HD', info: '' },
  { name: 'KINOTEATR', info: '' },
  { name: 'MADANIYAT VA MA`RIFAT', info: '' },
  { name: 'MAHALLA', info: '' },
  { name: 'Milliy TV', info: '' },
  { name: 'MMA-TV', info: '' },
  { name: 'My5', info: '' },
  { name: 'NAT GEO WILD HD', info: '' },
  { name: 'NATIONAL GEOGRAPHIC HD', info: '' },
  { name: 'NAVO', info: '' },
  { name: 'NICK JUNIOR', info: '' },
  { name: 'OCEAN TV', info: '' },
  { name: 'PMC HD', info: '' },
  { name: 'Ru TV', info: '' },
  { name: 'SAUDI QURAN HD', info: '' },
  { name: 'Saudi Sunnah HD', info: '' },
  { name: 'SETANTA SPORT 1 HD', info: '' },
  { name: 'SETANTA SPORT 2', info: '' },
  { name: 'SEVIMLI TV', info: '' },
  { name: 'SPORT PREM 01', info: '' },
  { name: 'SPORT PREM 02', info: '' },
  { name: 'SPORT PREM 03', info: '' },
  { name: 'SPORT PREM 04', info: '' },
  { name: 'SPORT PREM 05', info: '' },
  { name: 'SPORT PREM 06', info: '' },
  { name: 'START WORLD', info: '' },
  { name: 'TLC', info: '' },
  { name: 'TV1000', info: '' },
  { name: 'TV-1000 EAST', info: '' },
  { name: 'TV1000 Русское кино', info: '' },
  { name: 'UFC TV HD', info: '' },
  { name: 'VIASAT HISTORY', info: '' },
  { name: 'VIASAT SPORT', info: '' },
  { name: 'VIP MEGAHIT HD', info: '' },
  { name: 'VIP PREIMERE HD', info: '' },
  { name: 'VIP-COMEDY', info: '' },
  { name: 'YOSHLAR', info: '' },
  { name: 'ZOR-TV', info: '' },
  { name: 'АВТО 24', info: '' },
  { name: 'АЗИЯ HD', info: '' },
  { name: 'АНТ', info: '' },
  { name: 'АНТ Бизнес', info: '' },
  { name: 'Ант-Comedy HD', info: '' },
  { name: 'АНТ-КИНО HD', info: '' },
  { name: 'АНТ-КУДАКОНА HD', info: '' },
  { name: 'АНТ-МУЗЫКА', info: '' },
  { name: 'АНТ-ОИЛА HD', info: '' },
  { name: 'АНТ-ОЛАМ HD', info: '' },
  { name: 'АНТ-ПРЕМИУМ HD', info: '' },
  { name: 'АНТ-СEРИАЛ', info: '' },
  { name: 'АНТ-ШАШМАКОМ', info: '' },
  { name: 'БАХОРИСТОН', info: '' },
  { name: 'БОКС ТВ', info: '' },
  { name: 'БОЛЬШАЯ АЗИЯ', info: '' },
  { name: 'ВАРЗИШ HD', info: '' },
  { name: 'ГЛАЗАМИ ТУРИСТА HD', info: '' },
  { name: 'ДЕТСКИЙ МИР', info: '' },
  { name: 'ДИЁР HD', info: '' },
  { name: 'ДИКАЯ ОХОТА HD', info: '' },
  { name: 'ДИКАЯ РЫБАЛКА HD', info: '' },
  { name: 'ДИКИЙ', info: '' },
  { name: 'ДОКТОР', info: '' },
  { name: 'ДОМ КИНО', info: '' },
  { name: 'ДОМАШНИЙ', info: '' },
  { name: 'ДУШАНБЕ HD', info: '' },
  { name: 'ЖИВАЯ ПРИРОДА HD', info: '' },
  { name: 'ЖИВИ АКТИВНО HD', info: '' },
  { name: 'ЗАЛ СУДА', info: '' },
  { name: 'ЗВЕЗДА', info: '' },
  { name: 'ЗООПАРК', info: '' },
  { name: 'ИЗВЕСТИЯ', info: '' },
  { name: 'ИЛМ ва ТАБИАТ', info: '' },
  { name: 'ИНДИЙСКОЕ КИНО', info: '' },
  { name: 'Индия', info: '' },
  { name: 'ИСТОРИЯ', info: '' },
  { name: 'КАРУСЕЛЬ', info: '' },
  { name: 'КВН ТВ', info: '' },
  { name: 'КИНЕКО', info: '' },
  { name: 'КИНО ТВ HD', info: '' },
  { name: 'КИНОМИКС HD', info: '' },
  { name: 'КИНОПРЕМЬЕРА HD', info: '' },
  { name: 'КИНОСЕМЬЯ HD', info: '' },
  { name: 'КИНОХИТ HD', info: '' },
  { name: 'КОМЕДИЯ', info: '' },
  { name: 'КУХНЯ ТВ', info: '' },
  { name: 'Лёва', info: '' },
  { name: 'ЛЮБИМОЕ КИНО', info: '' },
  { name: 'МАМА', info: '' },
  { name: 'МАТЧ! HD', info: '' },
  { name: 'МАТЧ! БОЕЦ', info: '' },
  { name: 'МАТЧ! ПРЕМЬЕР HD', info: '' },
  { name: 'МАТЧ! СТРАНА', info: '' },
  { name: 'МАТЧ! ФУТБОЛ 1', info: '' },
  { name: 'МАТЧ! ФУТБОЛ 2', info: '' },
  { name: 'МАТЧ! ФУТБОЛ 3', info: '' },
  { name: 'МИР', info: '' },
  { name: 'МИР 24', info: '' },
  { name: 'МИР СЕРИАЛА', info: '' },
  { name: 'МОСФИЛЬМ', info: '' },
  { name: 'МОЯ ПЛАНЕТА', info: '' },
  { name: 'МУЖСКОЕ КИНО', info: '' },
  { name: 'МУЗ-ТВ', info: '' },
  { name: 'МУЛЬТ', info: '' },
  { name: 'МУЛЬТ И МУЗЫКА', info: '' },
  { name: 'НАУКА 2.0', info: '' },
  { name: 'НОСТАЛЬГИЯ', info: '' },
  { name: 'НСТВ', info: '' },
  { name: 'НТВ (+2)', info: '' },
  { name: 'НТВ HD', info: '' },
  { name: 'НТВ СЕРИАЛ', info: '' },
  { name: 'НТВ- СТИЛЬ', info: '' },
  { name: 'НТВ ХИТ', info: '' },
  { name: 'ОХОТА И РЫБАЛКА', info: '' },
  { name: 'ПЕРВЫЙ КАНАЛ +4', info: '' },
  { name: 'ПЕРВЫЙ КАНАЛ HD', info: '' },
  { name: 'ПОБЕДА', info: '' },
  { name: 'ПЯТНИЦА', info: '' },
  { name: 'РБК', info: '' },
  { name: 'РЕН ТВ', info: '' },
  { name: 'Родное Кино', info: '' },
  { name: 'РОССИЯ +4', info: '' },
  { name: 'РОССИЯ 24', info: '' },
  { name: 'РОССИЯ HD', info: '' },
  { name: 'РТР ПЛАНЕТА', info: '' },
  { name: 'Русский Бестселлер', info: '' },
  { name: 'РУССКИЙ ДЕТЕКТИВ', info: '' },
  { name: 'РУССКИЙ РОМАН', info: '' },
  { name: 'САЛОМ ТВ', info: '' },
  { name: 'САПФИР', info: '' },
  { name: 'САФИНА HD', info: '' },
  { name: 'СИНАМО HD', info: '' },
  { name: 'СМ-1', info: '' },
  { name: 'Солнце', info: '' },
  { name: 'СОМОН', info: '' },
  { name: 'СТС +2', info: '' },
  { name: 'СТС HD', info: '' },
  { name: 'СУГД HD', info: '' },
  { name: 'Т24', info: '' },
  { name: 'ТАНИН', info: '' },
  { name: 'ТВ Бадахшон', info: '' },
  { name: 'ТВ Гулакандоз', info: '' },
  { name: 'ТВ САЙЕХИ', info: '' },
  { name: 'ТВЦ', info: '' },
  { name: 'ТВ-3', info: '' },
  { name: 'ТМТ ШАХНАВОЗ', info: '' },
  { name: 'ТНТ (+4)', info: '' },
  { name: 'ТНТ HD', info: '' },
  { name: 'ТНТ4', info: '' },
  { name: 'ТОЧИКИСТОН HD', info: '' },
  { name: 'Футбол ТЧ HD', info: '' },
  { name: 'ЧАХОНОРО', info: '' },
  { name: 'ЧАХОННАМО', info: '' },
  { name: 'ЧЕ', info: '' },
  { name: 'Ю ТВ', info: '' },
];

export const TVControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tvState, setTvState] = useState<TVState>({
    power: true,
    channelEditorOpen: false,
    channelEditorIndex: 0,
    selectedIcon: 0,
    channelListOpen: false,
    selectedChannelIndex: 0,
    channelList: DEFAULT_CHANNEL_LIST,
  });

  function sendCommand(cmd: TVCommand) {
    setTvState(prev => {
      if (!prev.power) return prev;
      // Channel List Modal
      if (prev.channelListOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, channelListOpen: false };
          case 'ok':
            // Здесь можно добавить действие выбора канала
            return prev;
          case 'up':
            return {
              ...prev,
              selectedChannelIndex:
                (prev.selectedChannelIndex + prev.channelList.length - 1) % prev.channelList.length,
            };
          case 'down':
            return {
              ...prev,
              selectedChannelIndex:
                (prev.selectedChannelIndex + 1) % prev.channelList.length,
            };
          default:
            return prev;
        }
      }
      // Channel Editor Modal
      if (prev.channelEditorOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, channelEditorOpen: false };
          case 'ok':
            // Если выбран "Телеканал", открываем список каналов
            if (prev.channelEditorIndex === 0) {
              return { ...prev, channelEditorOpen: false, channelListOpen: true, selectedChannelIndex: 0 };
            }
            return { ...prev, channelEditorOpen: false };
          case 'up':
            return {
              ...prev,
              channelEditorIndex:
                (prev.channelEditorIndex + CHANNEL_EDITOR_ITEMS.length - 1) % CHANNEL_EDITOR_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              channelEditorIndex:
                (prev.channelEditorIndex + 1) % CHANNEL_EDITOR_ITEMS.length,
            };
          default:
            return prev;
        }
      }
      // Навигация по иконкам главного экрана
      switch (cmd) {
        case 'power':
          return { ...prev, power: !prev.power };
        case 'open_channel_editor':
          return { ...prev, channelEditorOpen: true, channelEditorIndex: 0 };
        case 'ok':
          if (prev.selectedIcon === 0) {
            return { ...prev, channelEditorOpen: true, channelEditorIndex: 0 };
          }
          return prev;
        case 'left':
          return { ...prev, selectedIcon: (prev.selectedIcon + ICONS_TOTAL - 1) % ICONS_TOTAL };
        case 'right':
          return { ...prev, selectedIcon: (prev.selectedIcon + 1) % ICONS_TOTAL };
        case 'up': {
          const row = Math.floor(prev.selectedIcon / ICONS_GRID_COLS);
          if (row === 0) return prev;
          return { ...prev, selectedIcon: prev.selectedIcon - ICONS_GRID_COLS };
        }
        case 'down': {
          const row = Math.floor(prev.selectedIcon / ICONS_GRID_COLS);
          if (row === ICONS_GRID_ROWS - 1) return prev;
          return { ...prev, selectedIcon: prev.selectedIcon + ICONS_GRID_COLS };
        }
        default:
          return prev;
      }
    });
  }

  return (
    <TVControlContext.Provider value={{ tvState, sendCommand }}>
      {children}
    </TVControlContext.Provider>
  );
};

export function useTVControl() {
  const ctx = useContext(TVControlContext);
  if (!ctx) throw new Error('useTVControl must be used within TVControlProvider');
  return ctx;
}

export const CHANNEL_EDITOR_ITEMS_LIST = CHANNEL_EDITOR_ITEMS; 