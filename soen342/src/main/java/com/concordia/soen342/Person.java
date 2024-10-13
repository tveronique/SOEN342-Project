package com.concordia.soen342;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")  // MongoDB collection

public class Person{
    //MongoDB ID
    @Id
    private String id;

    //ATTRIBUTES
    private String name;
    private long phoneNumber;
    private String password;
    private String role;

    //OPERATIONS

    //default constructor
    public Person(){}

    //parameterized constructor
    public Person(String name, long phoneNumber, String password, String role) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
    }

    //Getters and setters
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    
}