import { Button } from "antd";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Flood2.0</h1>
      <h1>Home Page</h1>

      <Link href={"/book-a-service"}>
        <Button>Book A Service</Button>
      </Link>
    </div>
  );
}
