export const RestWareDataToPersion = (val: string): string => {
  switch (val) {
    case "activityField":
      return "زمینه فعالیت";
    case "memberCode":
      return "کد بخش";
    case "supplierName":
      return "نام تامین کننده";
    case "ceoName":
      return "مدیر عامل";
    case "companyType":
      return "نوع شرکت";
    case "personType":
      return "نوع شخصیت";
    case "activityType":
      return "نوع فعالیت";
    case "history":
      return "تاریخچه";
    case "contactInfo":
      return "اطلاعات تماس";
    case "mainOffice":
      return "آدرس دفتر اصلی";
    case "postalCode":
      return "کدپستی";
    case "phoneNumber":
      return "شماره شرکت";
    case "faxNumber":
      return "شماره فکس";
    case "email":
      return "ایمیل";
    case "productName":
      return "نام محصول";
    case "productNameEn":
      return "نام انگلیسی";
    case "productDetailsTable":
      return "جزییات جدول ساخت";
    case "companyName":
      return "نام شرکت";
    case "businessName":
      return "نام تجارتی";
    case "techNumber":
      return "کد تکنولوژی";
    case "merchandiseSpecs":
      return "مشخصات کالا";
    case "countUnit":
      return "تعداد بخش";
    case "shape":
      return "شکل";
    case "doz":
      return "دز";
    case "boxType":
      return "نوع جعبه";
    case "constructRefrence":
      return "مرجع ساخت";
    case "construcCountry":
      return "کشور سازنده";
    case "releaseRefrence":
      return "مرجع پخش";
    case "type":
      return "نوع";

    default:
      return "";
  }
};
