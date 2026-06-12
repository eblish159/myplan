package com.myplan.myplan;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.myplan.myplan.myplan.plan.dao")
public class MyplanApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyplanApplication.class, args);
    }
}