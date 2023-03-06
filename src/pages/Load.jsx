import styled from 'styled-components';
import { useState, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useRouteSpy from 'hooks/useRouteSpy';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQueryClient } from 'react-query';
import Upload from 'assets/icons/Upload';
import Exit from 'assets/icons/Exit';

const Load = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const routeSpy = useRouteSpy(route.pathname, '/');
  const [imgData, setImgData] = useState();
  const [data, setData] = useState({
    title: '',
    description: '',
    hashtags: [],
  });
  const [imgSrc, setImgSrc] = useState();
  const queryClient = useQueryClient();

  useEffect(() => {
    //routeSpy();
  }, []);

  const onChangeTitleHandler = (e) => {
    setData({
      ...data,
      title: e.target.value,
    });
  };

  const onChangeDescHandler = (e) => {
    setData({
      ...data,
      description: e.target.value,
    });
  };

  const hashHandler = () => {
    console.log();
  };

  const handleUpload = (e) => {
    /* Add */
    const {
      target: { files },
    } = e;
    const formData = new FormData();
    for (let i = 0; i <= files.length - 1; i++)
      formData.append('image', files[i]);

    setImgData((prev) => formData);

    /* Priview */
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const resultImage = reader.result;
      setImgSrc(resultImage);
    };
  };

  const uploadProduct = async (e) => {
    e.preventDefault();
    if (!imgData) return toast.error('핀 이미지를 추가해주세요!');
    const { title, description, hashtags } = data;
    if (!data.description) return toast.error('핀에 대한 설명을 적어주세요!');
    if (!data.title) return toast.error('제목을 입력해주세요!');
    if (!data.hashtags) return toast.error('해시태그를 입력해주세요!');

    const myFormData = imgData;
    const myData = { title, description, hashtags };
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: 'application/json' });
    myFormData.append('data', blob);

    const cookie = new Cookies();
    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_BASE_ROUTE}/api/pin`,
      data: myFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${cookie.get('ACCESS_TOKEN')}`,
      },
    });

    alert('성공');
    queryClient.invalidateQueries({ queryKey: 'search' });
    setTimeout(() => {
      navigate('/pins');
    }, 1500);
  };

  return (
    <Wrapper>
      <ToastContainer position="bottom-right" theme="light" />

      <Form onSubmit={uploadProduct}>
        <FormNav>
          <Exit />
        </FormNav>
        <FormContent>
          <ImageContainer htmlFor="image">
            <ImageInput>
              {!imgData ? (
                <Upload />
              ) : typeof imgSrc === 'string' ? (
                <Img src={imgSrc} />
              ) : null}
            </ImageInput>
            <input
              type="file"
              id="image"
              hidden
              accept="image/png, image/gif, image/jpeg"
              onChange={handleUpload}
            ></input>
          </ImageContainer>

          <RightWrapper>
            <RightTopContainer>
              <InputTitle
                value={data.title}
                onChange={onChangeTitleHandler}
                placeholder="제목 추가"
              ></InputTitle>
              <Description
                placeholder="핀에 대해 설명해보세요!"
                spellCheck="false"
                value={data.description}
                onChange={onChangeDescHandler}
              ></Description>
              <HashWrapper>
                <HashInput placeholder="#해시태그" />
                <HashSubmit onClick={hashHandler}>추가</HashSubmit>
              </HashWrapper>
            </RightTopContainer>
            <RightBottomContainer>
              <Button>핀 생성</Button>
            </RightBottomContainer>
          </RightWrapper>
        </FormContent>
      </Form>
    </Wrapper>
  );
};

export default memo(Load);

const Wrapper = styled.div`
  display: flex;
  margin-top: 88px;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 88px);
  background: '#EFEFEF';
`;

const Form = styled.form`
  position: relative;
  padding: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

const FormNav = styled.div`
  display: flex;
  padding: 10px;
  justify-content: flex-end;
`;

const FormContent = styled.div`
  display: flex;
  gap: 25px;
`;

/* FormLeft */
const Img = styled.img`
  object-fit: cover;
  width: 100%;
`;

const ImageInput = styled.div`
  overflow: hidden;
  width: 340px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed lightgray;
  border-radius: 5px;
`;

const ImageContainer = styled.label`
  display: flex;
  padding: 15px;
  border-radius: 10px;
  gap: 10px;
  background: #efefef;
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
  }
`;

/* FormRight */
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/* Right-Top */

const RightTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InputTitle = styled.input`
  padding: 10px;
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: solid 2px lightgray;
  font-size: 30px;
  width: 300px;
`;

const Description = styled.textarea`
  padding: 10px;
  font-size: 15px;
  border: none;
  outline: none;
  background: transparent;
  border: solid 2px lightgray;
  border-radius: 5px;
  min-width: 300px;
  max-width: 300px;
  min-height: 200px;
  max-height: 200px;
`;

/* Right-Bottom */

const RightBottomContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  font-size: 20px;
  color: white;
  border: none;
  background: ${({ theme }) => theme.pointColor};
  transition: ${({ theme }) => theme.transitionOption};
  :hover {
    background: #111;
    cursor: pointer;
  }
`;

const HashWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HashInput = styled.input.attrs({ type: 'text' })`
  padding: 10px;
  font-weight: 500;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: solid 2px lightgray;
  width: 200px;
`;

const HashSubmit = styled.div`
  padding: 10px 20px;
  color: white;
  background: ${({ theme }) => theme.color};
  border: none;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;
