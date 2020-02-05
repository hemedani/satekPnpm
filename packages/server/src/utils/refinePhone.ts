const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
    englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const toEnglishNumbers = function(phone: string) {
    for (let i = 0; i < 10; i++) {
        phone = phone.replace(persianNumbers[i], englishNumbers[i]);
        phone = phone.replace(arabicNumbers[i], englishNumbers[i]);
    }
    return phone;
};

export function fixPrefix(phone: string): string {

    return "98" + phone.substr(phone.length-10,phone.length);
}

export function refinePhone(phone: string): string {
    //console.log(phone);
    const en = toEnglishNumbers(phone);
    const res = fixPrefix(en);
    return res;
}
