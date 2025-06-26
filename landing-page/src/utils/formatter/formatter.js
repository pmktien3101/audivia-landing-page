export function formatMoney(amount) {
    const formatter = new Intl.NumberFormat('vi-VN');
    return formatter.format(Number(amount));
}