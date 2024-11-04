package com.concordia.soen342;

public class LogInResponse {
    private String phoneNumber;
    private String role;

    public LogInResponse(String phoneNumber, String role) {
        this.phoneNumber = phoneNumber;
        this.role = role;
    }

    // Getters and setters
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

