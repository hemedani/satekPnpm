export interface UniversityProps {
  image?: string;
  university: string;
  province: string;
  id: string;
}

export interface HospitalProps {
  image?: string;
  hospital: string;
  university?: string;
  province: string;
  id?: string;
}

export interface CategoryProps {
  path: string;
  category: string;
  hospital: string;
  university: string;
  province: string;
  city: String;
  id: string;
}

export interface UnitProps {
  path: string;
  image?: string;
  unit: string;
  hospital: string;
  university: string;
  province: string;
  id: string;
}

export interface StoreProps {
  path: string;
  image?: string;
  name: string;
  storeName: string;
  phone: string;
  province: string;
  city: string;
  id: string;
}

export interface GoodProps {
  nameFa: string;
  nameEn?: string;
  company?: string;
  type: string;
  maximumCost?: string;
  id: string;
}

export interface UserProps {
  image?: string;
  name: string;
  familyName: string;
  phone: number | string;
  hospital: string;
  unitedState?: string;
  path: string;
  id: string;
}
