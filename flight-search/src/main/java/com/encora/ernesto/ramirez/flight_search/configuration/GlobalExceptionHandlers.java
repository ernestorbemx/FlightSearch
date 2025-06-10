package com.encora.ernesto.ramirez.flight_search.configuration;

import com.encora.ernesto.ramirez.flight_search.dtos.responses.BadRequestResponse;
import com.encora.ernesto.ramirez.flight_search.dtos.responses.ValidationErrorResponse;
import com.encora.ernesto.ramirez.flight_search.exceptions.AmadeusBadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandlers {
    @ExceptionHandler(AmadeusBadRequestException.class)
    public ResponseEntity<BadRequestResponse> handleBadRequest(AmadeusBadRequestException ex) {
        return ResponseEntity.badRequest().body(new BadRequestResponse(ex.getMessage(), ex.getErrors()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(new ValidationErrorResponse("Error while validating dto", errors));
    }
}
