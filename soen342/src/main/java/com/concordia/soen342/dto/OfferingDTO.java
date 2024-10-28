package com.concordia.soen342.dto;

public class OfferingDTO {
    private String lessonType;
    private boolean isPrivate;
    private String spaceType;
    private String locationName;
    private String city;
    private String day;
    private String startTime;
    private String endTime;
    private String startDate;
    private String endDate;

    public OfferingDTO() {
    }

    public OfferingDTO(String lessonType, Boolean isPrivate, String spaceType, String locationName, String city,
        String day, String startTime, String endTime, String startDate, String endDate) {
        this.lessonType = lessonType;
        this.isPrivate = isPrivate;
        this.spaceType = spaceType;
        this.locationName = locationName;
        this.city = city;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getLessonType() {
        return lessonType;
    }

    public void setLessonType(String lessonType) {
        this.lessonType = lessonType;
    }

    public Boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(Boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public String getSpaceType() {
        return spaceType;
    }

    public void setSpaceType(String spaceType) {
        this.spaceType = spaceType;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
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

}