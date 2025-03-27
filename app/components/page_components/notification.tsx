import { INotificationProps } from "@/types/ielements";
import { FaCheck } from "react-icons/fa";
import { MdCancel, MdInfo } from "react-icons/md";
import { toast } from "sonner";

let iconSize = 20;
export const NotifyUser = ({
  id,
  type,
  message,
  detail,
  customClass,
  closeButton,
}: INotificationProps) => {
  let closeButtonStyles = {
    backgroundColor: "text-red-600",
    color: "text-white",
  };
  return type == "success"
    ? toast.success(message, {
        id: id,
        className: customClass,
        description: detail,
        duration: 5000,
        icon: <FaCheck size={iconSize} color={`text-green-600`} />,
        closeButton: closeButton ?? true,
      })
    : type == "error"
    ? toast.error(message, {
        id: id,
        className: customClass,
        description: detail,
        duration: 5000,
        icon: <MdCancel size={iconSize} color={`text-red-600`} />,
        closeButton: closeButton ?? true,
        cancelButtonStyle: closeButtonStyles,
      })
    : toast.info(message, {
        id: id,
        className: customClass,
        description: detail,
        duration: 5000,
        icon: <MdInfo size={iconSize} color={`text-blue-500)`} />,
        closeButton: closeButton ?? true,
        cancelButtonStyle: closeButtonStyles,
      });
};
