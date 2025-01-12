import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

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

interface ArticleType {
  author: string;
  title: string;
  contents: string;
  createdAt: string; // UTC Date
  category: "MOVIE" | "GAME" | "BOOK";
}

function ArticlesMainPage() {
  const [list, setList] = useState<ArticleType[]>([]);

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        const data: ArticleType[] = await (
          await fetch(`/datas/articles.json`)
        ).json();
        setList(data);
      } catch (error) {
        console.log("데이터를 불러오는 데에 실패했습니다", error);
      }
    };
    fetchArticleList();
  }, []);

  return (
    <div>
      <div>게시글 리스트</div>
      <Link to="/articles/add">게시글 작성</Link>
      <MovieList>
        {list.length > 0 ? (
          list.map((item) => (
            <MovieItem key={item.createdAt}>
              <Link to={`/articles/${item.createdAt}`}>{item.title}</Link>
            </MovieItem>
          ))
        ) : (
          <div>게시글이 없습니다.</div>
        )}
      </MovieList>
    </div>
  );
}

export default ArticlesMainPage;
