import UAParser from 'ua-parser-js';

export type DeviceType = 'console' | 'mobile' | 'tablet' | 'smarttv' | 'wearable' | 'embedded' | 'unknown';

export type Browser =
    | 'Amaya'
    | 'Android Browser'
    | 'Arora'
    | 'Avant'
    | 'Baidu'
    | 'Blazer'
    | 'Bolt'
    | 'Camino'
    | 'Chimera'
    | 'Chrome'
    | 'Chromium'
    | 'Comodo Dragon'
    | 'Conkeror'
    | 'Dillo'
    | 'Dolphin'
    | 'Doris'
    | 'Edge'
    | 'Epiphany'
    | 'Fennec'
    | 'Firebird'
    | 'Firefox'
    | 'Flock'
    | 'GoBrowser'
    | 'iCab'
    | 'ICE Browser'
    | 'IceApe'
    | 'IceCat'
    | 'IceDragon'
    | 'Iceweasel'
    | 'IE [Mobile]'
    | 'Iron'
    | 'Jasmine'
    | 'K-Meleon'
    | 'Konqueror'
    | 'Kindle'
    | 'Links'
    | 'Lunascape'
    | 'Lynx'
    | 'Maemo'
    | 'Maxthon'
    | 'Midori'
    | 'Minimo'
    | 'MIUI Browser'
    | '[Mobile] Safari'
    | 'Mosaic'
    | 'Mozilla'
    | 'Netfront'
    | 'Netscape'
    | 'NetSurf'
    | 'Nokia'
    | 'OmniWeb'
    | 'Opera [Mini/Mobi/Tablet]'
    | 'Phoenix'
    | 'Polaris'
    | 'QQBrowser'
    | 'RockMelt'
    | 'Silk'
    | 'Skyfire'
    | 'SeaMonkey'
    | 'SlimBrowser'
    | 'Swiftfox'
    | 'Tizen'
    | 'UCBrowser'
    | 'Vivaldi'
    | 'w3m'
    | 'Yandex'
    | 'Unknown';

export type Engine =
    | 'Amaya'
    | 'Blink'
    | 'EdgeHTML'
    | 'Flow'
    | 'Gecko'
    | 'Goanna'
    | 'iCab'
    | 'KHTML'
    | 'LibWeb'
    | 'Links'
    | 'Lynx'
    | 'NetFront'
    | 'NetSurf'
    | 'Presto'
    | 'Tasman'
    | 'Trident'
    | 'w3m'
    | 'WebKit'
    | 'Unknown';

export type OS = 'iOS' | 'Android' | 'Unknown';

export const getDeviceType = (userAgent?: string | null): DeviceType => {
    try {
        return new UAParser(userAgent ?? window.navigator.userAgent).getDevice().type as DeviceType;
    } catch {
        return 'unknown';
    }
};

export const getBrowser = (userAgent?: string | null): Browser => {
    try {
        return new UAParser(userAgent ?? window.navigator.userAgent).getBrowser().name as Browser;
    } catch {
        return 'Unknown';
    }
};

export const getEngine = (userAgent?: string | null): Engine => {
    try {
        // fixme: find out why window throws an error on safari
        return new UAParser(userAgent ?? window.navigator.userAgent).getEngine().name as Engine;
    } catch {
        return 'Unknown';
    }
};

export const getOS = (userAgent?: string | null): OS => {
    try {
        return new UAParser(userAgent ?? window.navigator.userAgent).getOS().name as OS;
    } catch {
        return 'Unknown';
    }
};
