"use client";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import UsersTable from "./userTable";
import UserInfoTabs from "./userInfoTabs";

const AllUserData = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Users"
        strapLine="Manage all platform users, their roles, and associated permissions."
        enableModal={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <div className="p-4">
        <UserInfoTabs />
        <div className="py-2">
          <UsersTable />
        </div>
      </div>
    </div>
  );
};
export default AllUserData;
