import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 24px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
`;

const CategoryBox = styled.div`
  display: flex;
  column-gap: 12px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  font-size: 14px;
`;

const CategoryDot = styled.div<{ $bgColor: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid #dcdcdc;
  background-color: ${({ $bgColor }) => $bgColor};
`;

const SubmitBtn = styled.button`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: navy;
  color: aliceblue;
`;

type Category = "MOVIE" | "BOOK" | "GAME";

function ArticlesAddPage() {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<Category>("MOVIE"); //Movie Book Game
  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   console.log("title", title);
  // }, [title]);

  //input 같은 태그는 비제어 컴포넌트이다!
  //비제어 컴포넌트라 react의 state가 변경되지 않아도 변화가 보이는 것
  return (
    <Container>
      <h1>게시글 등록</h1>

      <div>
        <p>제목</p>
        <StyledInput ref={titleInputRef} />
      </div>

      <div>
        <p>카테고리</p>
        <CategoryBox>
          <CategoryWrapper
            onClick={() => {
              setCategory("MOVIE");
            }}
          >
            <CategoryDot
              $bgColor={category === "MOVIE" ? "#191919" : "transparent"}
            />
            영화
          </CategoryWrapper>
          <CategoryWrapper
            onClick={() => {
              setCategory("BOOK");
            }}
          >
            <CategoryDot
              $bgColor={category === "BOOK" ? "#191919" : "transparent"}
            />
            책
          </CategoryWrapper>
          <CategoryWrapper
            onClick={() => {
              setCategory("GAME");
            }}
          >
            <CategoryDot
              $bgColor={category === "GAME" ? "#191919" : "transparent"}
            />
            게임
          </CategoryWrapper>
        </CategoryBox>
      </div>

      <div>
        <p>내용</p>
        <StyledTextarea ref={contentInputRef} />
      </div>
      <SubmitBtn
        onClick={() => {
          const titleValue = titleInputRef.current?.value;
          const contentValue = contentInputRef.current?.value;
          console.log("title", titleValue);
          console.log("content", contentValue);
        }}
      >
        제출
      </SubmitBtn>
    </Container>
  );
}

export default ArticlesAddPage;
