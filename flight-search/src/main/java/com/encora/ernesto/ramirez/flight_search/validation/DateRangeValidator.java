package com.encora.ernesto.ramirez.flight_search.validation;
import com.encora.ernesto.ramirez.flight_search.dtos.body.FlightSearchDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DateRangeValidator implements ConstraintValidator<ValidDateRange, FlightSearchDto> {

    @Override
    public boolean isValid(FlightSearchDto dto, ConstraintValidatorContext context) {
        if (dto == null || dto.getDepartureDate() == null || dto.getReturnDate() == null) {
            return true; // Let @NotNull handle nulls if needed
        }
        return !dto.getReturnDate().isBefore(dto.getDepartureDate());
    }
}
