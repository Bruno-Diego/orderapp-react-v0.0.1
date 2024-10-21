import { Link } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";


//To be implemented
const FeaturedCardAdminBtns = () => {
  return (
    <div className="flex justify-center">
      {/* Edit Button */}
      {/* <Link href={`/product/${id}/edit`}>
        <Button className="text-white m-1 font-bold py-2 px-4 rounded-lg">
          <BsPencilSquare className="h-6 w-6" />
        </Button>
      </Link> */}
      <Button
        className="text-white bg-red-600 hover:bg-red-700 m-1 font-bold py-2 px-4 rounded-lg"
        // onClick={handleDelete}
      >
        <BsTrash3 className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FeaturedCardAdminBtns;
