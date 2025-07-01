import { MdEdit, MdDelete, MdSwapVert, MdLock, MdStar, MdSignalCellularConnectedNoInternet0Bar, MdWifiOff } from 'react-icons/md';

export const errorList = [
  {
    key: 'channel-editor',
    title: 'Редактор каналов',
    icon: MdEdit,
    description: 'Проблемы с управлением списком каналов',
    subErrors: [
      { key: 'delete', icon: MdDelete, title: 'Удаление каналов', description: 'Не удаётся удалить канал' },
      { key: 'move', icon: MdSwapVert, title: 'Перемещение каналов', description: 'Не работает перемещение' },
      { key: 'lock', icon: MdLock, title: 'Блокировка каналов', description: 'Не получается заблокировать канал' },
      { key: 'fav', icon: MdStar, title: 'Добавление в избранное', description: 'Канал не добавляется в избранное' },
    ]
  },
  {
    key: 'no-signal',
    title: 'Нет сигнала',
    icon: MdSignalCellularConnectedNoInternet0Bar,
    description: 'На экране ТВ нет изображения или пишет \'Нет сигнала\''
  },
  {
    key: 'internet',
    title: 'Проблемы с интернетом',
    icon: MdWifiOff,
    description: 'Не работает интернет или Wi-Fi'
  },
]; 