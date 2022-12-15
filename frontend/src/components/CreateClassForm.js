import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { createClass } from "../actions/class";
import Spinner from "./UI/Spinner";
import Alert from "./UI/Alert";

export default function CreateClassForm({
  showCreateClass,
  setShowCreateClass,
}) {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  const [createClassError, setCreateClassError] = useState("");

  const { loading, success, error } = useSelector((state) => state.createClass);
  const dispatch = useDispatch();

  const onCreateHandler = () => {
    if (!className || !subject || !room) {
      setCreateClassError("One or more fields are invalid");
      return;
    }
    dispatch(createClass(className, subject, room));
  };

  return (
    <>
      <Dialog
        size="lg"
        open={showCreateClass}
        handler={() => setShowCreateClass(false)}
      >
        {error && <p>{error}</p>}
        <DialogHeader handler={() => setShowCreateClass(false)}>
          Create class
        </DialogHeader>

        <DialogBody>
          <form className="w-96 p-2 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Class name
              </label>
              <input
                className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Class name"
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Subject
              </label>
              <input
                className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Room
              </label>
              <input
                className="w-full shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Room"
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
          </form>
          {success ? (
            <Alert
              color={"green"}
              message="Class created, share the class code for students to join!"
            />
          ) : loading ? (
            <Spinner text="Creating class" />
          ) : createClassError ? (
            <Alert color={"red"} message={createClassError} />
          ) : error ? (
            <Alert color={"red"} message={error} />
          ) : null}
       </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={(e) => setShowCreateClass(false)}
            ripple="dark"
          >
            Cancel
          </Button>
          <Button
            color="green"
            onClick={onCreateHandler}
            ripple="light"
            // disabled={true}
          >
            Create
          </Button>
          </DialogFooter>
      </Dialog>
    </>
  );
}