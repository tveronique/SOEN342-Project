package com.concordia.soen342;

import java.time.LocalDate;
import java.time.LocalTime;

public class Administrator extends User{
    public static Administrator admin;

    private Administrator(String n, long pn, String pw){
        super(n, pn, pw, "ADMINISTRATOR");
    }

    public static synchronized Administrator getAdmin(String n, long pn, String pw){
        if(admin == null){
            admin = new Administrator(n, pn, pw);
        }
        return admin;
    }

    public Schedule creatSchedule(String day, LocalTime startt, LocalTime endt, LocalDate start, LocalDate end){
        return new Schedule(day, startt, endt, start,end);
    }

    public Space createSpace(String type){
        return new Space(type);
    }

    public Location createLocation(String name, String city, Space space, Schedule sched){
        return new Location(name, city, space, sched);
    }

    public Offering createOffering(Location loc, Lesson l){
        Offering o = new Offering(loc, l);
        return o;
    }
}