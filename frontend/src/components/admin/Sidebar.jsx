import React from "react";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import { FaAngleDown, FaBed, FaListAlt, FaPlusCircle } from "react-icons/fa";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="w-full bg-white py-24 flex flex-col gap-10 h-full px-10 ">
      <Link className="sidebarLinkStyles border-b-2" to="/admin/dashboard">
        <p>
          <DashboardIcon /> Bảng điều khiển
        </p>
      </Link>
      <Link className="sidebarLinkStyles border-b-2" to="#">
        <TreeView
          defaultCollapseIcon={<FaAngleDown />}
          defaultExpandIcon={<FaBed />}
        >
          <TreeItem nodeId="1" label="Phòng">
            <Link className="sidebarLinkStyles border-b-2" to="/admin/rooms">
              <TreeItem nodeId="2" label="Tất cả" icon={<FaListAlt />} />
            </Link>

            <Link className="sidebarLinkStyles border-b-2" to="/admin/room">
              <TreeItem nodeId="3" label="Thêm" icon={<FaPlusCircle />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link className="sidebarLinkStyles border-b-2" to="/admin/orders">
        <p>
          <ListAltIcon /> Đơn đặt phòng
        </p>
      </Link>
      <Link className="sidebarLinkStyles border-b-2" to="/admin/users">
        <p>
          <PeopleIcon /> Người dùng
        </p>
      </Link>
      <Link className="sidebarLinkStyles border-b-2" to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Đánh giá
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
