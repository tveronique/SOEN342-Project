package com.concordia.soen342;

public class Location {
    //attributes
    private String name;
    private String city;
    private Space space = new Space();
    private Schedule schedule = new Schedule();

    //operations
    public Location(){}

    public Location(String name, String c, Space sp, Schedule sc){
        this.name = name;
        this.city = c;
        this.space = sp;
        this.schedule=sc;
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


    public Space getSpace() {
        return this.space;
    }

    public void setSpace(Space space) {
        this.space = space;
    }

    public Schedule getSchedule() {
        return this.schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

}
