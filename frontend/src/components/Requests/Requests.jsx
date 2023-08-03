import React, { useEffect, useState } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Requests = () => {
  const [request, setRequest] = useState([]);

  useEffect(() => {
    getAllRequests();
  }, []);

  const getAllRequests = () => {
    fetch("http://localhost:4000/getAllRequest", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setRequest(data.data);
      });
  };

  const deleteRequest = (id, username) => {
    if (window.confirm(`Are you sure you want to delete ${username}`)) {
      fetch("http://localhost:4000/deleteRequest", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          requestid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllRequests();
        });
    }
  };

  return (
    <div className="container mx-auto my-4">
      <div className="flex justify-center items-center my-4">
        <Typography variant="h5" component="h2" className="text-2xl font-bold">
          Requests
        </Typography>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {request.map((i, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{i.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{i.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{i.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{i.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => deleteRequest(i._id, i.username)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
