export const errorSteps = {
  'channel-editor': {
    delete: [
      {
        title: 'Шаг 1',
        hint: 'Зайдите в раздел "Редактор каналов". На пульте нажмите кнопку OK.',
        tvHighlight: { type: 'menu', key: 'channel-editor' },
        remoteHighlight: { key: 'ok' },
      },
      {
        title: 'Шаг 2',
        hint: 'Выберите канал, который хотите удалить, и снова нажмите OK.',
        tvHighlight: { type: 'channel-list', key: 'select-channel' },
        remoteHighlight: { key: 'ok' },
      },
      {
        title: 'Шаг 3',
        hint: 'Для подтверждения удаления нажмите кнопку "Del" на пульте.',
        tvHighlight: { type: 'channel-list', key: 'selected-for-delete' },
        remoteHighlight: { key: 'del' },
      },
      {
        title: 'Шаг 4',
        hint: 'Подтвердите удаление в появившемся окне.',
        tvHighlight: { type: 'modal', key: 'delete-confirm' },
        remoteHighlight: { key: 'ok' },
      },
    ]
  },
}; 