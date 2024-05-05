import { useNotificationContext } from "../../contexts/NotifyContext";

export default function Notify() {
  const context = useNotificationContext();

  return context.notification ? (
    <div
      className={`notify-alert ${context.notificationType === "Error" ? "error" : "success"
        }`}
    >
      <img id="error-icon" src="/images/icons/error.svg" alt={"!"} />
      <img id="success-icon" src="/images/icons/success.svg" alt={"success"} />

      <div className="notification_container">
        <p>{context.notification}</p>
      </div>
    </div>
  ) : null;
}
