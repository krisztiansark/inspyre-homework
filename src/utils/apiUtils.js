// import axios from "axios";

// export const getItems = async () => {
//   let request, data;
//   try {
//     request = await axios.get(
//       "https://frontend-assessment-api.herokuapp.com/items"
//     );
//     data = request.data.data;
//     // console.log(data);

//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getItem = async (id) => {
//   let request, data;
//   try {
//     request = await axios.get(
//       `https://frontend-assessment-api.herokuapp.com/items/${id}`
//     );
//     data = request.data.data;
//     // console.log(data);

//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getUsers = async () => {
//   let request, data;
//   try {
//     request = await axios.get(
//       `https://frontend-assessment-api.herokuapp.com/users`
//     );
//     data = request.data.data;
//     // console.log(data);

//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const patchItems = async (id, obj) => {
//   let request, data;
//   // console.log(obj);
//   const { name, description, dueDate, assignedTo } = obj;
//   try {
//     request = await axios.patch(
//       `https://frontend-assessment-api.herokuapp.com/items/${id}/`,
//       { name, description, dueDate, assignedTo }
//     );
//     data = request.data.data;
//     // console.log("PATCHITEMS", data);
//     // console.log(obj);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const postItem = async (obj) => {
//   let request, data;
//   console.log(obj);
//   const { name, description, dueDate, assignedTo } = obj;
//   try {
//     request = await axios.post(
//       `https://frontend-assessment-api.herokuapp.com/items/`,
//       { name, description, dueDate, assignedTo }
//     );
//     data = request.data.data;
//     // console.log("PATCHITEMS", data);
//     // console.log(obj);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const deleteItem = async (id) => {
//   let request, data;
//   console.log(id);
//   try {
//     request = await axios.delete(
//       `https://frontend-assessment-api.herokuapp.com/items/${id}/`
//     );
//     data = request.data.data;
//     console.log("PATCHITEMS", data);

//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
