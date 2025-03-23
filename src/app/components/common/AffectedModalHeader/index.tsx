import React from "react";
interface IAffectedModalHeader {
  headline: string;
  stripline: string;
}
const AffectedModalHeader = ({ headline, stripline }: IAffectedModalHeader) => {
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold">{headline}</h2>
      <p className="text-center text-gray-500">{stripline}</p>
    </div>
  );
};

export default AffectedModalHeader;
