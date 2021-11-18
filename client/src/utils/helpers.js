export const getYear = (unix_time) => {
    const date = new Date(unix_time * 1000);

    return date.getFullYear();
}