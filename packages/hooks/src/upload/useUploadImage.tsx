import { useMutation } from "@apollo/react-hooks";
import { useState, useCallback } from "react";
import { GQL_IMAGE_UPLOAD } from "@satek/resolvers";
// import { FieldValue } from "react-hook-form/dist/types";

type FieldValue = Record<string, any>;

type SetValue = (
  name: string,
  value: FieldValue,
  shouldValidate?: boolean
) => void | Promise<boolean>;

export type DropEvent =
  | React.DragEvent<HTMLElement>
  | React.ChangeEvent<HTMLInputElement>
  | DragEvent
  | Event;

export function useUploadImage(setValue?: SetValue, fieldName?: string) {
  const [uploadImageMutate] = useMutation(GQL_IMAGE_UPLOAD);
  const [img, setImg] = useState("");
  const [err, setErr] = useState("");
  const onDrop = useCallback(
    async <T extends File>(
      acceptedFiles: T[],
      rejectedFiles: T[],
      event: DropEvent
    ) => {
      const { data } = await uploadImageMutate({
        variables: { image: acceptedFiles[0] }
      });
      console.group("event");
      console.log(event);
      console.log("rejectedFiles", rejectedFiles);
      console.groupEnd();

      if (data && data.imageUpload && data.imageUpload.url) {
        setImg(data.imageUpload.url);
        if (setValue && fieldName) {
          setValue(fieldName, data.imageUpload.url);
        }
      } else {
        setErr("مشکلی در بارگزاری عکس وجود دارد");
      }
    },
    [uploadImageMutate]
  );
  return {
    onDrop,
    img,
    err
  };
}
