import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@hope-ui/solid";

interface IEmptyProps {
  title: string;
  content: string;
}

export const Empty = (props: IEmptyProps) => (
  <Alert
    status="danger"
    variant="subtle"
    flexDirection="column"
    justifyContent="center"
    textAlign="center"
    height="200px"
  >
    <AlertIcon boxSize="40px" mr="0" />
    <AlertTitle
      mt="$4"
      mb="$1"
      fontSize="$lg"
    >
      {props.title}
    </AlertTitle>
    <AlertDescription maxWidth="$sm">
      {props.content}
    </AlertDescription>
  </Alert>
);
