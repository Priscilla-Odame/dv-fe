export interface INotificationProps {
  id?: string | number;
  type?: string;
  message: string;
  detail?: string;
  customClass?: string;
  closeButton?: boolean;
}
