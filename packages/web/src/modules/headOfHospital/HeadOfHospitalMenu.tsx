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

export const HeadOfHospitalMenu: GeneralItemProps[] = [
  {
    type: "Mono",
    title: "خانه",
    icon: "ic_ic_home",
    itemPath: ""
  },
  {
    type: "Accordion",
    title: "درخواست‌ها",
    innerMenuArray: [
      {
        title: "بررسی درخواست‌ها",
        itemPath: "viewrequest"
      },
      {
        title: "ثبت درخواست جدید",
        itemPath: "SubmitNewRequest"
      },
      {
        title: "تاریخچه درخواست‌ها",
        itemPath: "historyrequest"
      },
      {
        title: "تائید پرداخت",
        itemPath: "paymentconfirmation"
      },
      {
        title: "آمار و گزارشات",
        itemPath: "systemusageguide"
      }
    ]
  },
  {
    type: "Accordion",
    title: "سازمان",
    innerMenuArray: [
      {
        title: "مدیریت واحدها",
        itemPath: "unit"
      },
      {
        title: "مدیریت کارمندان",
        itemPath: "user"
      },
      {
        title: "مدیریت کالاها",
        itemPath: "managergoods"
      }
    ]
  },
  // {
  //   type: "Accordion",
  //   title: "کالاها",
  //   innerMenuArray: [
  //     {
  //       title: "کالاهای قابل درخواست",
  //       itemPath: "ManagerGoods"
  //     }
  //   ]
  // },
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
        itemPath: "announcements"
      },
      {
        title: "راهنمای استفاده از سامانه",
        itemPath: "systemusageguide"
      }
    ]
  }
];
