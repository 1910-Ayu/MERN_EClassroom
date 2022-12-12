import React from "react";




import { Link } from "react-router-dom";
import ClassSVG from "../assets/svg/class.svg";
import {
  Card,
  CardHeader,
  CardBody,
  Button
} from "@material-tailwind/react";

export default function ClassCard({
  classTitle,
  classRoom,
  classCode,
  instructorName,
}) {
  return (
    <Card>
      
      <CardHeader floated={false} className="bg-white">
        <img src={ClassSVG} alt="card image" />
      </CardHeader>
      <CardBody>
        <div
          style={{
            fontFamily: ["Sen", "sans-serif"],
          }}
        >
          <h1 className="text-lg font-semibold">{classTitle}</h1>
          <p>{classRoom}</p>
          <p>{instructorName}</p>
          <p className="text-xs mt-2">Code: {classCode}</p>
        </div>
      </CardBody>

      <Link to={`/enter/class/${classCode}`}>
        <Button color="green" size="sm" ripple="light">
          Enter class
        </Button>
      </Link>
    </Card>
  );
}