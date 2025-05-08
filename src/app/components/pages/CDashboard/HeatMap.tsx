import { Card, Typography } from "antd";
import Image from "next/image";
const { Title, Text } = Typography;

const HeatmapByZip = () => {
  return (
    <Card style={{ height: "100%" }}>
      <Title level={5}>Heatmap by ZIP Code</Title>
      <Text type="secondary">
        Visual map showing job density & urgency across service areas
      </Text>
      <Image
        src="/heatmap-placeholder.png"
        alt="Heatmap"
        width={500}
        height={250}
        style={{ width: "100%", objectFit: "contain", marginTop: "1rem" }}
      />
    </Card>
  );
};

export default HeatmapByZip;
