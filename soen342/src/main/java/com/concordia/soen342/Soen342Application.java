package com.concordia.soen342;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.concordia.soen342")
public class Soen342Application {

	public static void main(String[] args) {
		SpringApplication.run(Soen342Application.class, args);
	}

}
