import { Spinner } from "@hope-ui/solid";

export const Loading = () => (
  <div
    style={{
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      height: "80vh",
    }}
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="$neutral4"
      color="$info10"
      size="xl"
    />
  </div>
);
