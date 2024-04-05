export default function formatDate(dateTimeString: string): string {
   const date = new Date(dateTimeString);

   if (isNaN(date.getTime())) {
      return "Invalid Date";
   }

   const day = String(date.getDate()).padStart(2, "0");
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const year = date.getFullYear();
   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");

   return `${day}/${month}/${year} | ${hours}:${minutes}`;
}

const dateTimeString = "2024-04-03T11:48:51.8182+00:00";
const formattedDateTime = formatDate(dateTimeString);
console.log(formattedDateTime); // Kết quả: "03/04/2024 - 11:48:51"
