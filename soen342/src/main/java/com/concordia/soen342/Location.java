package com.concordia.soen342;
import java.util.Vector;

public class Location {
    //attributes
    private String city;
    private Vector<Space> availableSpaces = new Vector<Space>();
    private Vector<Schedule> schedule = new Vector<Schedule>();

    //operations
    public Location(){}

    public Location(String c, Vector<Space> sp, Vector<Schedule> sc){
        this.city = c;
        this.availableSpaces = sp;
        this.schedule = sc;
    }
    
}
