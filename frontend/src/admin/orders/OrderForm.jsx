// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import api from "../../api/api";
// import { Link } from "react-router-dom";

// const OrderForm = () => {
//   const [formData, setFormData] = useState({
//     user_id: "",
//     email: "",
//   });
//   const [user, setuser] = useState([]);
//   const loadUsers = async () => {
//     try {
//       const res = await api.get("/admin/users/");
//       setuser(res.data);
//     } catch (error) {
//       console.log(error);
//       toast.error("failed to load user");
//     }
//   };
//   const handleChange = (e) => {
//     set;
//   };
//   return (
//     <div className="mx-auto p-5 bg-white  rounded">
//       <h2 className="text-2xl font-semibold mb-4">
//         {id ? "Edit Discount" : "Create Discount"}
//       </h2>
//       <form
//         className="space-y-3 bg-white p-5 rounded-lg"
//         action=""
//         onSubmit={handleSubmit}
//       >
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="" className="font-medium text-gray-700">
//               Product
//             </label>
//             <select
//               name="product_id"
//               value={formData.product_id}
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               id=""
//             >
//               <option value="">Select Product</option>
//               {product.map((item) => (
//                 <option value={item.id} key={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="" className="font-medium text-gray-700">
//               Discount (%)
//             </label>
//             <input
//               type="text"
//               className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               name="discount_percent"
//               value={formData.discount_percent}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="" className="font-medium text-gray-700">
//               Valid From
//             </label>
//             <input
//               type="date"
//               value={formData.valid_from}
//               name="valid_from"
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm  focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>
//           <div>
//             <label htmlFor="" className="font-medium text-gray-700">
//               Valid To
//             </label>
//             <input
//               type="date"
//               value={formData.valid_to}
//               name="valid_to"
//               onChange={handleChange}
//               className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm  focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>
//           <div className="flex items-center gap-4">
//             <label className="inline-flex items-center cursor-pointer mt-1">
//               Status:
//               <input
//                 type="checkbox"
//                 name="active"
//                 checked={formData.active}
//                 onChange={(e) =>
//                   setFormData({ ...formData, active: e.target.checked })
//                 }
//                 className="sr-only peer"
//               />
//               <div
//                 className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 
//        rounded-full peer peer-checked:bg-emerald-600 relative transition"
//               >
//                 <div
//                   className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
//         transition peer-checked:translate-x-5"
//                 ></div>
//               </div>
//             </label>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 ">
//           <button
//             type="submit"
//             className="bg-emerald-600 text-white py-2 px-4 cursor-pointer
//          font-medium text-md rounded-lg hover:bg-emerald-700 transition"
//           >
//             {/* {id ? "Update" : "Create"} */}
//             Create
//           </button>
//           <div className="bg-red-500 px-4 text-white hover:bg-red-700 transition text-md font-medium py-2 rounded-lg">
//             <Link to="/admin/orders" className="cursor-pointer">
//               Cancel
//             </Link>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default OrderForm;
