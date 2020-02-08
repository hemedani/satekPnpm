import { useCitiesQuery, useDeleteCityMutate } from "@satek/hooks";
import { getCities_getCities } from "@satek/resolvers";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { client } from "../../../../../Apollo";
import { Button } from "../../../../componentShare/button/Button";
import { Container } from "../../../../componentShare/container/Container";
import { CustomError } from "../../../../componentShare/customError/CustomError";
import { Input } from "../../../../componentShare/Input/Input";
import { LabelGeneral } from "../../../../componentShare/labels/LabelGeneral";
import { Loader } from "../../../../componentShare/loader/Loader";

interface Props {
  className?: string;
}

const Parse: React.FC<{ data: getCities_getCities[] }> = ({ data }) => {
  const { deleteCityMutate, setId } = useDeleteCityMutate({}, client);
  return (
    <>
      {data.map(city => (
        <LabelGeneral
          key={city.id}
          name={city.name}
          onClick={() => {
            setId(city.id);
            deleteCityMutate({ variables: { id: city.id } });
          }}
        />
      ))}
    </>
  );
};

export const CityList: React.FC<Props> = ({ className }) => {
  const [Filter, setFilter] = useState({ document: "" });
  const [OnSpace, setOnSpace] = useState(false);

  const { Response } = useCitiesQuery(
    { error: CustomError, loading: Loader, parsing: Parse },
    { document: Filter.document },
    client
  );

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.charCode === 32 && setOnSpace(true);
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    OnSpace === true && setFilter({ document: event.target.value });
  };
  useEffect(() => {}, [Filter]);

  return (
    <Container
      title="شهرها"
      className={classNames("cities-box-cnt", className)}
      childStyle={{ padding: "0 .7rem" }}
    >
      <div className="top-bar">
        <Input
          title="جستجو :"
          onChange={handleOnChange}
          onKeyPress={handleOnKeyPress}
          titleStyle={{ fontSize: ".7rem", width: "3rem" }}
          size="medium"
          placeholder="شهر خود را وارد نمائید"
        />
        <Button
          to="/admin/basicsettings/addcity"
          text="افزودن شهر جدید"
          fontSize=".75rem"
          padding=".5rem 1.5rem"
          type="main"
        />
      </div>
      <div className="bottom-bar">
        <div className="responses">{Response}</div>
      </div>
    </Container>
  );
};
