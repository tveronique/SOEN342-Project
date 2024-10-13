package com.concordia.soen342;
public class Guardian extends Client{
    //ATTRIBUTES
    private String childName;
    private int childAge;
    private String relationship;

    //OPERATIONS
    public Guardian(){}

    public Guardian(String name, long phoneNumber, String password, String childName, int childAge, String r){
        super(name, phoneNumber, password);
        this.childName = childName;
        this.childAge = childAge;
        this.relationship = r;
    }

    public String getChildName() {
        return this.childName;
    }

    public void setChildName(String childName) {
        this.childName = childName;
    }

    public int getChildAge() {
        return this.childAge;
    }

    public void setChildAge(int childAge) {
        this.childAge = childAge;
    }

    public String getRelationship() {
        return this.relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

}