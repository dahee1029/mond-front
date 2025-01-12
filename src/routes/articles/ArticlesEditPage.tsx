import { useNavigate, useParams } from "react-router";
import styled from "@emotion/styled";
import { useRef, useState, useEffect } from "react";

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

interface ArticleType {
  author: string;
  title: string;
  contents: string;
  createdAt: string;
  category: "MOVIE" | "BOOK" | "GAME";
}

function ArticlesEditPage() {
  const { createdAt } = useParams<{ createdAt: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<ArticleType["category"]>("MOVIE"); //Movie Book Game
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
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

  useEffect(() => {
    if (article && titleInputRef.current && contentInputRef.current) {
      titleInputRef.current.value = article.title;
      contentInputRef.current.value = article.contents;
      setCategory(article.category);
    }
  }, [article]); // article이 변경될 때마다 실행

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
      <SubmitBtn
        onClick={() => {
          const titleValue = titleInputRef.current?.value;
          const contentValue = contentInputRef.current?.value;
          console.log(category);
          console.log("title", titleValue);
          console.log("content", contentValue);
        }}
      >
        제출
      </SubmitBtn>
    </Container>
  );
}

export default ArticlesEditPage;
