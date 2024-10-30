package com.concordia.soen342;
public class Space {
    //attributes
    private String type;
    private Location location;

    //operations
    public Space(){}

    public Space(String t, Location l){
        this.type = t;
        this.location = l;
    }


    public Space(String t){
        this.type = t;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // public Location getLocation() {
    //     return this.location;
    // }

    // public void setLocation(Location location) {
    //     this.location = location;
    //}

}