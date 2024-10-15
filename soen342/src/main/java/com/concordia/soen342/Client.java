package com.concordia.soen342;
public class Client extends User{
    //attributes

    //operations
    public Client(){}

    public Client(String n, long pn, String pw){
        super(n,pn,pw, "CLIENT");
    }
}