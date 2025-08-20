export default function  Prayer({ name, time }) {
  return (
    <div className="prayer">
      <p className="name-prayaer">{name}</p>
      <p className="time-prayaer">{time}</p>
    </div>
  );
}
