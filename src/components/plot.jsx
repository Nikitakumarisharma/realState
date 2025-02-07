"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase_config"; // Firebase config

const TableWithImage = () => {
  const [data, setData] = useState([]);
  const router = useRouter(); // Use router for navigation

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Property"));
      const tableData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort data by plotNo numerically
      const sortedData = tableData.sort((a, b) => a.plotNo - b.plotNo);
      setData(sortedData);
    };

    fetchData();
  }, []);

  // Navigate to property details page
  const handleRowClick = (id) => {
    router.push(`/property/${id}`);
  };

  return (
    <div>
      <h1 className="text-center font-bold mt-14 text-3xl">
        Check Out our <span className="text-purple-800">Plot Details</span>
        <br /> in the <span className="text-purple-800">Prime</span> Locations
      </h1>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 min-h-screen p-4 bg-white gap-4">
        {/* Left Image Section */}
        <div className="flex items-center justify-center h-full">
          <img
            src="/assets/sec144.jpg"
            alt="Plot Image"
            className="rounded-lg h-auto max-h-[500px] object-contain"
          />
        </div>

        {/* Right Table Section */}
        <div className="w-full lg:p-4 overflow-x-auto overflow-y-auto max-h-[600px]">
          <div className="min-w-full inline-block align-middle mt-12">
            <p className="text-2xl p-2">Click on the row to see Details</p>

            <div className="border border-gray-300 rounded-lg shadow-md overflow-x-auto overflow-y-auto max-h-[500px]">
              <table className="w-full divide-y divide-gray-200 table-auto min-w-[600px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                      Plot No
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                      Size
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                      Availability
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleRowClick(item.id)}
                      className={`cursor-pointer hover:bg-black hover:text-white transition 
                      ${
                        item.availability === "booked"
                          ? "bg-yellow-300 hover:bg-yellow-500"
                          : item.availability === "sold"
                          ? "bg-red-400 hover:bg-red-600"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-2">{item.plotNo}</td>
                      <td className="px-4 py-2">{item.size} SD.YD</td>
                      <td className="px-4 py-2">{item.availability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableWithImage;
