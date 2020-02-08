interface AccordionItemProps {
  title: string;
  icon?: string;
  itemPath: string;
}
interface GeneralItemProps {
  type: "Accordion" | "Mono";
  title: string;
  icon?: string;
  itemPath?: string;
  innerMenuArray?: AccordionItemProps[];
}

export const AdminMenu: GeneralItemProps[] = [
  {
    type: "Mono",
    title: "خانه",
    icon: "ic_ic_home",
    itemPath: ""
  },
  // {
  //   type: "Accordion",
  //   title: "مدیریت اخبار و محتوا",
  //   icon: "ic_book",
  //   innerMenuArray: [
  //     {
  //       title: "دانشگاه‌ها",
  //       itemPath: ""
  //     },
  //     {
  //       title: "بیمارستان‌ها و ادارات",
  //       itemPath: ""
  //     },
  //     {
  //       title: "واحدها و بخش‌ها",
  //       itemPath: ""
  //     }
  //   ]
  // },
  {
    type: "Accordion",
    title: "مدیریت سازمان‌ها",
    icon: "ic_hospital",
    innerMenuArray: [
      {
        title: "دانشگاه‌ها",
        itemPath: "university"
      },
      {
        title: "بیمارستان‌ها و ادارات",
        itemPath: "hospital"
      },
      {
        title: "بخش‌ها",
        itemPath: "category"
      },
      {
        title: "واحدها",
        itemPath: "unit"
      }
    ]
  },
  {
    type: "Mono",
    title: "مدیریت کاربران",
    itemPath: "user",
    icon: "ic_card"
  },
  {
    type: "Accordion",
    title: "مدیریت فروشندگان",
    icon: "ic_store",
    innerMenuArray: [
      {
        title: "ویرایش و مشاهده مدارک",
        itemPath: "store"
      },
      {
        title: "درخواست‌های ثبت‌نام",
        itemPath: "registrationrequests"
      }
    ]
  },
  {
    type: "Accordion",
    title: "مدیریت کالاها",
    itemPath: "",
    icon: "ic_shopping_bag1",
    innerMenuArray: [
      {
        title: "نوع کالا سامانه",
        itemPath: "typeware"
      },
      {
        title: "کلاس کالا سامانه",
        itemPath: "classware"
      },
      {
        title: "گروه کالا سامانه",
        itemPath: "groupware"
      },
      {
        title: "مدل کالا سامانه",
        itemPath: "modelware"
      },
      {
        title: "کالاهای سامانه",
        itemPath: "ware"
      }
    ]
  },

  {
    type: "Accordion",
    title: "درخواست‌ها",
    icon: "ic_add_to_card",
    innerMenuArray: [
      {
        title: "مشاهده درخواست‌ها",
        itemPath: "viewrequesthistory"
      },
      {
        title: "آمار و گزارش‌ها",
        itemPath: ""
      }
    ]
  },
  {
    type: "Mono",
    title: "اطلاعیه‌های وبسایت",
    itemPath: "announcements",
    icon: "ic_megaphone"
  },
  {
    type: "Accordion",
    title: "پشتیبانی و پیام‌ها",
    icon: "ic_chat",
    innerMenuArray: [
      {
        title: "نوشتن پیام جدید",
        itemPath: "writenewmessage"
      },
      {
        title: "پیام‌های دریافتی",
        itemPath: ""
      },
      {
        title: "درخواست‌های راهنمایی",
        itemPath: ""
      },
      {
        title: "گزارش‌ها و شکایات",
        itemPath: ""
      }
    ]
  },
  {
    type: "Accordion",
    title: "تنظیمات سامانه",
    icon: "ic_ic_question",
    innerMenuArray: [
      {
        title: "تنظیمات اولیه",
        itemPath: "basicsettings"
      },
      {
        title: "قوانین سامانه",
        itemPath: "ruleorgan"
      }
    ]
  },
  {
    type: "Mono",
    title: "صفحه آزمایشی",
    itemPath: "test",
    icon: "ic_circle"
  }
];
