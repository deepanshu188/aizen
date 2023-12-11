import dayjs from 'dayjs';

export const diffDays = (date: string) => {
  const diff = dayjs().diff(dayjs(date), 'day');
  if (diff !== 0) {
    return `${diff}d`;
  } else return 'today';
};

export const fromNow = (date: string) => dayjs(date).fromNow();
