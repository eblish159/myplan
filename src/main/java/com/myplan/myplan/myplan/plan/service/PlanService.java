package com.myplan.myplan.myplan.plan.service;

import com.myplan.myplan.myplan.plan.vo.PlanVO;

import java.util.List;

import com.myplan.myplan.myplan.plan.vo.TimeBlockVO;

public interface PlanService {

    void savePlan(PlanVO planVO);

    List<PlanVO> getPlanList();

    PlanVO getTodayPlan();

    PlanVO getPlanDetail(Long planId);

    void updatePlan(Long planId, PlanVO planVO);

    void deletePlan(Long planId);

    PlanVO getPlanByDate(String planDate);

    void updateTimeBlockStatus(TimeBlockVO timeBlockVO);
}