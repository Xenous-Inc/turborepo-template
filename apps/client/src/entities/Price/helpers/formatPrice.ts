export const formatPrice = (value: number, withCurrency?: boolean) => {
    const [rubles = '0', pennies] = value.toString().split('.');

    return `${rubles.split(/(?=(?:...)*$)/).join(' ')}`
        .concat(pennies ? `.${pennies}` : '')
        .concat(withCurrency ? ' ₽' : '');
};
