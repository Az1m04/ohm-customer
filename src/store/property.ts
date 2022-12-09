import { atom } from 'jotai';

import { PostPropertyType } from '../services/property/PropertyServices.types';

interface PropertyTypeType {
  type: string;
}

export interface PropertyType {
  Locality: string;
  'Property Listing for': string;
  buildingType: string;
  city: string;
  created_at: Date;
  maintenance: number;
  price: Price;
  projectName: string;
  propertyType: string;
  updated_at: Date;
  __v: number;
  _id: string;
}

export interface Price {
  paymentType: string;
}

// Create your atoms and derivatives
export const propertyTypesAtom = atom<PropertyTypeType[]>([]);

export const allPropertyAtoms = atom<PostPropertyType[]>([]);

export const propertyForm = atom<PostPropertyType>({});
