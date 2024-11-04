package com.concordia.soen342;
import java.util.Vector;

public class Instructor extends User{

    //attributes
    private Vector<String> specialization = new Vector<String>();
    private Vector<String> availableCities = new Vector<String>();

    //operations
    public Instructor(){}

    public Instructor(String n, String pn, String pw, Vector<String> s, Vector<String> a){
        super(n,pn,pw,"INSTRUCTOR");
        this.specialization = s;
        this.availableCities = a;
    }

    public Vector<String> getSpecialization() {
        return this.specialization;
    }

    public void setSpecialization(Vector<String> specialization) {
        this.specialization = specialization;
    }

    public Vector<String> getAvailableCities() {
        return this.availableCities;
    }

    public void setAvailableCities(Vector<String> availableCities) {
        this.availableCities = availableCities;
    }

}