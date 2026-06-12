package com.myplan.myplan.myplan.plan.service;

import com.myplan.myplan.myplan.plan.dao.PlanDAO;
import com.myplan.myplan.myplan.plan.vo.PlanVO;
import com.myplan.myplan.myplan.plan.vo.TimeBlockVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PlanServiceImpl implements PlanService {

    private final PlanDAO planDAO;

    @Override
    public void savePlan(PlanVO planVO) {
        planDAO.insertPlan(planVO);

        if (planVO.getTimeBlocks() != null && !planVO.getTimeBlocks().isEmpty()) {
            for (TimeBlockVO timeBlockVO : planVO.getTimeBlocks()) {
                timeBlockVO.setPlanId(planVO.getPlanId());
                planDAO.insertTimeBlock(timeBlockVO);
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlanVO> getPlanList() {
        List<PlanVO> planList = planDAO.selectPlanList();

        for (PlanVO planVO : planList) {
            List<TimeBlockVO> timeBlocks =
                    planDAO.selectTimeBlocksByPlanId(planVO.getPlanId());
            planVO.setTimeBlocks(timeBlocks);
        }

        return planList;
    }

    @Override
    @Transactional(readOnly = true)
    public PlanVO getTodayPlan() {
        PlanVO planVO = planDAO.selectTodayPlan();

        if (planVO != null) {
            List<TimeBlockVO> timeBlocks =
                    planDAO.selectTimeBlocksByPlanId(planVO.getPlanId());
            planVO.setTimeBlocks(timeBlocks);
        }

        return planVO;
    }

    @Override
    @Transactional(readOnly = true)
    public PlanVO getPlanDetail(Long planId) {
        PlanVO planVO = planDAO.selectPlanById(planId);

        if (planVO != null) {
            List<TimeBlockVO> timeBlocks =
                    planDAO.selectTimeBlocksByPlanId(planId);
            planVO.setTimeBlocks(timeBlocks);
        }

        return planVO;
    }

    @Override
    public void updatePlan(Long planId, PlanVO planVO) {
        planVO.setPlanId(planId);

        planDAO.updatePlan(planVO);

        planDAO.deleteTimeBlocksByPlanId(planId);

        if (planVO.getTimeBlocks() != null && !planVO.getTimeBlocks().isEmpty()) {
            for (TimeBlockVO timeBlockVO : planVO.getTimeBlocks()) {
                timeBlockVO.setPlanId(planId);
                planDAO.insertTimeBlock(timeBlockVO);
            }
        }
    }

    @Override
    public void deletePlan(Long planId) {
        planDAO.deleteTimeBlocksByPlanId(planId);
        planDAO.deletePlan(planId);
    }

    @Override
    @Transactional(readOnly = true)
    public PlanVO getPlanByDate(String planDate) {
        PlanVO planVO = planDAO.selectPlanByDate(planDate);

        if (planVO != null) {
            List<TimeBlockVO> timeBlocks =
                    planDAO.selectTimeBlocksByPlanId(planVO.getPlanId());
            planVO.setTimeBlocks(timeBlocks);
        }

        return planVO;
    }

    @Override
    public void updateTimeBlockStatus(TimeBlockVO timeBlockVO) {
        planDAO.updateTimeBlockStatus(timeBlockVO);
    }
}