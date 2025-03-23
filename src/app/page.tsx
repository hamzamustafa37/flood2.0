import { Button } from "antd";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href={"/affected-site"}>
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
