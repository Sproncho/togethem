export default function progressBar(props) {
  const { bgcolor, completed, amount, totalAmount } = props;
  const containerStyles = {
    height: "50px",
    width: "100%",
    backgroundColor: "#e0e0de",
    borderTop:"5px solid black",
    borderBottom:"5px solid black"
    // margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${parseInt(amount) / parseInt(totalAmount) * 100}%`,
    backgroundColor: "#acd34a",
    borderRadius: "inherit",
    textAlign: "right",
    display: "flex", 
    alignItems: "center",
  };

  const labelStyles = {
    padding: 5,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${amount}`}/{`${totalAmount}`}</span>
      </div>
    </div>
  );
}
//{`${amount}`}/{`${totalAmount}`}
