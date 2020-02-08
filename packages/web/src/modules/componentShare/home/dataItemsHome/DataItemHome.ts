export const sellerHomeItem = [
  {
    name: "درخواست های فوری",
    isImportant: true,
    isRequest: true,
    numRequest: 5,
    subName: "درخواست"
  },
  {
    name: "درخواست های جدید",
    isImportant: false,
    isRequest: true,
    numRequest: 25,
    subName: "درخواست",
    path: "/seller/newrequests"
  },
  {
    name: "درخواست های تکمیل نشده",
    isImportant: false,
    isRequest: true,
    numRequest: 25,
    subName: "درخواست",
    path: "/seller/unfinishedrequest"
  },
  {
    name: "لیست کالاهای من",
    isImportant: false,
    isRequest: false,
    numRequest: 0,
    path: "/seller/myproductlist",
    icon: "ic_shopping_bag"
  },
  {
    name: "گزارشات",
    isImportant: false,
    isRequest: false,
    numRequest: 0,
    path: "/seller/accountingreports",
    icon: "ic_shopping_bag"
  },
  {
    name: "بارگذاری مدارک",
    isImportant: false,
    isRequest: false,
    numRequest: 0,
    path: "/seller/myproductlist",
    icon: "ic_shopping_bag"
  },
  {
    name: "پیام های کاربران",
    isImportant: false,
    isRequest: false,
    numRequest: 45,
    subName: "پیام جدید",
    path: "/seller/myproductlist",
    icon: "ic_chat"
  }
];

/////////////////////HeadHospital/////////
export const headHospitalHomeItem = [
  {
    name: "درخواست های فوری",
    isImportant: true,
    isRequest: true,
    numRequest: 5,
    subName: "درخواست"
  },
  {
    name: "درخواست های پاراکلینیک",
    isImportant: false,
    isRequest: true,
    numRequest: 25,
    subName: "درخواست",
    subRequest: [
      {
        name: "آزمایشگاه",
        numRequest: 5,
        subName: "درخواست",
        path: ""
      },
      {
        name: "رادیولوژی",
        numRequest: 5,
        subName: "درخواست",
        path: ""
      },
      {
        name: "سیتی اسکن",
        numRequest: 15,
        subName: "درخواست",
        path: ""
      },
      {
        name: "MRI",
        numRequest: 0,
        subName: "درخواست",
        path: ""
      }
    ]
  },
  {
    name: "درخواست های  اتاق های عمل",
    isImportant: false,
    isRequest: true,
    numRequest: 25,
    subName: "درخواست",
    subRequest: [
      {
        name: "جراحی عمومی",
        numRequest: 5,
        subName: "درخواست",
        path: ""
      },
      {
        name: "چشم",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      },
      {
        name: "کودکان و نوزادان",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      },
      {
        name: "ارولوژی",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      },
      {
        name: " فک و صورت",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      },
      {
        name: "پلاستیک",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      },
      {
        name: "توراکس",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      },
      {
        name: " زنان و لاپاراسکوپی",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      }
    ]
  },
  {
    name: "درخواست های درمانگاه ها",
    isImportant: false,
    isRequest: true,
    numRequest: 25,
    subName: "درخواست",
    subRequest: [
      {
        name: " مغز و اعصاب",
        numRequest: 5,
        subName: "درخواست",
        path: ""
      },
      {
        name: "درمانگاه قلب",
        numRequest: 5,
        subName: "درخواست",
        path: ""
      },
      {
        name: "دندانپزشکی",
        numRequest: 15,
        subName: "درخواست",
        path: ""
      }
    ]
  },
  {
    name: "درخواست های بخش ها",
    isImportant: false,
    isRequest: true,
    numRequest: 25,
    subName: "درخواست",
    subRequest: [
      {
        name: "اطفال",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      },
      {
        name: "اورژانس",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      },
      {
        name: "جراحی عمومی",
        numRequest: 25,
        subName: "درخواست",
        path: ""
      }
    ]
  },
  {
    name: "تایید نهایی پرداخت ها",
    isImportant: false,
    isRequest: false,
    numRequest: 0,
    path: "/headofhospital/paymentconfirmation",
    icon: "ic_shopping_bag"
  }
  // {
  //   name: "تاریخچه درخواست ها",
  //   isImportant: false,
  //   isRequest: false,
  //   numRequest: 0,
  //   path: "/headofhospital/historyrequest",
  //   icon: "ic_shopping_bag"
  // },
  // {
  //   name: "آماروگزارشات",
  //   isImportant: false,
  //   isRequest: false,
  //   numRequest: 0,
  //   path: "/headofhospital/home",
  //   icon: "ic_shopping_bag"
  // },
  // {
  //   name: "پیام های کاربران",
  //   isImportant: false,
  //   isRequest: false,
  //   numRequest: 65,
  //   subName: "پیام جدید",
  //   path: "/headofhospital/readmessagespage",
  //   icon: "ic_chat"
  // }
];

////////////////////admin

export const adminHomeItem = [
  {
    name: "لیست سازمان ها",
    icon: "ic_hospital",
    isImportant: false,
    isRequest: true,
    path: "/headofhospital/paymentconfirmation"
  },
  {
    name: "لیست درخواست ها",
    icon: "ic_add_to_card",
    isImportant: false,
    isRequest: true,
    path: "/headofhospital/paymentconfirmation"
  },
  {
    name: "لیست کالا ها",
    icon: "ic_shopping_bag",
    isImportant: false,
    isRequest: true,
    path: "/headofhospital/paymentconfirmation"
  },
  {
    name: "لیست کاربران ",
    icon: "ic_card",
    isImportant: false,
    isRequest: true,
    path: "/headofhospital/paymentconfirmation"
  },
  {
    name: "درخواست های ثبت نام",
    isImportant: false,
    isRequest: false,
    numRequest: 0,
    path: "/headofhospital/paymentconfirmation",
    icon: "ic_store"
  },
  {
    name: "آمار و گزارشات",
    isImportant: false,
    isRequest: false,
    numRequest: 0,
    path: "/headofhospital/historyrequest",
    icon: "ic_shopping_bag"
  },
  {
    name: "اطلاعیه جدید",
    isImportant: false,
    isRequest: false,
    numRequest: 0,
    path: "/headofhospital/home",
    icon: "ic_megaphone"
  },
  {
    name: "پیام های کاربران",
    isImportant: false,
    isRequest: false,
    numRequest: 65,
    subName: "پیام جدید",
    path: "/headofhospital/readmessagespage",
    icon: "ic_chat"
  }
];
