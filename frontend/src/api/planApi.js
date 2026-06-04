import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:18080/api",
});


export const savePlan = (data) => {
  return api.post("/plans", data);
};


export const getPlans = () => {
  return api.get("/plans");
};


export const getTodayPlan = () => {
  return api.get("/plans/today");
};


export const getPlanByDate = (date) => {
  return api.get(`/plans/date/${date}`);
};


export const updatePlan = (planId, data) => {
  return api.put(`/plans/${planId}`, data);
};


export const deletePlan = (planId) => {
  return api.delete(`/plans/${planId}`);
};


// 시간 완료 상태 변경
export const updateTimeBlockStatus = (blockId, status) => {

  return api.put(
    `/plans/time-blocks/${blockId}/status`,
    {
      status: status
    }
  );

};