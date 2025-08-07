export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };

  return (
    <button
      className="die-component"
      style={styles}
      onClick={() => props.onClick(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
