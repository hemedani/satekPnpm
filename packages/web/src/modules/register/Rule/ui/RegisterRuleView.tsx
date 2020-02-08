import { useCreateStoreMutate } from "@satek/hooks";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { client } from "../../../../Apollo";
import { Button } from "../../../componentShare/button/Button";
import { ContainerRegister } from "../../ComponentShare/ContainerRegister";

interface Props extends RouteComponentProps {}

export const RegisterRuleView: React.FC<Props> = ({ history }) => {
  const { handleSubmit } = useForm();

  const onSubmit = handleSubmit(async variables => {
    let registerStore: [object] = JSON.parse(localStorage.getItem("register")!);
    if (!accept) {
      return;
    }
    let total: any;
    if (registerStore) {
      total = registerStore.reduce((total, reg) => {
        total = { ...total, ...reg };

        return total;
      }, {});
    }
    variables = total!;
    console.log(variables);
    delete variables.codeCeoContact;
    delete variables.codeContact;
    delete variables.phoneContact;
    delete variables.phoneCeoContact;
    variables = { variables };

    console.log(variables);

    try {
      await createStoreMutate(variables);
      localStorage.removeItem("register");
      history.push("/register/finalapproval");
    } catch (e) {
      console.log(e);
    }
  });

  const { createStoreMutate, result } = useCreateStoreMutate({}, client);
  const [accept, setAccept] = useState(false);
  function handelChange() {
    setAccept(!accept);
  }
  return (
    <ContainerRegister
      btn={false}
      btnName="مرحله بعدی"
      title="ثبت اطلاعات هویتی"
    >
      <form onSubmit={onSubmit} className="formRegisterStore">
        <div className="containerRegisterRule">
          <div className="itemsRegisterRule">
            <div className="headerRegisterRule">
              <h3 className="textHeaderRegisterRule">
                قوانین و مقررات فروش در سامانه
              </h3>
            </div>
            {console.log(result.loading, "slam man be to")}
            <div className="textAndBtnRegisterRule">
              <p className="textRegisterRule">
                کوتاهی قد یکی از دغدغه‌های اصلی خانواده‌ها در جوامع امروزی است
                که برای رفع این مشکل معمولا خانواده‌ها به روش‌های درمانی مختلفی
                روی می‌آورند. داشتن قد بلند نه تنها یک مزیت محسوب می شود، بلکه
                در حوزه روانشناسی افراد بلند قد از اعتماد به نفس بالاتری
                برخوردارند و در حوزه علوم شناختی و یادگیری‌ ثابت شده که افراد
                بلند قد اطلاعات بیشتری را می‌توانند از محیط اطراف خود دریافت
                کنند، جالب است بدانید که ماساژ تاثیر چشمگیری بر رشد قد دارد؛
                ماساژ کف پا به خصوص انگشت شست پا روشی ساده و جالب برای افزایش قد
                است. این کار سبب افزایش هورمون رشد و در نتیجه افزایش قد می‌شود.
                کوتاهی قد یکی از دغدغه‌های اصلی خانواده‌ها در جوامع امروزی است
                که برای رفع این مشکل معمولا خانواده‌ها به روش‌های درمافزایشزایش
                قد می‌شود. گزگز کردن پا یا خواب رفتن انگشتان پا بیشتر تحت تاثیر
                عوامل روانی، بروز فشار ذهنی و غیره رخ می دهد و ممکن است شدید یا
                خفیف باشد. برخی اوقات نیز خواب رفتن پا به دلیل ثابت بودن بدن در
                یک وضعیت به مدت طولانی رخ می دهد؛ برای درمان بی‌حسی انگشت شست
                پا: ۵ گرم‏ گل نیلوفر، ۵ گرم‏ شاه‏تره، ۵ گرم‏ تاجریزى، ۵ گرم‏
                پوست هلیله زرد و۱۰ گرم‏ هلیله سیاه را بکوبید و پودر نرم آن را در
                ۲۵۰ گرم عسل بریزید؛ روزى سه قاشق مرباخورى، در این بیمارى را در
                آب یا شیر مصرف کنید.
              </p>
              <div className="checkBox-RegisterRule">
                <input
                  checked={accept}
                  onChange={handelChange}
                  type="checkbox"
                  name="accept"
                />
                <p className="text-checkBox-RegisterRule">
                  قوانین را خواندم و آن را پذیرفتم
                </p>
              </div>
              <div className="BoxbtnRegisterRule">
                <Button
                  text="قوانین را پذیرفتم"
                  padding="0rem 1rem"
                  fontSize="0.8rem"
                  height="2rem"
                  mainType="submit"
                  isLoading={result.loading}
                  widthLoader="5rem"
                  type={accept ? "main" : "disable"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </ContainerRegister>
  );
};
