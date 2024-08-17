import { formatDuration } from 'date-fns/formatDuration';
import { ru } from 'date-fns/locale';

export const formatSeconds = (value: number, human = false) => {
    if (human) {
        return formatDuration(
            {
                hours: Math.floor(value / 60 / 60),
                minutes: Math.floor((value / 60) % 60),
                seconds: Math.floor(value % 60),
            },
            { zero: false, locale: ru }
        );
    }

    const hours = Math.floor(value / 60 / 60);
    const minutes = Math.floor((value / 60) % 60);
    const seconds = Math.floor(value % 60);

    let result = '';

    if (hours > 0) result += `${hours}:`;
    result += `${minutes.toString().padStart(hours > 0 ? 2 : 1, '0')}:`;
    result += seconds.toString().padStart(2, '0');

    return result;
};
