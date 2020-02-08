import jalaali from "jalaali-js";
export interface myDate {
  day: number;
  month: number;
  year: number;
}
function formt(params: number) {
  if (Math.floor(params / 10) === 0) {
    return "0" + params;
  }
  return params;
}
export const ConvertDateToMiladi = (date?: myDate | null) => {
  if (date) {
    const j = jalaali.toGregorian(date.year, date.month, date.day);

    return j.gy + "-" + formt(j.gm) + "-" + formt(j.gd) + "T00:00:00.000Z";
  }
  return;
};
export const ConvertDateToDatePicker = (date?: string) => {
  if (date) {
    const j = jalaali.toJalaali(
      parseInt(date.split("-")[0]),
      parseInt(date.split("-")[1]),
      parseInt(date.split("-")[2])
    );
    return { year: j.jy, month: j.jm, day: j.jd };
  } else {
    return { year: 0, month: 0, day: 0 };
  }
};
export const ConvertDateToShamsi = (date?: string) => {
  if (date) {
    const j = jalaali.toJalaali(
      parseInt(date.split("-")[0]),
      parseInt(date.split("-")[1]),
      parseInt(date.split("-")[2])
    );
    return j.jy + "/" + j.jm + "/" + j.jd;
  }
};
