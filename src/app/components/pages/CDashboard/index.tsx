import React from "react";
import CDashTabs from "./CDashTabs";
import CDashTable from "./CDashTable";
import CDashOverview from "./CGraphs";

const ContractorDashboard = () => {
  return (
    <div className="flex flex-col gap-4 py-4 px-2 md:px-4 mb-2">
      <div>
        <h1 className=" m-0 text-4xl font-normal">
          Admin Control Panel – The Flood Team
        </h1>
        <p className="mt-2 text-light">
          Real-time insights and job assignments to power fast, efficient flood
          and plumbing response operations.
        </p>
      </div>
      <div>
        <CDashTabs />
      </div>
      <div>
        <CDashTable />
      </div>
      <div>
        <CDashOverview />
      </div>
    </div>
  );
};

export default ContractorDashboard;
