import { useEffect, useState } from "react";
import { savePlan, updatePlan } from "../api/planApi";
import "./CreatePlanPage.css";

function CreatePlanPage({ setActivePage, editPlan, setEditPlan }) {
  const [plan, setPlan] = useState({
    planDate: "",
    title: "",
    specificContent: "",
    measurableContent: "",
    achievableContent: "",
    relevantContent: "",
    timeLimit: "",
    timeBlocks: [{ startTime: "", endTime: "", content: "", memo: "" }],
  });

  useEffect(() => {
    if (editPlan) {
      setPlan({
        planDate: editPlan.planDate?.substring(0, 10) || "",
        title: editPlan.title || "",
        specificContent: editPlan.specificContent || "",
        measurableContent: editPlan.measurableContent || "",
        achievableContent: editPlan.achievableContent || "",
        relevantContent: editPlan.relevantContent || "",
        timeLimit: editPlan.timeLimit?.substring(0, 10) || "",
        timeBlocks:
          editPlan.timeBlocks?.length > 0
            ? editPlan.timeBlocks.map((block) => ({
                startTime: block.startTime || "",
                endTime: block.endTime || "",
                content: block.content || "",
                memo: block.memo || "",
              }))
            : [{ startTime: "", endTime: "", content: "", memo: "" }],
      });
    }
  }, [editPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value });
  };

  const handleTimeChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...plan.timeBlocks];
    list[index][name] = value;
    setPlan({ ...plan, timeBlocks: list });
  };

  const addTimeBlock = () => {
    setPlan({
      ...plan,
      timeBlocks: [
        ...plan.timeBlocks,
        { startTime: "", endTime: "", content: "", memo: "" },
      ],
    });
  };

  const removeTimeBlock = (index) => {
    const list = plan.timeBlocks.filter((_, i) => i !== index);
    setPlan({
      ...plan,
      timeBlocks:
        list.length > 0
          ? list
          : [{ startTime: "", endTime: "", content: "", memo: "" }],
    });
  };

  const submitPlan = async () => {
    if (!plan.planDate) {
      alert("계획 날짜를 선택해주세요.");
      return;
    }

    if (!plan.title.trim()) {
      alert("목표 제목을 입력해주세요.");
      return;
    }

    try {
      if (editPlan) {
        await updatePlan(editPlan.planId, plan);
        alert("계획 수정 완료!");
      } else {
        await savePlan(plan);
        alert("계획 저장 완료!");
      }

      setEditPlan(null);
      setActivePage("list");
    } catch (error) {
      console.log(error);
      alert("저장 실패");
    }
  };

  const cancelEdit = () => {
    setEditPlan(null);
    setActivePage("list");
  };

  return (
    <div className="create-page">
      <div className="create-panel">
        <div className="create-top">
          <div>
            <h2>{editPlan ? "계획 수정" : "새 계획 만들기"}</h2>
            <p>SMART 목표와 하루 시간 계획을 작성하세요.</p>
          </div>

          {editPlan && (
            <button className="cancel-btn" onClick={cancelEdit}>
              취소
            </button>
          )}
        </div>

        <div className="basic-grid">
          <div>
            <label>계획 날짜</label>
            <input
              type="date"
              name="planDate"
              value={plan.planDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>마감일</label>
            <input
              type="date"
              name="timeLimit"
              value={plan.timeLimit}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>목표 제목</label>
        <input
          name="title"
          value={plan.title}
          placeholder="목표 제목을 입력하세요"
          onChange={handleChange}
        />

        <h3>SMART 목표</h3>

        <div className="smart-row">
          <span className="smart-badge s">S</span>
          <strong>Specific</strong>
          <textarea
            name="specificContent"
            value={plan.specificContent}
            placeholder="무엇을 할 것인가요?"
            onChange={handleChange}
          />
        </div>

        <div className="smart-row">
          <span className="smart-badge m">M</span>
          <strong>Measurable</strong>
          <textarea
            name="measurableContent"
            value={plan.measurableContent}
            placeholder="완료 기준은 무엇인가요?"
            onChange={handleChange}
          />
        </div>

        <div className="smart-row">
          <span className="smart-badge a">A</span>
          <strong>Achievable</strong>
          <textarea
            name="achievableContent"
            value={plan.achievableContent}
            placeholder="현실적으로 달성 가능한가요?"
            onChange={handleChange}
          />
        </div>

        <div className="smart-row">
          <span className="smart-badge r">R</span>
          <strong>Relevant</strong>
          <textarea
            name="relevantContent"
            value={plan.relevantContent}
            placeholder="왜 이 목표가 중요한가요?"
            onChange={handleChange}
          />
        </div>

        <h3>타임 테이블</h3>

        <div className="time-head">
          <span>시작</span>
          <span>종료</span>
          <span>내용</span>
          <span>메모</span>
          <span></span>
        </div>

        {plan.timeBlocks.map((item, index) => (
          <div className="time-input-row" key={index}>
            <input
              type="time"
              name="startTime"
              value={item.startTime}
              onChange={(e) => handleTimeChange(index, e)}
            />

            <input
              type="time"
              name="endTime"
              value={item.endTime}
              onChange={(e) => handleTimeChange(index, e)}
            />

            <input
              name="content"
              value={item.content}
              placeholder="할 일"
              onChange={(e) => handleTimeChange(index, e)}
            />

            <input
              name="memo"
              value={item.memo}
              placeholder="메모"
              onChange={(e) => handleTimeChange(index, e)}
            />

            <button
              className="remove-time-btn"
              onClick={() => removeTimeBlock(index)}
            >
              삭제
            </button>
          </div>
        ))}

        <div className="button-area">
          <button className="add-btn" onClick={addTimeBlock}>
            + 시간 추가
          </button>

          <button className="save-btn" onClick={submitPlan}>
            {editPlan ? "수정하기" : "저장하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlanPage;