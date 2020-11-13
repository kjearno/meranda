export const config = {
  appName: "Meranda",
  basename: "/meranda",
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://secure-retreat-39463.herokuapp.com/api"
      : "http://localhost:8000/api"
};
