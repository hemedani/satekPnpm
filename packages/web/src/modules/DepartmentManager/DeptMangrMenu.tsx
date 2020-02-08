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

export const DeptManageMenu: GeneralItemProps[] = [
  // {
  //   type: "Mono",
  //   title: "خانه",
  //   icon: "ic_ic_home",
  //   itemPath: ""
  // },
  {
    type: "Accordion",
    title: "درخواست‌ها",
    innerMenuArray: [
      {
        title: "بررسی درخواست‌ها",
        itemPath: "viewrequest"
      },
      {
        title: "تاریخچه درخواست‌ها",
        itemPath: "historyrequestdepmanager"
      },
      {
        title: "ثبت درخواست جدید",
        itemPath: "submitnewrequest"
      },
      {
        title: "آمار و گزارشات",
        itemPath: ""
      }
    ]
  },
  {
    type: "Accordion",
    title: "کارمندان",
    innerMenuArray: [
      {
        title: "مدیریت کارمندان",
        itemPath: "usermanagement"
      }
    ]
  },
  {
    type: "Accordion",
    title: "کالاها",
    innerMenuArray: [
      {
        title: "کالاهای قابل درخواست",
        itemPath: "ManagerGoods"
      },
      {
        title: "کالاهای محبوب من",
        itemPath: "HighlyUsedGoods"
      }
    ]
  },
  {
    type: "Accordion",
    title: "پیام های کاربران",
    innerMenuArray: [
      {
        title: "نوشتن پیام جدید",
        itemPath: "writemessage"
      },
      {
        title: "پیام های کاربران",
        itemPath: "readmessagespage"
      }
    ]
  },
  {
    type: "Accordion",
    title: "ارتباطات سامانه",
    innerMenuArray: [
      {
        title: "اطلاعیه های سامانه",
        itemPath: "announcementsdepmanger"
      },
      {
        title: "راهنمای استفاده از سامانه",
        itemPath: "systemusageguide"
      }
    ]
  }
];
