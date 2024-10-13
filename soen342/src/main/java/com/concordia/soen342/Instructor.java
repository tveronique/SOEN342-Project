package com.concordia.soen342;
import java.util.Vector;

public class Instructor extends Person{

    //attributes
    private Vector<String> specialization = new Vector<String>();
    private Vector<String> availableCities = new Vector<String>();

    //operations
    public Instructor(){}

    public Instructor(String n, long pn, String pw, Vector<String> s, Vector<String> a){
        super(n,pn,pw,"INSTRUCTOR");
        this.specialization = s;
        this.availableCities = a;
    }
}