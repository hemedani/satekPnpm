import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const SAVE_ROCKET = gql`
  mutation loginWithPhone($data: LoginInput!) {
    loginWithPhone(data: $data) {
      code
    }
  }
`;
interface RocketInventory {
  code: number;
}

interface NewRocketDetails {
  phone: number;
  device: string;
}

export function NewRocketForm() {
  const [loginWithPhone, { error, data }] = useMutation<
    { loginWithPhone: RocketInventory },
    { data: NewRocketDetails }
  >(SAVE_ROCKET, {
    variables: { data: { phone: 9154685000, device: "browser" } }
  });

  console.log(data);
}
