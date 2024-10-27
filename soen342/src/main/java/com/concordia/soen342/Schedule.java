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
}