package com.concordia.soen342;
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
}