const apartmentsData = [
  { address: "6 Kim Tian Road", floor: 1, doorNumber: 46 },
  { address: "39 Punggol Drive", floor: 24, doorNumber: 288 },
  { address: "29 Nasim Avenue", floor: 0, doorNumber: 320 },
  { address: "266 Ang Mo Kio Avenue 1", floor: 8, doorNumber: 25 },
  { address: "Jurong East Street 56 Blk 246D", floor: 8, doorNumber: 25 },
];

export const getApartmentsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apartmentsData);
    }, 1000);
  });
};
