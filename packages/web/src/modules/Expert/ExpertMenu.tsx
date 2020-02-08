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

export const ExpertMenu: GeneralItemProps[] = [
  {
    type: "Accordion",
    title: "درخواست‌ها",
    innerMenuArray: [
      {
        title: "بررسی درخواست",
        itemPath: ""
      },
      {
        title: "تاریخچه درخواست‌ها",
        itemPath: "historyrequest"
      }
    ]
  },
  {
    type: "Accordion",
    title: "پیام های کاربران",
    innerMenuArray: [
      {
        title: "نوشتن پیام جدید",
        itemPath: "systemusageguide"
      },
      {
        title: "تاریخچه پیام‌ها",
        itemPath: "systemusageguide"
      }
    ]
  },
  {
    type: "Accordion",
    title: "ارتباطات سامانه",
    innerMenuArray: [
      {
        title: "اطلاعیه های سامانه",
        itemPath: "systemusageguide"
      },
      {
        title: "راهنمای استفاده از سامانه",
        itemPath: "systemusageguide"
      }
    ]
  }
];
