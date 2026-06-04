package com.myplan.myplan.myplan.plan.dao;

import com.myplan.myplan.myplan.plan.vo.PlanVO;
import com.myplan.myplan.myplan.plan.vo.TimeBlockVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PlanDAO {

    // 계획 저장
    void insertPlan(PlanVO planVO);

    // 시간 블록 저장
    void insertTimeBlock(TimeBlockVO timeBlockVO);

    // 전체 계획 목록 조회
    List<PlanVO> selectPlanList();

    // 오늘 계획 조회
    PlanVO selectTodayPlan();

    // 계획 상세 조회
    PlanVO selectPlanById(Long planId);

    // 특정 계획의 시간 블록 조회
    List<TimeBlockVO> selectTimeBlocksByPlanId(Long planId);

    // 계획 수정
    void updatePlan(PlanVO planVO);

    // 기존 시간 블록 삭제
    void deleteTimeBlocksByPlanId(Long planId);

    // 계획 삭제
    void deletePlan(Long planId);

    // 특정 날짜 계획 조회
    PlanVO selectPlanByDate(String planDate);

    // 시간 블록 완료 상태 변경
    void updateTimeBlockStatus(TimeBlockVO timeBlockVO);
}