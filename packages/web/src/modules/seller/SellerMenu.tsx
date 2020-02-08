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

export const SellerMenu: GeneralItemProps[] = [
  {
    type: "Mono",
    title: "خانه",
    icon: "",
    itemPath: ""
  },
  {
    type: "Accordion",
    title: "درخواست‌ها",
    icon: "",
    innerMenuArray: [
      {
        title: "درخواست‌های جدید",
        icon: "ic_add_to_card",
        itemPath: "newrequests"
      },
      {
        title: "درخواست‌های تکمیل نشده",
        icon: "",
        itemPath: "unfinishedrequest"
      },
      {
        title: "تاریخچه درخواست‌ها",
        icon: "ic_time",
        itemPath: "historyrequest"
      }
    ]
  },
  {
    type: "Accordion",
    title: "فروشگاه",
    icon: "",
    innerMenuArray: [
      {
        title: "لیست کالاهای من",
        icon: "ic_shopping_bag1",
        itemPath: "myproductlist"
      },
      {
        title: "تخفیف‌ها",
        icon: "",
        itemPath: "offer"
      },
      {
        title: "حسابداری و گزارشات",
        icon: "",
        itemPath: "accountingreports"
      },
      {
        title: "مرکز بارگذاری مدارک",
        icon: "",
        itemPath: "uploaddocuments"
      },
      {
        title: "تنظیمات فروشگاه",
        icon: "",
        itemPath: "SettingStore"
      }
    ]
  },
  {
    type: "Accordion",
    title: "ارتباطات سامانه",
    icon: "",
    innerMenuArray: [
      {
        title: "پیام‌های کاربران",
        icon: "ic_chat",
        itemPath: "readmessagespage"
      },
      {
        title: "اطلاعیه‌های سامانه",
        icon: "ic_megaphone",
        itemPath: "announcements"
      },
      {
        title: "راهنمای استفاده از سامانه",
        icon: "ic_ic_question",
        itemPath: "systemusageguide"
      }
    ]
  }
];
