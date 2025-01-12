import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import getBoardList, {
  GetBoardListResponse,
} from "../../apis/board/getBoardList";
import getError from "../../apis/error/getError";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const MovieList = styled.ul`
  padding: 10px;
  border: 1px solid #d3d3d3;
`;

const MovieItem = styled.li`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  :last-child {
    border-bottom: none;
  }
`;

type APIStatus = "LOADING" | "ERROR" | "SUCCESS";

function ArticlesMainPage() {
  // 1. 로딩에러처리
  // 2. 데이터 관리 (캐시)

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["boardList"],
    queryFn: () => getBoardList(),
    // staleTime: 1000 * 60 * 5, // 이 기간동안에 fresh한 상태가 유지되는 기간 즉 데이터가 유효한 기간 ms
    // gcTime: 1000 * 60 * 5, // 이 쿼리키에 해당하는 데이터를 사용하는 useQuery훅이 언마운트 됐을때 메모리상에 유지되는 기간
  });

  // gcTime -> 쿼리키에해당하는데이터가 메모리상에 삭제

  // 1. staleTime -> fresh(내가 지금 갖고있는 쿼리키에 해당하는 데이터가 유효함)
  // stale: 데이터가 썩었어 -> 그래서 데이터를 새로 갖고와야함.

  // staleTime 썩었네? -> 다시호출 ->  // 이전데이터(stale) -> 새로운 데이터(fresh)

  // gcTime 엥 없네? -> 새로 호출 -> // undefined -> 새로운 데이터(fresh)

  return (
    <div>
      <div>게시글 리스트</div>

      <Link to="/articles/add">게시글 작성</Link>

      {/* SUCCESS -> DATA가 빈배열 */}
      {isSuccess && data.length === 0 && <div>데이터가 없습니다.</div>}

      {/* SUCCESS -> DATA가 빈배열이 아닐때니 */}
      {isSuccess && data.length > 0 && (
        <MovieList>
          {data.map((item) => (
            <MovieItem key={item.id}>
              <Link to={`/articles/${item.id}`}>{item.boardTitle}</Link>
            </MovieItem>
          ))}
        </MovieList>
      )}

      {isLoading && <div>loading</div>}

      {isError && <div>error</div>}
    </div>
  );
}

export default ArticlesMainPage;
