import request from "../../libs/axios";

interface GetBoardDetailParameter {
  id: number;
}

export interface GetBoardDetailResponse {
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

async function getBoardDetail({ id }: GetBoardDetailParameter) {
  const res = await request.get<GetBoardDetailResponse>(`/board/${id}`);

  return res.data;
}

export default getBoardDetail;
