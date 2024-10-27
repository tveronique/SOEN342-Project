package com.concordia.soen342;
import java.util.ArrayList;
import java.time.*;

public class Schedule{
    //attributes
    private String day;
    private ArrayList<String> slots = new ArrayList<>();
    private LocalDate startDate;
    private LocalDate endDate; 

    public Schedule(){};

    public Schedule(String d, ArrayList<String> s, LocalDate sd, LocalDate ed){
        this.day = d;
        this.slots = s;
        this.startDate = sd;
        this.endDate = ed;
    }

    public String getDay() {
        return this.day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public ArrayList<String> getSlots() {
        return this.slots;
    }

    public void setSlots(ArrayList<String> slots) {
        this.slots = slots;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

}