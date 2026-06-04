package com.myplan.myplan.myplan.plan.vo;

import lombok.Data;
import java.util.Date;

@Data
public class TimeBlockVO {

    private Long blockId;

    private Long planId;

    private String startTime;

    private String endTime;

    private String content;

    private String memo;

    private String status;

    private Date createdDate;
}