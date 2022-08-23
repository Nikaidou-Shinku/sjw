import { Flex, Box, Heading, Progress, ProgressIndicator, ProgressLabel } from "@hope-ui/solid";
import { IStatus } from "../data/interface";

interface ICreditAndCostProps {
  status: IStatus;
}

export const CreditAndCost = (props: ICreditAndCostProps) => {
  const creditPercent = () => props.status.nowCredit / props.status.maxCredit * 100;
  const creditStr = () => `${props.status.nowCredit} / ${props.status.maxCredit}`;
  const costPercent = () => props.status.nowCost / props.status.maxCost * 100;
  const costStr = () => `${props.status.nowCost} / ${props.status.maxCost}`;

  return (
    <Flex justifyContent="space-around" flexGrow={1}>
      <Box width="400px" textAlign="center">
        <Heading level={3}>学分</Heading>
        <Progress
          value={creditPercent()}
          valueText={creditStr()}
          size="lg"
          mt="$2"
        >
          <ProgressIndicator />
          <ProgressLabel />
        </Progress>
      </Box>
      <Box width="400px" textAlign="center">
        <Heading level={3}>意愿值</Heading>
        <Progress
          value={costPercent()}
          valueText={costStr()}
          size="lg"
          mt="$2"
        >
          <ProgressIndicator />
          <ProgressLabel />
        </Progress>
      </Box>
    </Flex>
  );
};
