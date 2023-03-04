import styled from 'styled-components';

const Add = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6"
      width="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </Svg>
  );
};

export default Add;

const Svg = styled.svg`
  transition: ${({ theme }) => theme.transitionOption};
  background: ${({ theme }) => theme.color};
  color: ${({ theme }) => theme.background};
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 30px;
`;
