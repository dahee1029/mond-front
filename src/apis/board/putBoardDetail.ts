import request from "../../libs/axios";

interface PutBoardParameter {
  id: number;
  boardWriter: string; // 작성자
  boardPass: string; // 비밀번호
  boardTitle: string;
  boardContents: string;
  boardCategory: "GAME" | "MOVIE" | "BOOK";
}

async function putBoardDetail({ id, ...rest }: PutBoardParameter) {
  const res = await request.put(`/board/${id}`, rest);

  return res.data;
}

export default putBoardDetail;
