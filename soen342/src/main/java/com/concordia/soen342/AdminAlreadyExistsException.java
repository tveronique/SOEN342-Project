package com.concordia.soen342;

public class AdminAlreadyExistsException extends RuntimeException{
    public AdminAlreadyExistsException(String message) {
        super(message);
    }
}
