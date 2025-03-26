import { NextPage } from "next";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import CollectionInfoTabs from "./collectionInfoTabs";

const CollectionData: NextPage = () => {
  return (
    <div>
      <TablePageHeader
        heading="Collection"
        strapLine="Track and manage your payments, outstanding balances, and collected revenue in one place"
      />
      <div className="p-5">
        <CollectionInfoTabs />
      </div>
    </div>
  );
};

export default CollectionData;
