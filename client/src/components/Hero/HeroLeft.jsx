import { Link } from "react-router-dom";

export default function HeroLeft() {
  const reportButtons = [
    {
      btnName: "Report Found item",
      value: "Found",
    },
    {
      btnName: "Report Lost item",
      value: "Lost",
    },
  ];

  return (
    <div>
      <h1>Bhetayoo Lost & found solutions</h1>
      <p>
        "Our website is dedicated to simplifying the process of reuniting lost
        belongings with their owners."
      </p>

        {reportButtons.map((button) => (
          <Link key={button.value} to={`/report-item?value=${button.value}`}>
            <button
              className={`${
                button.value == "Found" ? "myBtn-primary" : "myBtn-sec"
              } text-white px-2 py-2 rounded fw-bold m-2`}
              value={button.value}
            >
              {button.btnName}
            </button>
          </Link>
        ))}
    </div>
  );
}
