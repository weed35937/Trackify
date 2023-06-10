import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import OtpInput from "react-otp-input";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { generateOtp, verifyOtp } from "../api";

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Button = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.button};
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  ${({ buttonDisabled }) =>
    buttonDisabled &&
    `
    background: #cccccc;
    color: #666666;
    cursor: not-allowed;
  `}
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin: 2px 2px 0px 2px;
`;
const Span = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
  margin: 0px 2px 0px 2px;
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin: 2px 2px 8px 2px;
  display: block;
  ${({ error }) =>
    error === "" &&
    `    display: none;
    `}
`;

const Timer = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  margin: 2px 26px 8px 26px;
  display: block;
`;

const Resend = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  margin: 2px 26px 8px 26px;
  display: block;
  cursor: pointer;
`;

const OTP = ({ email, name, setOtpVerified, reason }) => {
  // Hooks
  const theme = useTheme();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState("00:00");

  const Ref = useRef(null);

  // Counter for timer
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds
    };
  };

  const startTimer = (e) => {
    const { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        `${minutes > 9 ? minutes : 0} : ${seconds > 9 ? seconds : 0} seconds`
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("01:00");

    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };

  // Sends the otp to the user email id
  const sendOtp = async () => {
    await generateOtp(email, name, reason)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            openSnackbar({
              message: "OTP sent Successfully",
              severity: "success"
            })
          );
          setDisabled(true);
          setOtp("");
          setOtpError("");
          setOtpLoading(false);
          setOtpSent(true);
        } else {
          dispatch(
            openSnackbar({
              message: res.status,
              severity: "error"
            })
          );
          setOtp("");
          setOtpError("");
          setOtpLoading(false);
        }
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error"
          })
        );
      });
  };

  const resendOtp = () => {
    setShowTimer(true);
    clearTimer(getDeadTime());
    sendOtp();
  };

  // Validate the entered otp
  const validateOtp = () => {
    setOtpLoading(true);
    setDisabled(true);
    verifyOtp(otp)
      .then((res) => {
        if (res.status === 200) {
          setOtpVerified(true);
          setOtp("");
          setOtpError("");
          setDisabled(false);
          setOtpLoading(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          setOtpError(err.response.data.message);
          setDisabled(false);
          setOtpLoading(false);
        } else {
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error"
            })
          );
          setOtpError(err.message);
        }
        setDisabled(false);
        setOtpLoading(false);
      });
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    sendOtp();
  });

  // Check if the timer is 00:00 then hide the timer
  useEffect(() => {
    if (timer === "00:00") {
      setShowTimer(false);
    } else {
      setShowTimer(true);
    }
  }, [timer]);

  // Check if the otp is 6 digits then enable the submit button
  useEffect(() => {
    if (otp.length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [otp]);

  return (
    <div>
      <Title>VERIFY OTP</Title>
      <LoginText>
        A verification <b>&nbsp;OTP &nbsp;</b> has been sent to:{" "}
      </LoginText>
      <Span>{email}</Span>
      {!otpSent ? (
        <div
          style={{
            padding: "12px 26px",
            marginBottom: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            justifyContent: "center"
          }}
        >
          Sending OTP
          <CircularProgress color="inherit" size={20} />
        </div>
      ) : (
        <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            shouldAutoFocus
            inputStyle={{
              fontSize: "22px",
              width: "48px",
              height: "48px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              textAlign: "center",
              margin: "6px 4px",
              backgroundColor: "transparent",
              color: theme.text_primary
            }}
            containerStyle={{ padding: "8px 2px", justifyContent: "center" }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(props) => <input {...props} />}
          />
          <Error error={otpError}>
            <b>{otpError}</b>
          </Error>

          <Button
            buttonDisabled={disabled}
            style={{ marginTop: "12px", marginBottom: "12px" }}
            onClick={() => validateOtp()}
          >
            {otpLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Submit"
            )}
          </Button>

          {showTimer ? (
            <Timer>
              Resend in <b>{timer}</b>
            </Timer>
          ) : (
            <Resend onClick={() => resendOtp()}>
              <b>Resend</b>
            </Resend>
          )}
        </div>
      )}
    </div>
  );
};

export default OTP;
