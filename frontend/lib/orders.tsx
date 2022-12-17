export const STATUS_LABELS: any = {
  PENDING: "Tạm dừng",
  COMPLETE: "Hoàn thành",
  PROCESSING: "Đang lấy hàng",
  SHIPPING_FAIL: "Không giao được",
  SHIPPING: "Đang vận chuyển",
  CANCELLED: "Đã hủy",
};
export const PAYMENT_LABELS: any = {
  WAiTING: "chờ thanh toán",
  COMPLETE: "Đã nhặn",
  FAIL: "thanh toán thất bại",
};
export const PAYMENT_STATUS = ["COMPLETED", "WAITING", "FAIL"];
export const t = (value: string) => {
  if (STATUS_LABELS[value]) {
    return STATUS_LABELS[value];
  }
  if (PAYMENT_STATUS[value]) {
    return PAYMENT_STATUS[value]
  }
}
export const renderPaymentLabel = (value: string) => {
  return (
    <span className={"label label-" + value}>{PAYMENT_LABELS[value]}</span>
  );
};

export const renderStatusLabel = (value: string) => {
  return <span className={"label label-" + value}>{STATUS_LABELS[value]}</span>;
};
