export interface Airport {
  type: "location";
  subType: "AIRPORT";
  name: string;
  id: string;
  iataCode: string;
}

export interface FlightOfferRequest {
  departureAirport: string;
  arrivalAirport?: string;
  departureDate: string;
  returnDate?: string;
  currency: string;
  numberAdults: number;
  nonStop: boolean;
}

export interface FlightOffer {
  id: string;
  source: string;
  numberOfBookableSeats: number;
  itineraries: Itineraries[];
  price: FlightPrice;
  travelerPricings: TravelerPricing[];
}

export interface FlightPrice {
  grandTotal: number;
  billingCurrency: string;
  currency: string;
  total: number;
  base: number;
  fees?: Fee[];
  taxes?: Tax[];
}

export interface Fee {
  amount: number;
  type: string;
}

export interface Tax {
  amount: number;
  code: string;
}

export interface Itineraries {
  duration: string;
  segments: Segments[];
}

export interface Segments {
  id: string;
  numberOfStops: number;
  departure: FlightEndpoint;
  arrival: FlightEndpoint;
  carrierCode: string;
  operating: OperatingAircraft;
  stops?: FlightStop[];
  aircraft: Aircraft;
  number: number;
  duration: string;
}

export interface OperatingAircraft {
  carrierCode: string;
}

export interface Aircraft {
  code: string;
}

export interface FlightEndpoint {
  iataCode: string;
  terminal?: string;
  at: string;
}

export interface FlightStop {
  description: string;
  iataCode: string;
  duration: string;
  arrivalAt: string;
  departureAt: string;
}

export interface TravelerPricing {
  price: FlightPrice;
  travelerType: string;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  class: string;
  isAllotment: boolean;
  includedCheckedBags?: BaggageAllowance;
  includedCabinBags?: BaggageAllowance;
  amenities?: Amenity[];
}

export interface Amenity {
  description: string;
  isChargeable: boolean;
  amenityType: string;
}

export interface BaggageAllowance {
  quantity: number;
  weight: number;
  weightUnit: string;
}

export interface Dictionary {
  locations: Record<string, Airport>;
  aircraft: Record<string, string>;
  currencies: Record<string, string>;
  carriers: Record<string, string>;
}

export interface AmadeusResponse<T> {
  data: T;
}

export interface AmadeusResponseMeta<T> extends AmadeusResponse<T> {
  dictionaries: Dictionary;
}
