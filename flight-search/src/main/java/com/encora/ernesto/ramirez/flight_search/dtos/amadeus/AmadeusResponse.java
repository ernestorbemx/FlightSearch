package com.encora.ernesto.ramirez.flight_search.dtos.amadeus;

public class AmadeusResponse<T> {

    private T data;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
