// import Image from "next/image";
// import { useNotificationContext } from "../../contexts/NotifyContext";

// export default function Notify() {
//   const context = useNotificationContext();

//   return context.notification ? (
//     <div
//       className={`notify-alert ${context.notificationType === "Error" ? "error" : "success"
//         }`}
//     >
//       <Image id="error-icon" src="/images/icons/error.svg" alt={"!"} width={100} height={100} />
//       <Image id="success-icon" src="/images/icons/success.svg" alt={"success"} width={100} height={100} />

//       <div className="notification_container">
//         <p>{context.notification}</p>
//       </div>
//     </div>
//   ) : null;
// }
