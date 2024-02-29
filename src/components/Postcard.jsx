import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const Postcard = ({ $id, title, featuredImage }) => {
  // cards need to be clickable
  // id of individual posts is $id, $id is a syntax in appwrite
  // featuredImage is the id for the image as for image we are storing id in the database
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default Postcard;
