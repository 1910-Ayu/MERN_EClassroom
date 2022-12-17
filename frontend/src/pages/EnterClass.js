import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchEnterClassDetails } from "../actions/class";
import Announcement from "../components/UI/Announcement";
import Banner from "../components/UI/Banner";
import BannerSVG from "../assets/svg/online_class.svg";
import { fetchAnnouncements } from "../actions/announcement";
import Spinner from "../components/UI/Spinner";
import Alert from "../components/UI/Alert";
import UserAnnouncement from "../components/UI/UserAnnouncement";
import { Link } from "react-router-dom";
import { fetchPendingTasks } from "../actions/assignment";
import AnnouncementSVG from "../assets/svg/announcement.svg";

const EnterClass = () => {
  const urlParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadinga, errora, announcements } = useSelector(
    (state) => state.fetchAnnouncements
  );
  const { isAuthenticated, userInfo } = useSelector(
    (state) => state.userDetails
  );
  const { className, room, subject, createdBy } = useSelector(
    (state) => state.enterClassDetails
  );
  const {
    quizzes,
    assignments,
    loading: fetchPendingLoading,
    error: fetchPendingError,
  } = useSelector((state) => state.fetchPendingTasks);

  const classId = urlParams.classId;

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/welcome");
    }

    dispatch(fetchEnterClassDetails(classId));
    dispatch(fetchAnnouncements(classId));
  }, []);

  useEffect(() => {
    if (createdBy && createdBy !== userInfo.id)
      dispatch(fetchPendingTasks(classId));
  }, [createdBy, userInfo, classId]);

  
  return (
    <div>
      <Banner
        bannerBackground="tornado"
        SVGComponent={BannerSVG}
        heading={className ? className : "Loading...."}
        customText={subject && room && `${subject}, ${room}`}
      />
      <div className="flex flex-row justify-around p-6 sm:flex-col sm:p-2">
        <div className="flex flex-col">
          <div className="flex flex-col items-center shadow-lg p-6 bg-white h-56 rounded-lg sm:mb-4 mb-2 sm:w-80 sm:mx-auto">
            
          {createdBy && createdBy !== userInfo.data.id && (
            <div
              className="flex flex-col items-start  shadow-lg p-6 bg-white  rounded-lg sm:mb-4 sm:w-80 sm:mx-auto "
              style={{
                minHeight: "208px",
              }}
            >
              <h1
                className="w-full mb-2"
                style={{
                  borderBottom: "1px solid black",
                }}
              >
                Pending tasks
              </h1>
               <div className="flex flex-col">
                {fetchPendingLoading ? (
                  <div
                    className="flex items-center items-center justify-center mx-auto w-full"
                    style={{
                      fontFamily: ["Poppins", "sans-serif"],
                    }}
                  >
                    <p>Loading...</p>
                  </div>
                ) : fetchPendingError ? (
                  <div className="w-60 mx-auto">
                    <Alert color="red" message={fetchPendingError} />
                  </div>
                ) : (
                  <>
                    {quizzes &&
                      quizzes.map((quiz) => (
                        <Link
                          key={quiz._id}
                          className="underline text-lg text-blue-400"
                          to={`/enter/class/${classId}/classwork/quiz/${quiz._id}`}
                        >
                          {quiz.title}
                        </Link>
                      ))}
                    {assignments &&
                      assignments.map((assignment) => (
                        <Link
                          key={assignment._id}
                          className="underline text-lg text-blue-400"
                          to={`/enter/class/${classId}/classwork/assignment/${assignment._id}`}
                        >
                          {assignment.title}
                        </Link>
                      ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="shadow-lg  rounded-lg bg-white w-2/3 sm:w-full sm:mx-auto">
          {isAuthenticated && <Announcement />}

          <div className="flex flex-col p-4 sm:p-0">
            {loadinga ? (
              <div className="my-4">
                <Spinner />
              </div>
            ) : errora ? (
              <div className="w-4/5 mx-auto">
                <Alert color="red" message={errora} />
              </div>
            ) : (
              announcements &&
              announcements.map((announcement) => (
                <UserAnnouncement
                  key={announcement._id}
                  announcementId={announcement._id}
                  userId={userInfo.id}
                  announcementMadeBy={announcement.user._id}
                  name={announcement.user.name}
                  picture={announcement.user.picture}
                  content={announcement.content}
                  time={announcement.createdAt}
                  classId={classId}
                />
              ))
            )}
          </div>
          {announcements && announcements.length === 0 && (
            <div
              className="mx-auto w-60 h-60"
              style={{
                fontFamily: ["Poppins", "sans-serif"],
              }}
            >
              <>
                <img alt="" src={AnnouncementSVG} />
                <p className="text-xs">Announce something to your class</p>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default EnterClass;