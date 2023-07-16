import WheelComponent from "../../../components/wheel/spinWheel";

const segments = ["Happy", "Angry", "Sad", "Frustration", "Emptyness","Six"];
    const segColors = [
      "#EE4040",
      "#F0CF50",
      "#815CD1",
      "#3DA5E0",
      "#FF9000",
      "#3DA5E0",
    ];
    

const DashboardPage = () => {

    const onFinished = (winner) => {
        console.log(winner);
      };

    return (
        <div className="wrapper">
          <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment=""
            onFinished={(winner) => onFinished(winner)}
            primaryColor="black"
            primaryColoraround="#ffffffb4"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={false}
            size={130}
          upDuration={50}
          downDuration={2000}
          />
        </div>
    );
  };
  
  export default DashboardPage;