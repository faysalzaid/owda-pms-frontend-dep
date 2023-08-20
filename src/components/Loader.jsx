import PulseLoader from "react-spinners/PulseLoader";

const Loader = ({color="#36d7b7"}) => {
  return (
    <div 
      style={{
        width: '100%',
        display: 'flex',
        justifyContent:'center',
        alignContent: 'center',
        margin: "300px 10px"
      }}
    >
      <PulseLoader color={color} />
    </div>
  );
}

export default Loader;