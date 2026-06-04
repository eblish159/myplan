import "./PlanDetailModal.css";

function PlanDetailModal({ plan, closeModal }) {

  if (!plan) {
    return null;
  }


  return (

    <div className="modal-bg">

      <div className="detail-modal">


        <button
          className="modal-close"
          onClick={closeModal}
        >
          ×
        </button>


        <div className="modal-header">

          <span>
            {plan.planDate?.substring(0,10)}
          </span>


          <h2>
            {plan.title}
          </h2>


          <p>
            마감일 : {plan.timeLimit?.substring(0,10)}
          </p>

        </div>



        <section className="modal-section">

          <h3>
            🧠 SMART 목표
          </h3>



          <div className="modal-smart">

            <p>
              <b>S</b>
              {plan.specificContent}
            </p>

            <p>
              <b>M</b>
              {plan.measurableContent}
            </p>

            <p>
              <b>A</b>
              {plan.achievableContent}
            </p>

            <p>
              <b>R</b>
              {plan.relevantContent}
            </p>


          </div>

        </section>




        <section className="modal-section">


          <h3>
            ⏰ 타임 테이블
          </h3>


          {
            plan.timeBlocks?.map(block=>(


              <div
                className="modal-time"
                key={block.blockId}
              >

                <strong>
                  {block.startTime}
                  -
                  {block.endTime}
                </strong>


                <span>
                  {block.content}
                </span>


                <p>
                  {block.memo}
                </p>


              </div>


            ))
          }



        </section>



      </div>

    </div>

  );

}


export default PlanDetailModal;