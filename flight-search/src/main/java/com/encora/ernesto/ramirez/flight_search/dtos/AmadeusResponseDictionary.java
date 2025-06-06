package com.encora.ernesto.ramirez.flight_search.dtos;

public class AmadeusResponseDictionary<T> extends AmadeusResponse<T> {

    private Dictionaries dictionaries;

    public Dictionaries getDictionaries() {
        return dictionaries;
    }

    public void setDictionaries(Dictionaries dictionaries) {
        this.dictionaries = dictionaries;
    }
}
