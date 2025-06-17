package com.encora.ernesto.ramirez.flight_search.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateRangeValidator.class)
@Documented
public @interface ValidDateRange {
    String message() default "End date must not be before start date";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}