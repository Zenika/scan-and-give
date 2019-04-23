import axios from "axios";

export default {
  getAssociations: () =>
    axios.get("/api/associations").then(response => response.data),
  getAssociation: id =>
    axios.get("/api/associations/" + id).then(response => response.data),
  addDon: (hash, date, associationId) =>
    axios
      .post("/api/dons", JSON.stringify({ hash, date, associationId }), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.data),
  getDons: () => axios.get("/api/dons").then(response => response.data)
};
