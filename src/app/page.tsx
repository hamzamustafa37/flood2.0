import { Button } from "antd";
import Link from "next/link";
import { Book } from "./components/pages/Book";
import { GlobalLayout } from "./components/layouts/global";

export default function HomePage() {
  return (
    <GlobalLayout>
      <Book />
    </GlobalLayout>
  );
}
