import { useNavigate, useParams } from "react-router";
import styled from "@emotion/styled";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getBoardDetail from "../../apis/board/getBoardDetail";
import putBoardDetail from "../../apis/board/putBoardDetail";

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

// | 는 union 타입인데 얘는 interface로는 못함.
type Category = "GAME" | "BOOK" | "MOVIE";

function ArticlesEditPage() {
  // 1. 상세 데이터를 불러와서 input값 -> 채워줘야함.
  // 2. 수정요청을 보내는 API를 쏴야할 수 있어야 하지

  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  // GET 요청을 보내는 경우 => useQuery
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["boardDetail", id],
    queryFn: () => getBoardDetail({ id: Number(id as string) }),
  });

  const queryClient = useQueryClient();

  // 게시물을 수정하게 되면 뭐를 갱신해야할까?
  // 1. boardList GET하는 API를 갱신해야함.
  // 2. boardDetail GET하는 API를 갱신해야함.

  // POST, DELETE, PUT 같은 요청을 보내는 경우 => useMutation
  const { mutate } = useMutation({
    mutationFn: putBoardDetail,
    onSuccess: async () => {
      // 쿼리키에 해당하는 데이터를 stale로 만들어서 즉 쿼리를 무효화 시킴.
      // 즉 이 무효화된 쿼리는 새로운 데이터를 받아오게 될 것임.

      // 1. boardList 쿼리 데이터 무효화
      await queryClient.invalidateQueries({
        queryKey: ["boardList"],
      });
      // 2. boardDetail id 쿼리 데이터 무효화
      await queryClient.invalidateQueries({
        queryKey: ["boardDetail", id],
      });
      // 3. 뒤로가기
      navigate(-1);
    },
    onError: () => {
      alert("에러입니다!");
    },
  });

  const onSubmitClick = () => {
    if (
      category !== null &&
      contentInputRef.current &&
      titleInputRef.current &&
      isSuccess
    ) {
      mutate({
        id: Number(id as string),
        boardWriter: data.boardWriter,
        boardPass: data.boardPass,
        // 우리가 변경한 값.!
        boardTitle: titleInputRef.current.value,
        boardCategory: category,
        boardContents: contentInputRef.current.value,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (titleInputRef.current) titleInputRef.current.value = data.boardTitle;

      if (contentInputRef.current)
        contentInputRef.current.value = data.boardContents;

      setCategory(data.boardCategory);
    }
  }, [data, isSuccess]);

  return (
    <Container>
      <h1>게시글 수정</h1>

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
      <SubmitBtn onClick={onSubmitClick}>제출</SubmitBtn>
    </Container>
  );
}

export default ArticlesEditPage;
