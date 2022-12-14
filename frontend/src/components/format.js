const FormatPrice = (value) => {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
export default FormatPrice;
