import { Link, useNavigate, useParams } from "react-router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface ArticleType {
  author: string;
  title: string;
  contents: string;
  createdAt: string;
  category: string;
}

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
  const { createdAt } = useParams<{ createdAt: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const data: ArticleType[] = await (
          await fetch(`/datas/articles.json`)
        ).json();
        const selectedArticle = data.find(
          (article) => article.createdAt === createdAt
        );
        setArticle(selectedArticle || null);
      } catch (error) {
        console.log("데이터를 불러오는 데에 실패하였습니다", error);
      } finally {
        setLoading(false);
      }
    };
    if (createdAt) {
      fetchArticleDetail();
    }
  }, [createdAt]);

  if (!article) {
    return <div>게시글이 없습니다</div>;
  }
  // 날짜 포맷팅
  const formattedDate = new Date(article.createdAt).toISOString().split("T")[0];
  if (loading) {
    return <div>로딩중입니다</div>;
  }
  return (
    <Container>
      <Header>
        <Title>{article.title}</Title>
        <ArticleInfo>
          <p>{article.author}</p>
          <p>{formattedDate}</p>
          <p>Category: {article.category}</p>
        </ArticleInfo>
      </Header>

      <div>
        <Content>{article.contents}</Content>
      </div>
      <Link to={`/articles/${createdAt}/edit`}>수정하기</Link>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </Container>
  );
}

export default ArticlesDetailPage;
