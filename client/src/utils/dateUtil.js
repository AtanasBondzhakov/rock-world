export const parseDateString = (dateStr) => {
    const [day, month, year] = dateStr.split('.');

    return `${year}-${month}-${day}`;
}

export const formatDateString = (dateStr) => {
    const [year, month, day] = dateStr.split('-');

    return `${day}.${month}.${year}`;
}