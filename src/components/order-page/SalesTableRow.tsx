import { Listing } from "@/types/types";
import formatDateTime from "@/utils/formatDate";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";

const SalesTableRow: React.FC<{ sale: Listing }> = ({ sale }) => {
  return (
    <li className="flex p-4 justify-between items-center border-b-[1px] font-light text-sm">
      <p className="font-bold w-[10%]">{sale.listingId}</p>
      <div className="flex w-[60%] items-center gap-4">
        <img
          src={sale.images[0].imageUrl}
          alt={sale.listedProduct.productName}
          className="h-[100px] w-[100px]"
        />
        <div>
          <p>
            Item sold to:{" "}
            <span className="underline font-bold hover:cursor-pointer hover:text-blue-500 ">
              {sale.order.buyer.username}
            </span>
          </p>
          <p>
            <span className="font-bold">Condition:</span> {sale.condition}
          </p>
          <Link
            href={"/"}
            className="flex items-start gap-2 hover:cursor-pointer hover:text-blue-500 hover:underline"
          >
            <IoMdMail size={20} />
            Message User
          </Link>
        </div>
      </div>
      <p className="w-[20%]">{formatDateTime(sale.updatedAt)}</p>
      <p className="w-[10%] font-bold">£{sale.price}</p>
    </li>
  );
};

export default SalesTableRow;
