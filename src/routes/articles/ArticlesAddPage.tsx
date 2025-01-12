import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import postBoard from "../../apis/board/postBoard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

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

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: postBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["boardList"],
      });

      navigate(-1);
    },
    onError: () => {
      alert("에러입니다!");
    },
  });

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
        // disabled={isPending}
        onClick={() => {
          const titleValue = titleInputRef.current?.value || "";
          const contentValue = contentInputRef.current?.value || "";

          mutate({
            boardWriter: "무몬",
            boardPass: "1234",
            boardCategory: category,
            boardTitle: titleValue,
            boardContents: contentValue,
          });
        }}
      >
        제출
      </SubmitBtn>
    </Container>
  );
}

export default ArticlesAddPage;
