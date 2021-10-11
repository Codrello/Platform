import React, { useState } from "react";
import { Badge } from "antd";

export default function BadgeView({ children }) {
  const [count, setCount] = useState(1);

  return (
    <>
      <Badge count={count}>{children}</Badge>
    </>
  );
}
