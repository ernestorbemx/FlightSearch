package com.encora.ernesto.ramirez.flight_search.dtos;

import java.util.List;

public class FlightPrice {
    private double grandTotal;
    private String billingCurrency;
    private String currency;
    private double total;
    private double base;
    private List<Fee> fees;
    private List<Tax> taxes;
    private double refundableTaxes;

    public List<Fee> getFees() {
        return fees;
    }

    public void setFees(List<Fee> fees) {
        this.fees = fees;
    }

    public List<Tax> getTaxes() {
        return taxes;
    }

    public void setTaxes(List<Tax> taxes) {
        this.taxes = taxes;
    }

    public double getRefundableTaxes() {
        return refundableTaxes;
    }

    public void setRefundableTaxes(double refundableTaxes) {
        this.refundableTaxes = refundableTaxes;
    }

    public double getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(double grandTotal) {
        this.grandTotal = grandTotal;
    }

    public String getBillingCurrency() {
        return billingCurrency;
    }

    public void setBillingCurrency(String billingCurrency) {
        this.billingCurrency = billingCurrency;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public double getBase() {
        return base;
    }

    public void setBase(double base) {
        this.base = base;
    }
}
