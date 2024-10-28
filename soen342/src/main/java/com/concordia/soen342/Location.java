package com.concordia.soen342;
import java.util.Vector;

public class Location {
    //attributes
    private String name;
    private String city;
    private Vector<Space> availableSpaces = new Vector<Space>();
    private Vector<Schedule> schedule = new Vector<Schedule>();

    //operations
    public Location(){}

    public Location(String name, String c, Space sp, Schedule sc){
        this.name = name;
        this.city = c;
        availableSpaces.add(sp);
        schedule.add(sc);
    }


    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Vector<Space> getAvailableSpaces() {
        return this.availableSpaces;
    }

    public void setAvailableSpaces(Vector<Space> availableSpaces) {
        this.availableSpaces = availableSpaces;
    }

    public Vector<Schedule> getSchedule() {
        return this.schedule;
    }

    public void setSchedule(Vector<Schedule> schedule) {
        this.schedule = schedule;
    }

    public void addSchedule(Schedule s){
        schedule.add(s);
    }

    public void addSpace(Space s){
        availableSpaces.add(s);
    }
}
