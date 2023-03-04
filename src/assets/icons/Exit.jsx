import styled from 'styled-components';

const Exit = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      width="35"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </Svg>
  );
};

export default Exit;

const Svg = styled.svg`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.pointColor};
  }
`;
