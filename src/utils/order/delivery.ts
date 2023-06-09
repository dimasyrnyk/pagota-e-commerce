export const getDeliveryDate = (days: number) => {
  const today = new Date();

  const deliveryDate = new Date(today.getTime());
  deliveryDate.setDate(deliveryDate.getDate() + days);

  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const formattedDeliveryDate = deliveryDate.toLocaleDateString(
    "en-US",
    options
  );

  return formattedDeliveryDate;
};
