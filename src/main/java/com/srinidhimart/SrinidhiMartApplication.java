package com.srinidhimart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SrinidhiMartApplication {

    public static void main(String[] args) {
        SpringApplication.run(SrinidhiMartApplication.class, args);
        System.out.println("==================================================================");
        System.out.println("  Srinidhi Mart is UP and RUNNING!                                ");
        System.out.println("  Frontend & APIs: http://localhost:8080                          ");
        System.out.println("  API Docs/Endpoints: http://localhost:8080/api/products           ");
        System.out.println("==================================================================");
    }
}
