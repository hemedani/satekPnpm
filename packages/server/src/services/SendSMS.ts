import axios from "axios";
interface InputSMS {
    phone?: string | number;
    code?: string;
    msg?: string;
    phones?: [string | number];
}

type SendCustomMsgResp = [number, string];
type SendPatternResponse = number;

const PATTERN = "loginCode";
const API_KEY =
    "4C5A6F6C477A675078774C2B4943664C4A65397754754D5175574C7579466E797643534E4D6F7865596E493D";
export const sendPattern = ({ phone, code }: InputSMS): Promise<SendPatternResponse> => {
    return axios
        .post(
            `https://api.kavenegar.com/v1/${API_KEY}/verify/lookup/`,
            {},
            {
                params: { receptor: phone, token: code, template: PATTERN }
            }
        )
        .then(resp => {
            console.log(resp.data);
            return resp.data;
        });
};

export const sendCustomMsg = ({ phones, msg }: InputSMS): Promise<SendCustomMsgResp> => {
    return axios
        .post(
            `https://api.kavenegar.com/v1/${API_KEY}/sms/send.json`,
            {},
            {
                params: {
                    receptor: phones,
                    message: msg
                    // sender:,
                    // date:,
                    // localid:,
                    // hide:,
                }
            }
        )
        .then(resp => resp.data)
        .catch(err => err.response);
};
