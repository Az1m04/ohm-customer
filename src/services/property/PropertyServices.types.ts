export interface CreateTokenResponse {
  expiresOn: string;
  responseMessage: string;
  accessToken: string;
  refreshToken: string;
}

export interface CallbackDetails {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface RequestCallback {
  property: string;
  customer: CallbackDetails;
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

export interface PostPropertyType {
  created_at?: string;
  _id?: string;
  lookingfor?: string;
  buildingtype?: string;
  proppertytype?: string;
  city?: string;
  projectName?: string;
  locality?: string;
  areaDetails?: string;
  area?: string;
  areaType?: string;
  price?: string;
  maintenance?: string;
  includediInPrice?: string;
  furnishedStatus?: string;
  ageOfProperty?: string;
  numberOfRooms?: string;
  numberOfBathrooms?: string;
  numberOfParkings?: string;
  viewOrFacing?: string;
  tyowerOrBlock?: string;
  totalFloorCount?: string;
  unitNo?: string;
  gymnasium?: string;
  swimmingPool?: string;
  badmintonCourt?: string;
  kidsPlayArea?: string;
  powerBackup?: string;
  centralAC?: string;
  centralWiFi?: string;
  attachedMarket?: string;
  restaurant?: string;
  security?: string;
  clubhouse?: string;
  balcony?: string;
  peSchool?: string;
  medicalFacility?: string;
  petArea?: string;
  indoorGames?: string;
  conferenceRoom?: string;
  helipad?: string;
  multiplex?: string;
  visitorsParking?: string;
  serviceElevators?: string;
  atm?: string;
  foodCourt?: string;
  serventQuarter?: string;
  studyRoom?: string;
  privatePool?: string;
  privateGym?: string;
  viewOfLandmark?: string;
  adjoiningMetroStation?: string;
  pacefulVicinity?: string;
  wideRoad?: string;
  cityCenter?: string;
  safeSecureLocality?: string;
  desparateSale?: string;
  breakthroughPrice?: string;
  quickDeal?: string;
  investmentOpportunity?: string;
  highRentalYield?: string;
  affordable?: string;
  reputedBuilder?: string;
  wellVentilated?: string;
  fullyRenovated?: string;
  vastuCompliant?: string;
  spacious?: string;
  ampleParking?: string;
  freeHold?: string;
  gatedSociety?: string;
  tastefulInteriors?: string;
  primeLocation?: string;
  luxuryLifestyle?: string;
  wellMaintained?: string;
  plentyOfSunlight?: string;
  newlyBuilt?: string;
  propertyDescription?: string;
}
