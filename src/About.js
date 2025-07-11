import React, { useEffect } from "react";
import { INSIGHTS_CONSTANTS } from "./services/insightsConstants";
import { useNavigate } from "react-router-dom";
import { FlagIcon } from "react-flag-kit";

const About = ({ insights }) => {
  const [aboutTimerStart, setAboutTimerStart] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAboutTimerStart(new Date());
    const PAGE_DATA = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: window.screen.width + "x" + window.screen.height,
    };

    // Track page load without location data to avoid rate limiting
    insights.trackEvent({
      name: INSIGHTS_CONSTANTS.ABOUT_PAGE.ABOUT_PAGE_LOADED,
      properties: {
        data: {
          ...PAGE_DATA,
          locationData: "Location tracking disabled",
        },
      },
    });
  }, [insights]);

  // page end event
  useEffect(() => {
    const handleBeforeUnload = () => {
      const durationInSeconds = (Date.now() - aboutTimerStart) / 1000;
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.floor(durationInSeconds % 60);
      insights.trackEvent({
        name: INSIGHTS_CONSTANTS.ABOUT_PAGE.ABOUT_PAGE_SESSION_DURATION,
        properties: {
          duration: `${minutes} minutes ${seconds} seconds`,
        },
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [insights, aboutTimerStart]);

  return (
    <div
      className="container-fluid"
      style={{ maxWidth: "748px", marginTop: "120px" }}
    >
      <h1 className="mb-3 my-title">
        <img src="logo.png" alt="logo" width={"48px"} className="me-2" /> Voice
        Guru
        <i
          className="bi bi-check-circle-fill"
          style={{ marginLeft: "0.5rem", fontSize: "1rem", color: "#2962D7" }}
        ></i>
      </h1>
      <p className="card-text">
        <button
          className="btn btn-light"
          id="discover-button"
          onClick={() => navigate("/")}
        >
          <i className="bi bi-rocket-takeoff me-2"></i> Open Voice Guru
        </button>
        <br></br>
        <h3 className="mb-3 mt-3">Text to Speech Made Simple!</h3>
        Voice Guru is a simple online tool that turns written words into
        lifelike voices. Just type your text, and it becomes spoken words with a
        natural and realistic voice. Easy and user-friendly!
      </p>
      <h3 className="mt-5">How to use?</h3>
      <p className="card-text">
        <ul style={{ listStyleType: "none" }}>
          <li className="mt-3">
            <i className="bi bi-mic me-2"></i> Make voiceovers for audiobooks
            <div className="row mt-2">
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <i className="bi bi-amazon me-2"></i>
                <a href="https://www.audible.com/" style={{ color: "inherit" }}>
                  Audible
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <i className="bi bi-apple me-2"></i>
                <a
                  href="https://www.apple.com/apple-books/"
                  style={{ color: "inherit" }}
                >
                  Apple Books
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <i className="bi bi-google me-2"></i>
                <a
                  href="https://play.google.com/store/books"
                  style={{ color: "inherit" }}
                >
                  Google Play Books
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <img src="kobo.png" alt="udemy" width={18} className="me-2" />
                <a href="https://www.kobo.com/" style={{ color: "inherit" }}>
                  Kobo Books
                </a>
              </div>
            </div>
          </li>
          <li className="mt-3">
            <i className="bi bi-book me-2"></i> Make voiceovers for online courses
            <div className="row mt-2">
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <img src="udemy.png" alt="udemy" width={9} className="me-2" />
                <a href="https://www.udemy.com/" style={{ color: "inherit" }}>
                  Udemy
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <img src="edx.png" alt="edx" width={28} className="me-2" />
                <a href="https://www.edx.org/" style={{ color: "inherit" }}>
                  Edx
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <img
                  src="coursera.png"
                  alt="coursera"
                  width={16}
                  className="me-2"
                />
                <a
                  href="https://www.coursera.org/"
                  style={{ color: "inherit" }}
                >
                  Coursera
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <img
                  src="skillshare.png"
                  alt="skillshare"
                  width={18}
                  className="me-2"
                />
                <a
                  href="https://www.skillshare.com/"
                  style={{ color: "inherit" }}
                >
                  Skillshare
                </a>
              </div>
            </div>
          </li>

          <li className="mt-3">
            <i className="bi bi-film me-2"></i> Best for content creation
            <div className="row mt-2">
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <i className="bi bi-youtube me-2"></i>
                <a href="https://www.youtube.com/" style={{ color: "inherit" }}>
                  YouTube
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <i className="bi bi-tiktok me-2"></i>
                <a href="https://www.tiktok.com/" style={{ color: "inherit" }}>
                  TikTok
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <i className="bi bi-instagram me-2"></i>
                <a
                  href="https://www.instagram.com/"
                  style={{ color: "inherit" }}
                >
                  Instagram
                </a>
              </div>
              <div className="col-12 col-sm-4 ms-4 fs-6">
                <i className="bi bi-facebook me-2"></i>
                <a
                  href="https://www.facebook.com/"
                  style={{ color: "inherit" }}
                >
                  Facebook
                </a>
              </div>
            </div>
          </li>

          <li className="mt-3">
            <i className="bi bi-tv me-2"></i> Produce impactful voiceovers for
            advertising
          </li>
        </ul>
      </p>
      <h3 className="mt-5">Features</h3>
      <p className="card-text">
        <ul style={{ listStyleType: "none" }}>
          <li>
            <i className="bi bi-lightning-fill me-2"></i> A fast and easy text to
            speech converter.
          </li>
          <li>
            <i className="bi bi-briefcase-fill me-2"></i> Free to use anywhere. No
            license required.
          </li>
          <li>
            <i className="bi bi-globe2 me-2"></i> Supports multiple languages from
            around the world.
          </li>
          <li>
            <i className="bi bi-sliders me-2"></i> Fine tune pitch and speed for
            customized audio.
          </li>
          <li>
            <i className="bi bi-emoji-smile me-2"></i> Diverse selection of emotions
            to express yourself.
          </li>
        </ul>
      </p>
      <h3 className="mt-5">Languages</h3>
      <p className="card-text">
        <ul style={{ listStyleType: "none" }}>
          <li>
            <FlagIcon code="US" width={22} height={16} className="me-2" />{" "}
            English (United States)
          </li>
          <li>
            <FlagIcon code="CN" width={22} height={16} className="me-2" />{" "}
            Chinese/Mandarian (China)
          </li>
          <li>
            <FlagIcon code="IN" width={22} height={16} className="me-2" />{" "}
            Hindi, Telugu, Tamil, Malayalam, Marathi (India)
          </li>
          <li>
            <FlagIcon code="NP" width={22} height={16} className="me-2" />{" "}
            Nepali (Nepal)
          </li>
          <li>
            <FlagIcon code="MX" width={22} height={16} className="me-2" />{" "}
            Spanish (Mexico)
          </li>
          <li>
            <FlagIcon code="FR" width={22} height={16} className="me-2" />{" "}
            French (France)
          </li>
          <li>
            <FlagIcon code="AE" width={22} height={16} className="me-2" />{" "}
            Arabic (United Arab Emirates)
          </li>
          <li>
            <FlagIcon code="RU" width={22} height={16} className="me-2" />{" "}
            Russian (Russia)
          </li>
          <li>
            <FlagIcon code="BR" width={22} height={16} className="me-2" />{" "}
            Portuguese (Brazil)
          </li>
          <li>
            <FlagIcon code="ID" width={22} height={16} className="me-2" />{" "}
            Indonesian (Indonesia)
          </li>
          <li>
            <FlagIcon code="DE" width={22} height={16} className="me-2" />{" "}
            German (Germany)
          </li>
          <li>
            <FlagIcon code="JP" width={22} height={16} className="me-2" />{" "}
            Japanese (Japan)
          </li>
        </ul>
        More languages coming soon!
      </p>
      <h3 className="mt-5">Updates</h3>
      <p className="card-text">
        We are continuously working on adding more features to Voice Guru{" "}
        <i className="bi bi-rocket me-2"></i>.
      </p>
    </div>
  );
};

export default About;
