import { useEffect, useState } from "react";
import { getPlans, deletePlan } from "../api/planApi";

import PlanDetailModal from "../components/modal/PlanDetailModal";

import "./PlanListPage.css";

function PlanListPage({ goEditPage }) {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await getPlans();
      setPlans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removePlan = async (planId) => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePlan(planId);
      loadPlans();
    } catch (error) {
      console.log(error);
      alert("삭제 실패");
    }
  };

  return (
    <div className="list-page">
      <h2>계획 목록</h2>
      <p>저장한 계획을 확인하세요.</p>

      {plans.length === 0 ? (
        <div className="empty-list">
          <div>📝</div>
          <h3>저장된 계획이 없습니다.</h3>
          <p>새 계획을 작성해보세요.</p>
        </div>
      ) : (
        <div className="plan-list">
          {plans.map((plan) => {
            const total = plan.timeBlocks?.length || 0;

            const done =
              plan.timeBlocks?.filter((block) => block.status === "DONE")
                .length || 0;

            const percent =
              total === 0 ? 0 : Math.round((done / total) * 100);

            return (
              <div className="plan-card" key={plan.planId}>
                <div className="plan-top">
                  <div>
                    <h3>{plan.title}</h3>
                    <span>{plan.planDate?.substring(0, 10)}</span>
                  </div>

                  <div className="card-actions">
                    <button
                      className="view-btn"
                      onClick={() => setSelectedPlan(plan)}
                    >
                      보기
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => goEditPage(plan)}
                    >
                      수정
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => removePlan(plan.planId)}
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <div className="list-progress">
                  <div className="list-progress-info">
                    <span>진행률 {percent}%</span>
                    <small>
                      {done}/{total} 완료
                    </small>
                  </div>

                  <div className="list-progress-bar">
                    <div
                      className="list-progress-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="block-list">
                  {plan.timeBlocks?.map((block) => (
                    <div
                      className={
                        block.status === "DONE" ? "block block-done" : "block"
                      }
                      key={block.blockId}
                    >
                      <div>
                        <span className="block-time">
                          ⏰ {block.startTime}-{block.endTime}
                        </span>

                        <span className="block-content">{block.content}</span>
                      </div>

                      <span
                        className={
                          block.status === "DONE"
                            ? "list-status done-status"
                            : "list-status todo-status"
                        }
                      >
                        {block.status === "DONE" ? "완료" : "진행 전"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedPlan && (
        <PlanDetailModal
          plan={selectedPlan}
          closeModal={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}

export default PlanListPage;