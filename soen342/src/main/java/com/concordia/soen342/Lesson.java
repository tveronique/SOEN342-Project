package com.concordia.soen342;
public class Lesson{
    //attributes
    private boolean isPrivate; //if true then it's private, if false then it's group
    private String type; //swimming, yoga, etc.

    //operations
    
    public Lesson(boolean isPrivate, String type) {
        this.isPrivate = isPrivate;
        this.type = type;
    }

    //default constructor
    public Lesson(){}

    
}
