interface IColoredTextProps {
  text: string;
  color: string;
}

export const ColoredText = ({
  text,
  color,
}: IColoredTextProps) => {
  return (
    <span style={{ "color": color }}>
      {text}
    </span>
  );
};
