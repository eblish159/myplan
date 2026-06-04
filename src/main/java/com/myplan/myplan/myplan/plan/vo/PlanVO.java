package com.myplan.myplan.myplan.plan.vo;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class PlanVO {

    private Long planId;

    private Date planDate;

    private String title;

    private String specificContent;

    private String measurableContent;

    private String achievableContent;

    private String relevantContent;

    private Date timeLimit;

    private Date createdDate;

    private Date updatedDate;

    private List<TimeBlockVO> timeBlocks;
}