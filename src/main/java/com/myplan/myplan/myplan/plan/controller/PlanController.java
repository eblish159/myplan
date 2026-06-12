package com.myplan.myplan.myplan.plan.controller;

import com.myplan.myplan.myplan.plan.service.PlanService;
import com.myplan.myplan.myplan.plan.vo.PlanVO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.myplan.myplan.myplan.plan.vo.TimeBlockVO;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://myplan-mu.vercel.app"
})
public class PlanController {

    private final PlanService planService;

    @PostMapping
    public String savePlan(@RequestBody PlanVO planVO) {
        planService.savePlan(planVO);
        return "계획이 저장되었습니다.";
    }

    @GetMapping
    public List<PlanVO> getPlanList() {
        return planService.getPlanList();
    }

    @GetMapping("/today")
    public PlanVO getTodayPlan() {
        return planService.getTodayPlan();
    }

    @GetMapping("/{planId}")
    public PlanVO getPlanDetail(@PathVariable Long planId) {
        return planService.getPlanDetail(planId);
    }

    @PutMapping("/{planId}")
    public String updatePlan(
            @PathVariable Long planId,
            @RequestBody PlanVO planVO
    ) {
        planService.updatePlan(planId, planVO);
        return "계획이 수정되었습니다.";
    }

    @DeleteMapping("/{planId}")
    public String deletePlan(@PathVariable Long planId) {
        planService.deletePlan(planId);
        return "계획이 삭제되었습니다.";
    }

    @GetMapping("/date/{planDate}")
    public PlanVO getPlanByDate(@PathVariable String planDate) {
        return planService.getPlanByDate(planDate);
    }

    @PutMapping("/time-blocks/{blockId}/status")
    public String updateTimeBlockStatus(
            @PathVariable Long blockId,
            @RequestBody TimeBlockVO timeBlockVO
    ) {
        timeBlockVO.setBlockId(blockId);
        planService.updateTimeBlockStatus(timeBlockVO);
        return "시간 블록 상태가 변경되었습니다.";
    }
}