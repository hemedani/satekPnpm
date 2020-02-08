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

export const ClientMenu: GeneralItemProps[] = [
  {
    type: "Accordion",
    title: "درخواست‌ها",
    innerMenuArray: [
      {
        title: "ثبت درخواست جدید",
        itemPath: "SubmitNewRequest"
      },
      {
        title: "تاریخچه درخواست‌ها",
        itemPath: "historyrequest"
      },
      {
        title: "تحویل گرفتن کالا",
        itemPath: "deliverygoods"
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
        itemPath: "writenewmessageclient"
      },
      {
        title: "تاریخچه پیام‌ها",
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
        itemPath: "OrganizationAnnouncements"
      },
      {
        title: "راهنمای استفاده از سامانه",
        itemPath: "systemusageguide"
      }
    ]
  }
];
