import styled from 'styled-components';

interface Props {
  width: string;
  className?: string;
}

export default function Logo({ width, className }: Props) {
  return (
    <Svg
      version="1.1"
      id="Calque_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width + 'px'}
      x="0px"
      y="0px"
      viewBox="0 0 137.52 96.5"
      xmlSpace="preserve"
      className={className}
    >
      <style type="text/css"></style>
      <g>
        <polygon points="76,0 50.67,0 0,50.66 0,71.17 50.67,71.17 50.67,96.5 76,96.5 76,50.66 25.33,50.66 	" />
        <polygon points="86.85,25.33 112.19,0 86.85,0 	" />
        <polygon points="137.52,25.33 137.52,0 112.19,0 112.19,25.33 86.85,50.66 86.85,76 112.19,76 112.19,50.66 	" />
        <polygon points="137.52,50.66 112.19,76 137.52,76 	" />
      </g>
    </Svg>
  );
}

const Svg = styled.svg`
  fill: white;
  enable-background: 'new 0 0 137.52 96.5';
`;
