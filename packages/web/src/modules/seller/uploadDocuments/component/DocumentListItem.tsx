import React from "react";
import { Button } from "../../../componentShare/button/Button";
interface IProps {
  documentName: String;
  documentType: string;
  uploadDate?: Date;
  description: string;
}

export const DocumentListItem: React.FC<IProps> = ({
  documentName,
  documentType,
  uploadDate,
  description
}) => {
  return (
    <div>
      <div className="documentListItem-button-box">
        <div className="documentListItem-data-box">
          <div className="row">
            <div>
              <p className="title">نام مدرک</p>
              <p className="description">{documentName}</p>
            </div>
            <div>
              <p className="title"> نوع مدرک</p>
              <p className="description">{documentType}</p>
            </div>
            <div>
              <p className="title">تاریخ بارگذاری</p>
              <p className="description">{uploadDate}</p>
            </div>
          </div>
          <div className="row">
            <div>
              <p className="title">توضیحات</p>
              <p className="description">{description}</p>
            </div>
          </div>
        </div>
        <div className="buttonBox-showPicture-seller">
          <Button
            type="okay"
            padding="0.4rem 0.5rem"
            fontSize="0.8rem"
            text="مشاهده تصویر"
          />
        </div>
      </div>
    </div>
  );
};
