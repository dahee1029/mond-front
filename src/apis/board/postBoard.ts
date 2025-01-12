import request from "../../libs/axios";

interface PostBoardParameter {
  boardWriter: string; // 작성자
  boardPass: string; // 비밀번호
  boardTitle: string;
  boardContents: string;
  boardCategory: "GAME" | "MOVIE" | "BOOK";
}

async function postBoard(params: PostBoardParameter) {
  const res = await request.post("/board", params);

  return res.data;
}

export default postBoard;
