import { useEffect, useState } from "react";

import {
  getPlanByDate,
  updateTimeBlockStatus
} from "../api/planApi";

import "./HomePage.css";


function HomePage({ setActivePage }) {


  const today = new Date()
    .toISOString()
    .substring(0,10);


  const [selectedDate,setSelectedDate]=useState(today);

  const [plan,setPlan]=useState(null);



  useEffect(()=>{

    loadPlan();

  },[selectedDate]);



  const loadPlan=async()=>{

    try{

      const res =
      await getPlanByDate(selectedDate);


      setPlan(res.data);


    }catch(e){

      setPlan(null);

    }

  };



  const changeStatus=async(block)=>{


    const nextStatus =
      block.status==="DONE"
      ?
      "TODO"
      :
      "DONE";


    await updateTimeBlockStatus(
      block.blockId,
      nextStatus
    );


    loadPlan();

  };

const totalCount = plan?.timeBlocks?.length || 0;

const doneCount =
  plan?.timeBlocks?.filter(
    block => block.status === "DONE"
  ).length || 0;

const progress =
  totalCount === 0
    ? 0
    : Math.round((doneCount / totalCount) * 100);



  return (

    <div className="home-page">


      <div className="home-header">

        <div>

          <h2>
            {selectedDate} 계획
          </h2>


          <p>
            오늘의 목표를 체크하며 완료해보세요 💪
          </p>

        </div>


        <div className="header-actions">

          <input
            type="date"
            value={selectedDate}
            onChange={
              e=>setSelectedDate(e.target.value)
            }
          />


          <button
            className="write-btn"
            onClick={()=>setActivePage("create")}
          >
            + 새 계획 작성
          </button>


        </div>


      </div>



      {
        !plan
        ?

        <div className="empty-box">

          <h3>
            계획이 없습니다 📝
          </h3>

        </div>


        :

        <>


        <section className="goal-card">

          <span>
            오늘 목표
          </span>

          <h1>
            {plan.title}
          </h1>

          <p>
            마감일 {plan.timeLimit?.substring(0,10)}
          </p>

          <div className="progress-box">

            <div className="progress-info">

              <strong>
                진행률 {progress}%
              </strong>

              <small>
                {doneCount} / {totalCount} 완료
              </small>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />

            </div>

          </div>

        </section>




        <div className="dashboard-grid">


          <section className="dashboard-card">


            <h3>
              🧠 SMART 목표
            </h3>


            <div className="smart-item">
              <b>S</b>
              {plan.specificContent}
            </div>

            <div className="smart-item">
              <b>M</b>
              {plan.measurableContent}
            </div>

            <div className="smart-item">
              <b>A</b>
              {plan.achievableContent}
            </div>

            <div className="smart-item">
              <b>R</b>
              {plan.relevantContent}
            </div>


          </section>





          <section className="dashboard-card">


            <h3>
              ⏰ 타임 테이블
            </h3>


            {
              plan.timeBlocks?.map(block=>(


                <div
                className={
                  block.status==="DONE"
                  ?
                  "time-block done"
                  :
                  "time-block"
                }
                key={block.blockId}
                >


                  <input
                    type="checkbox"
                    checked={
                      block.status==="DONE"
                    }
                    onChange={
                      ()=>changeStatus(block)
                    }
                  />



                  <div>

                    <strong>
                      {block.startTime}
                      -
                      {block.endTime}
                    </strong>


                    <h4>
                      {block.content}
                    </h4>


                    <p>
                      {block.memo}
                    </p>

                    <span
                    className={
                    block.status==="DONE"
                    ?
                    "status-badge done-badge"
                    :
                    "status-badge todo-badge"
                    }
                    >

                    {
                    block.status==="DONE"
                    ?
                    "완료"
                    :
                    "진행 전"
                    }

                    </span>


                  </div>


                </div>


              ))
            }


          </section>


        </div>


        </>

      }


    </div>

  );

}


export default HomePage;