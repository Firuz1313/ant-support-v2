export const channelEditorDeleteTutorial = [
  {
    id: 'step-1',
    targetSelector: '.channel-editor-icon',
    text: 'Выберите редактор каналов. Чтобы выбрать — нажмите OK на пульте.',
    showPrev: false,
    showNext: true,
    autoAction: 'selectChannelEditor',
  },
  {
    id: 'step-2',
    targetSelector: '.modal-channel-editor',
    text: 'Открылось окно. Чтобы удалить все каналы — выберите «Удалить всё».',
    showPrev: true,
    showNext: true,
    autoAction: 'navigateToDeleteAll',
  },
  {
    id: 'step-3',
    targetSelector: '.modal-delete-all',
    text: 'Теперь нажмите ОК на пульте для подтверждения.',
    showPrev: true,
    showNext: true,
    autoAction: 'confirmDeleteAll',
  },
  {
    id: 'final',
    text: 'Обучение завершено!',
    isFinal: true,
    showPrev: false,
    showNext: false,
  },
]; 