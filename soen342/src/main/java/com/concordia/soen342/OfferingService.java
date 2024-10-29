package com.concordia.soen342;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OfferingService {
    @Autowired //use instead of new() because manually creating is not recommended in Spring, this instantiates this class for us
    private OfferingRepository offeringRepository;

    public List<Offering> allOfferings(){
        return (List<Offering>) offeringRepository.findAll();
    }
}
