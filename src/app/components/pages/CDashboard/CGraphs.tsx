"use client";
import { Row, Col } from "antd";
import JobsByDay from "./JobByDay";
import AvgResponseTime from "./AvgResponseTime";
import HeatmapByZip from "./HeatMap";

const CDashOverview = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <JobsByDay />
      </Col>
      <Col xs={24} md={8}>
        <AvgResponseTime />
      </Col>
      <Col xs={24} md={8}>
        <HeatmapByZip />
      </Col>
    </Row>
  );
};

export default CDashOverview;
