import styled from 'styled-components';
import Label from 'components/form/Label';

const ReactHookInput = ({ type, register, errorMessage }) => {
  return (
    <Wrapper>
      <Label value={type} errorMessage={errorMessage} />
      {type === 'Email' || type === '이메일' ? (
        <Input
          errorId={!!errorMessage}
          {...register('email', {
            required: 'is required',
            validate: {
              hasAlpha: (value) => {
                const hasAlpha = !!value.match(/[a-zA-Z]/g);

                return hasAlpha ? true : 'must be include alpha';
              },
              isEmail: (value) => {
                const isEmail = !!value.match(
                  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
                );

                return isEmail ? true : 'Is not Email Form';
              },
            },
          })}
          type="text"
          placeholder={type}
        />
      ) : type === 'Nickname' || type === '닉네임' ? (
        <Input
          errorId={!!errorMessage}
          {...register('nickname', {
            required: 'is required',
            minLength: {
              value: 4,
              message: 'longer more than 4',
            },
            validate: (value) => {
              const hasAlpha = !!value.match(/[a-zA-Z]/g);

              return hasAlpha ? true : 'must be include alpha';
            },
          })}
          type="text"
          placeholder={type}
        />
      ) : (
        <Input
          errorId={!!errorMessage}
          {...register('password', {
            required: 'is required',
            minLength: {
              value: 4,
              message: 'longer more than 4',
            },
          })}
          type="password"
          placeholder={type}
        />
      )}
    </Wrapper>
  );
};

export default ReactHookInput;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  font-weight: 600;
  border-bottom: solid 2px
    ${(props) =>
      props.errorId ? props.theme.pointColor : 'rgba(133,133,133,0.5)'};
  transition: ${({ theme }) => theme.transitionOption};
  border-radius: 10px 10px 0 0;
  color: ${({ theme }) => theme.color};
  background: transparent;
  :focus {
    outline: none;
    border-bottom: solid 2px
      ${(props) => (props.errorId ? props.theme.pointColor : props.theme.color)};
  }
`;
