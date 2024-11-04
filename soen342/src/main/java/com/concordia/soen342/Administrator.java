package com.concordia.soen342;

public class Administrator extends User{
    public static Administrator admin;

    private Administrator(String n, String pn, String pw){
        super(n, pn, pw, "ADMINISTRATOR");
    }

    public static Administrator getAdmin(String n, String pn, String pw){
        if(admin == null){
            admin = new Administrator(n, pn, pw);
        }
        return admin;
    }
}