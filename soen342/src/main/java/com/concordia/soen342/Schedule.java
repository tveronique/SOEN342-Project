package com.concordia.soen342;
import java.time.*;

public class Schedule{
    //attributes
    private String day;
    private String startTime;
    private String endTime;
    private String startDate;
    private String endDate; 

    public Schedule(){};

    //constructor
    public Schedule(String d, String st, String et, String sd, String ed){
        this.day = d;
        this.startTime = st;
        this.endTime = et;
        this.startDate = sd;
        this.endDate = ed;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    // @Override
    // public String toString() {
    //     return "Schedule [day=" + day + ", startTime=" + startTime + ", endTime=" + endTime + ", startDate=" + startDate
    //             + ", endDate=" + endDate + "]";
    // }

    

}