import { Spinner } from "@hope-ui/solid";

export const Loading = () => (
  <div
    style={{
      "margin-top": "20px",
      "text-align": "center",
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
