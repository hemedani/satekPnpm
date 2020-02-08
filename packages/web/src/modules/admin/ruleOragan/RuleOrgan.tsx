import React from 'react'
import { ContainerClient } from '../../componentShare/containerClient/ContainerClient'

export default function RuleOrgan() {
  return (
    <ContainerClient colorHeader="blue" textHeader="قوانین سامانه">
      <div className="ruleOrgan-admin">
        <div className="box-ruleOrgan-admin">
          <p className="box-title-ruleOrgan-admin">
            قوانین و مقررات ثبت‌نام فروشندگان
          </p>
          <textarea className="box-input-ruleOrgan-admin" />
          <button className="box-btn-ruleOrgan-admin">ذخیره قوانین</button>
        </div>
        <div className="box-ruleOrgan-admin">
          <p className="box-title-ruleOrgan-admin">
            قوانین و مقررات ثبت و تائید درخواست‌ ها
          </p>
          <textarea className="box-input-ruleOrgan-admin" />
          <button className="box-btn-ruleOrgan-admin">ذخیره قوانین</button>
        </div>
      </div>
    </ContainerClient>
  )
}
