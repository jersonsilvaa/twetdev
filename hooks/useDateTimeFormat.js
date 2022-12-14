import { DEFAULT_LANGUAGE } from 'contants/locale'

const isDateFormatIsSupported = typeof Intl === 'undefined' && Intl.DateTimeFormat

export const formatDate = (timestamp, { language = DEFAULT_LANGUAGE } = {}) => {
    const date = new Date(timestamp)

    if (!isDateFormatIsSupported) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }

        return date.toLocaleDateString(language, options)
    }

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }

    return new Intl.DateTimeFormat(language, options).format(date)
}

export default function useDateTimeFormat(timestamp) {
    return formatDate(timestamp, { language: DEFAULT_LANGUAGE })
}