import { create } from "zustand";
import type { Dictionary, FlightOffer } from "../types";

export interface FlightStore {
  flight?: FlightOffer;
  dictionaries?: Dictionary;
  setFlight: (data?: FlightOffer) => unknown;
  setDictionaries: (data?: Dictionary) => unknown;
}

export const useFlightStore = create<FlightStore>((set) => ({
  setFlight(data) {
    set({ flight: data });
  },
  flight: undefined,
  setDictionaries(data) {
    set({ dictionaries: data });
  },
  dictionaries: undefined,
}));
