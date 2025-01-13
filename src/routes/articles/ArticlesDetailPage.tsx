import { Link, useNavigate, useParams } from "react-router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getBoardDetail from "../../apis/board/getBoardDetail";
import deleteBoardDetail from "../../apis/board/deleteBoardDetail";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: center;
`;

const Title = styled.div`
  text-align: center;
  font-size: 30px;
  padding: 10px;
  margin-bottom: 20px;
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  font-size: 20px;
  background-color: aliceblue;
  margin: 10px;
  padding: 18px;
  height: 200px;
  border-radius: 8px;
`;

function ArticlesDetailPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess } = useQuery({
    // 쿼리키에 이 id data에 해당하는 것이 각기 다르기 때문에 id를 부여함으로써 구별해야함.
    queryKey: ["boardDetail", id],
    queryFn: () => getBoardDetail({ id: Number(id as string) }),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteBoardDetail,
    onSuccess: async () => {
      // 1. boardList를 무효화
      await queryClient.invalidateQueries({
        queryKey: ["boardList"],
      });
      // 2. 뒤로가기
      navigate(-1);
    },
  });

  const onBackClick = () => {
    navigate(-1);
  };

  const onDeleteClick = () => {
    mutate({ id: Number(id as string) });
  };

  return (
    <Container>
      {isSuccess && (
        <>
          <Header>
            <Title>{data.boardTitle}</Title>
            <ArticleInfo>
              <p>작성자: {data.boardWriter}</p>
              <p>게시글 작성 시간 : {data.boardCreatedTime}</p>
              <p>카테고리 : {data.boardCategory}</p>
              <p>조회수 : {data.boardHits}</p>
            </ArticleInfo>
          </Header>

          <div>
            <Content>{data.boardContents}</Content>
          </div>

          <Link to={`/articles/${id}/edit`}>수정하기</Link>
        </>
      )}

      {isLoading && <p>로딩중입니다.</p>}

      {isError && <p>에러입니다.</p>}

      <button onClick={onDeleteClick}>게시물 삭제</button>

      <button onClick={onBackClick}>뒤로가기</button>
    </Container>
  );
}

export default ArticlesDetailPage;
