import request from "../../libs/axios";

export interface GetBoardListResponse {
  id: number;
  boardWriter: string;
  boardPass: string;
  boardTitle: string;
  boardContents: string;
  boardHits: number;
  boardCategory: "GAME" | "MOVIE" | "BOOK";
  boardCreatedTime: string;
  boardUpdatedTime: string | null;
}

async function getBoardList() {
  const res = await request.get<GetBoardListResponse[]>("/board");

  return res.data;
}

export default getBoardList;
